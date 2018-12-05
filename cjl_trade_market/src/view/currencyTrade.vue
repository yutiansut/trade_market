<template>
    <div class="main wh-full">
        <my-header class="header-main">
            <login-bar></login-bar>
        </my-header>
        <el-container>
            <!-- 左侧表格栏目 -->
            <el-aside width="24%">
              <ce-aside-comp @onRowClick='getRowData'></ce-aside-comp>
            </el-aside>
            <!-- 主要body -->
            <el-main>
              <!-- K线图头部 -->
              <div class="panel-head flex flex-v-center">
                <img class="currency-thumb thumb-30" src="" alt="">
                <div class="heading">{{tradecoin}}/{{maincoin}}</div>
                <div class="market-val flex flex-v-center">
                  <span class="font-16" v-text="currentCoinInfo.prise"></span>
                  <span class="font-14 color-666">≈0.05 CNY </span>
                </div>
                <div class="market-condition font-12">
                  <span>
                    <em class="color-666" v-text="$t('increase')||'涨幅'"></em>
                    <i
                      :class="currentCoinInfo.rise*1>0?'color-danger':'color-success'"
                      v-text='currentCoinInfo.rise'>
                    </i>
                  </span>
                  <span>
                    <em class="color-666" v-text="$t('high')||'高'"></em>
                    <i v-text="currentCoinInfo.height"></i>
                  </span>
                  <span>
                    <em class="color-666" v-text="$t('low')||'低'"></em>
                    <i v-text="currentCoinInfo.low"></i>
                  </span>
                  <span>
                    <em class="color-666" v-text="$t('dayVol')||'24H量'"></em>
                    <i>{{currentCoinInfo.number}}&nbsp;{{tradecoin}}</i>
                  </span>
                </div>
              </div>
              <!-- K线图占位 -->
              <div id='kMap' class="k-map"></div>
              <div class="panel-container flex flex-between">
                <div class="content-lf flex flex-between">
                  <!-- 买入 -->
                  <div class="form-wrap">
                    <div class="font-18 font-bit-bold" v-html="buyingLabel"></div>
                    <div class="break-line"></div>
                    <div class="account flex flex-between">
                      <span class="balance" v-html="availabelBalance"></span>
                      <a href="javascript:"
                        @click="showChargeBox"
                        v-text="$t('recharge')||'充值'">
                      </a>
                    </div>
                    <div class="input-group">
                      <label v-text="$t('buyingRate')||'买入价'"></label>
                      <el-input v-model="buyFormData.price">
                        <span class="unit" slot="suffix" v-text="maincoin+'/'+tradecoin"></span>
                      </el-input>
                      <em class="hint font-12">≈0.05</em>
                    </div>
                    <div class="input-group">
                      <label v-text="$t('buyVol')||'买入量'"></label>
                      <el-input v-model="buyFormData.orderVol">
                        <span class="unit" slot="suffix" v-text="tradecoin"></span>
                      </el-input>
                    </div>
                    <div class="total flex flex-between">
                      <span v-text="totalLabel"></span>0
                    </div>
                    <button @click="userData.isLogin?buyHandle:errMsg('请登录后操作')"
                      class="btn-block btn-large btn-danger btn-active"
                      v-html="buyingLabel">
                    </button>
                  </div>
                  <!-- 卖出 -->
                  <div class="form-wrap">
                    <div class="font-18 font-bit-bold" v-html="sellingLabel"></div>
                    <div class="break-line"></div>
                    <div class="account flex flex-between">
                      <span class="balance" v-html="availabelAmount"></span>
                      <a href="javascript:"
                        @click="showChargeBox"
                        v-text="$t('recharge')||'充值'">
                      </a>
                    </div>
                    <div class="input-group">
                      <label v-text="$t('sellingRate')||'卖出价'"></label>
                      <el-input v-model="sellFormData.price">
                        <span class="unit" slot="suffix" v-text="maincoin+'/'+tradecoin"></span>
                      </el-input>
                      <em class="hint font-12">≈0.05</em>
                    </div>
                    <div class="input-group">
                      <label v-text="$t('sellVol')||'卖出量'"></label>
                      <el-input v-model="sellFormData.orderVol">
                        <span class="unit" slot="suffix" v-text="tradecoin"></span>
                      </el-input>
                    </div>
                    <div class="total flex flex-between">
                      <span v-text="totalLabel"></span>0
                    </div>
                    <button @click="userData.isLogin?buyHandle:errMsg('请登录后操作')"
                      class="btn-block btn-large btn-success btn-active"
                      v-html="sellingLabel">
                    </button>
                  </div>
                </div>
                <!-- 交易行情 -->
                <div class="trade-market">
                  <div class="flex flex-between flex-v-center">
                    <span class='font-18'>{{$t('latestPrice')||'最新价'}}&nbsp;0.0000011422&nbsp;BTC
                      <em class="font-12 color-666">≈ 0.05 CNY</em>
                    </span>
                    <!-- <router-link to=''>更多</router-link> -->
                  </div>
                  <div class="break-line"></div>
                  <!-- 买入五档图 -->
                  <el-table style="font-weight:normal"
                    :data='latestBuyData'
                    :cell-style='myCellStyle' 
                    max-height='220' stripe>
                    <el-table-column width='80'
                      :label='$t("stalls")||"档位"'>
                      <span class="color-danger" slot-scope="scope">
                        {{$t('buy')}}&nbsp;{{dataMaxLen-scope.$index}}
                      </span>
                    </el-table-column>
                    <el-table-column width='150'
                      :label='priceLabel'
                      prop='price'>
                    </el-table-column>
                    <el-table-column width='120'
                      :label='amountLabel'
                      prop='number'>
                    </el-table-column>
                    <el-table-column :label='totalLabel'>
                      <div slot-scope="scope" v-text="scope.row.total"></div>
                    </el-table-column>
                  </el-table>
                  <!-- 卖出五档图 -->
                  <div class="m-top-10"></div>
                  <el-table style="font-weight:normal"
                    :data='latestSoldData'
                    :cell-style='myCellStyle'
                    :show-header='false'
                    max-height='180' stripe>
                    <el-table-column width='80'
                      :label='$t("stalls")||"档位"'>
                      <span class="color-success" slot-scope="scope">
                        {{$t('sell')}}&nbsp;{{dataMaxLen-scope.$index}}
                      </span>
                    </el-table-column>
                    <el-table-column width='150' 
                      :label='priceLabel'
                      prop='price'>
                    </el-table-column>
                    <el-table-column width='120'
                      :label='amountLabel'
                      prop='number'>
                    </el-table-column>
                    <el-table-column
                      :label='totalLabel'>
                      <div slot-scope="scope" v-text="scope.row.total"></div>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <div class="panel-container flex flex-between">
                <!-- 左侧内容 -->
                <div class="content-lf">
                    <!-- 当前委托 -->
                    <div class="panel-title font-18 font-bit-bold"
                      v-text="$t('currEnstrument')||'当前委托'"></div>
                    <template v-if="userData.isLogin">
                      <el-table stripe 
                        :data='currentDeclareData'>
                        <el-table-column width="140"
                          :label='$t("date")||"日期"'
                          prop='date'>
                        </el-table-column>
                        <el-table-column width='100'
                          :label='$t("type")||"类型"'>
                          <span slot-scope="scope"
                            v-text="scope.row.type=='买入'?$t('buy'):$t('sell')"
                            :class="scope.row.type=='买入'?'color-danger':'color-success'">
                          </span>
                        </el-table-column>
                        <el-table-column
                          :label='priceLabel'
                          prop='price'>
                        </el-table-column>
                        <el-table-column
                          :label='marketVolLabel'
                          prop='order_vol'>
                        </el-table-column>
                        <el-table-column
                          :label='$t("volumn")||"成交量"'
                          prop='complete_vol'>
                        </el-table-column>
                        <el-table-column
                          :width="$i18n.locale==='zh-CN'?'60':'120'"
                          :label='$t("operation")||"操作"'>
                          <span class="handle color-danger"
                            slot-scope="scope"
                            v-text="$t('withdrawed'||'撤单')">
                          </span>
                        </el-table-column>
                      </el-table>
                    </template>
                    <unlogin-tip></unlogin-tip>
                    <!-- 历史委托 -->
                    <div class="panel-title font-18 font-bit-bold" v-text="$t('oldEnstrument')||'历史委托'"></div>
                    <template v-if="userData.isLogin">
                      <el-table stripe :data='historicalDeclareData'>
                        <el-table-column width="140"
                          :label='$t("date")||"日期"' prop='date'>
                        </el-table-column>
                        <el-table-column width='100'
                          :label='$t("type")||"类型"'>
                          <span slot-scope="scope"
                            :class="scope.row.type=='买入'?'color-danger':'color-success'"
                            v-text="scope.row.type=='买入'?$t('buy'):$t('sell')" >
                          </span>
                        </el-table-column>
                        <el-table-column
                          :label='priceLabel'
                          prop='price'>
                        </el-table-column>
                        <el-table-column
                          :label='marketVolLabel'
                          prop='order_vol'>
                        </el-table-column>
                        <el-table-column
                          :label='$t("volumn")||"成交量"'
                          prop='complete_vol'>
                        </el-table-column>
                        <el-table-column
                          :width="$i18n.locale==='zh-CN'?'60':'120'"
                          :label='$t("operation")||"操作"'>
                          <span class="handle color-danger"
                            slot-scope="scope"
                            v-text="$t('withdrawed'||'撤单')">
                          </span>
                        </el-table-column>
                      </el-table>
                    </template>
                    <unlogin-tip></unlogin-tip>
                </div>
                <!-- 右侧内容(成交) -->
                <div class="content-rt">
                  <div class="panel-title flex flex-between">
                    <span class="font-18 font-bit-bold" v-text="$t('tradeRecord')||'成交历史'"></span>
                    <!-- <router-link to=''>更多</router-link> -->
                  </div>
                  <template v-if="userData.isLogin">
                    <div class="break-line"></div>
                    <el-table style="font-weight:normal"
                      :data='historicalBuyData'
                      :cell-style='myCellStyle'
                      max-height='500'
                      stripe>
                      <el-table-column width='100' :label='$t("time")||"时间"'>
                        <span class="color-danger" slot-scope="scope" v-text="scope.row.writedate"></span>
                      </el-table-column>
                      <el-table-column width='150'
                        :label='priceLabel'
                        prop='price'>
                      </el-table-column>
                      <el-table-column width='120'
                        :label='amountLabel'
                        prop='number'>
                      </el-table-column>
                      <el-table-column :label='totalLabel'>
                        <div slot-scope="scope" v-text="scope.row.total"></div>
                      </el-table-column>
                    </el-table>
                  </template>
                  <unlogin-tip></unlogin-tip>
                </div>
              </div>
            </el-main>
        </el-container>
        <!-- 充币弹窗 -->
        <charge-box
          :showCharge='show'
          :chargeAddress='chargeAddress' 
          @closeModel='onClose'>
        </charge-box>
        <my-footer></my-footer>
    </div>
</template>
<script>
import mainCoinModel from "@/model/allCoinModel.js";
import chargeBox from "@/components/dialogContent/chargeBox";
export default {
  components: { chargeBox },
  data() {
    return {
      show: false,
      userData: this.userModel,
      buyFormData: {
        price: "",
        orderVol: ""
      },
      sellFormData: {
        price: "",
        orderVol: ""
      },
      dataMaxLen: 5,
      sellFormData: {},
      currentId: 1,
      tableData: null,
      //买入记录
      latestBuyData: null,
      latestSoldData: null,
      //当日委托
      currentDeclareData: null,
      //历史委托
      historicalDeclareData: null,
      //成交历史
      historicalBuyData: null,
      maincoin: null,
      tradecoin: null,
      // 余额
      myBlance: 0,
      //当日可用
      myAvailable: "",
      // 当前币种
      currentCoinInfo: "",
      // 充币地址
      chargeAddress: "",
      // 充币二维码
      qrCode: null
    };
  },
  mounted() {
    this.$bus.on("tradeCoinLoad", coinData => {
      this.currentCoinInfo = coinData.currentSubCoin;
      this.buyFormData.price = this.sellFormData.price = this.currentCoinInfo.prise;
      this.maincoin = coinData.maincoin;
      this.tradecoin = coinData.tradecoin;
      // 获取币种信息
      this.awaitResult(coinData.maincoin, coinData.tradecoin).then(res => {
        let [entrustData, orderData, buyOrder, sellOrder, allOrder] = [...res];
        this.currentDeclareData = entrustData.data.list;
        this.historicalBuyData = orderData.data.list;
        this.latestBuyData = buyOrder.data.list.slice(0, 5);
        this.latestSoldData = sellOrder.data.list.slice(0, 5);
        this.historicalBuyData = allOrder.data.list;
      });
      // 获取可用
      Promise.all([
        this.getAvailabel(this.tradecoin),
        this.getAvailabel(this.maincoin)
      ]).then(res => {
        let [myBlance, myAvailable] = [...res];
        myBlance && (this.myBlance = myBlance);
        myAvailable && (this.myAvailable = myAvailable);
      });
    });
  },
  methods: {
    myCellStyle() {
      return "padding:6px 0 !important;border:none";
    },
    //页面请求
    awaitResult(maincoin, tradecoin) {
      let params = {
        maincoin: maincoin,
        tradcoin: tradecoin,
        showLoading: 0
      };
      // 获取历史委托
      const entrustData = this.request(this.api.getentrust, params);
      // 获取历史交易
      const orderData = this.request(this.api.gethistoryorder, params);
      // 买入五档
      const buyOrder = this.request(this.api.buyorder, params);
      // 卖出五档
      const sellOrder = this.request(this.api.sellorder, params);
      // 交易记录
      const allOrder = this.request(this.api.gettoporder, params);
      return Promise.all([
        entrustData,
        orderData,
        buyOrder,
        sellOrder,
        allOrder
      ]).catch(err => {
        console.log(err);
      });
    },
    // 获取可用
    getAvailabel(coin) {
      return this.request(this.api.getdaynumber, {
        coin: coin,
        showLoading: 0
      }).then(res => {
        if (res && res.data && res.data.list.length > 0) {
          Promise.resolve(res.data.list[0]);
        } else {
          return null;
        }
      });
    },
    // 获取充值地址
    getchargeAddress(coin) {
      this.request(this.api.getaddress, { coin: coin }).then(res => {
        console.log(`充币地址${JSON.stringify(res)}`);
        if (res && res.code != "0") return this.getDataFaild(res.msg);
        this.chargeAddress = res.data.address[0].address;
      });
    },
    buyHandle() {},
    sellHandle() {},
    //表格列点击
    getRowData(data) {
      this.currentCoinInfo = data;
      mainCoinModel.coinid = data.maincoinid;
      mainCoinModel.tradecoinid = data.coinid;
    },
    // 打开充币
    onClose() {
      this.show = false;
    },
    // 打开弹窗
    showChargeBox() {
      this.show = true;
      if (
        this.chargeAddress == "" ||
        mainCoinModel.tradecoinid != this.tradecoin
      ) {
        this.getchargeAddress(this.tradecoin);
      }
    }
  },
  computed: {
    amountLabel() {
      return `${this.$t("amount") || "数量"}(${this.tradecoin})`;
    },
    buyingLabel() {
      return `${this.$t("buy") || "买入"}&nbsp;${this.tradecoin}`;
    },
    sellingLabel() {
      return `${this.$t("sell") || "卖出"}&nbsp;${this.tradecoin}`;
    },
    priceLabel() {
      return `${this.$t("price") || "价格"}(${this.maincoin})`;
    },
    totalLabel() {
      return `${this.$t("total") || "累计"}(${this.maincoin})`;
    },
    marketVolLabel() {
      return `${this.$t("marketVol") || "挂单量"}(${this.tradecoin})`;
    },
    //可用余额
    availabelBalance() {
      return `${this.$t("avilable") || "可用"}&nbsp;${this.myBlance ||
        0}&nbsp;${this.tradecoin}`;
    },
    //可兑换额度
    availabelAmount() {
      return `${this.$t("canExchange") || "可兑换"}&nbsp;${this.myAvailable ||
        0}&nbsp;${this.maincoin}`;
    }
  },
  watch: {
    buyFormData: {
      handler: function(val, oldVal) {
        this.buyBtnDisabled = false;
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
$mr: 11px;
.break-line {
  @include breakLine;
}
$border: 1px solid #e5e5e5;
.el-container {
  border-bottom: $border;
}

.trade-market {
  width: 34%;
  > div:first-child {
    margin-bottom: 12px;
  }
}
.vertical-line {
  height: 360px;
  width: 1px;
  background: $bd-color;
  transform: scaleX(0.5);
  bottom: 0;
}
.panel-head {
  @include textVcenter;
  border-bottom: 1px solid #fcfcfc;
  .heading {
    font-weight: 500;
    font-size: $font-large;
  }
  .currency-thumb {
    margin-right: $mr;
  }
  .market-val {
    margin-left: $mr;
    span:first-child {
      font-weight: 500;
      margin-right: $mr;
    }
  }
  .market-condition {
    font-size: 14px;
    span {
      padding-left: 23px;
    }
    i {
      padding-left: $mr;
    }
  }
}
.k-map {
  height: 414px;
}
.form-wrap {
  width: 48%;
  .break-line {
    margin-top: 12px;
  }
  .total {
    margin-top: 19px;
  }
  button {
    margin-top: 22px;
  }
  .account {
    margin-top: 14px;
    a {
      color: $color-danger;
    }
  }
}
.input-group {
  margin-top: 19px;
  .unit {
    line-height: 40px;
    color: #333;
    padding-right: 6px;
  }
  .el-input {
    margin-top: 10px;
  }
  .hint {
    display: inline-block;
    margin-top: $mr;
  }
}
.panel-container {
  .panel-title {
    margin-top: 30px;
    margin-bottom: 12px;
  }
  .content-lf {
    width: 64%;
    .handle {
      cursor: pointer;
    }
  }
  .content-rt {
    width: 34%;
  }
}
</style>
