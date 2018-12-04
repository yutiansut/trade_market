<template>
    <div class="main wh-full">
        <my-header class="header-main">
            <login-bar></login-bar>
        </my-header>
        <el-container>
            <!-- 左侧表格栏目 -->
            <el-aside width="24%">
              <ce-aside-comp></ce-aside-comp>
            </el-aside>
            <!-- 主要body -->
            <el-main>
              <div class="panel-head flex flex-v-center">
                <img class="currency-thumb thumb-30" src="" alt="">
                <div class="heading">BTC/USDT</div>
                <div class="market-val flex flex-v-center">
                  <span class="font-16">000000.1423</span>
                  <span class="font-14 color-666">≈0.05 CNY </span>
                </div>
                <div class="market-condition font-12">
                  <span>
                    <em class="color-666" v-text="$t('increase')||'涨幅'"></em>
                    <i class="color-danger">+3.68%</i>
                  </span>
                  <span>
                    <em class="color-666" v-text="$t('high')||'高'"></em>
                    <i>0.000013482</i>
                  </span>
                  <span>
                    <em class="color-666" v-text="$t('low')||'低'"></em>
                    <i>0.000010578</i>
                  </span>
                  <span>
                    <em class="color-666" v-text="$t('dayVol')||'24H量'"></em>
                    <i>314854300BTC</i>
                  </span>
                </div>
              </div>
              <!-- K线图占位 -->
              <div id='kMap' class="k-map"></div>
              <div class="panel-container flex flex-between">
                <div class="content-lf flex flex-between">
                  <!-- 买入 -->
                  <div class="form-wrap">
                    <div class="font-18 font-bit-bold">
                      {{$t('buy')||'买入'}}&nbsp;BTC
                    </div>
                    <div class="break-line"></div>
                    <div class="account flex flex-between">
                      <span class="balance">{{$t('avilable')||'可用'}}&nbsp;0.00000000 BTC</span>
                      <a href="javascript:" v-text="$t('recharge')||'充值'"></a>
                    </div>
                    <div class="input-group">
                      <label v-text="$t('buyingRate')||'买入价'"></label>
                      <el-input v-model="buyFormData.price">
                        <span class="unit" slot="suffix">BTC</span>
                      </el-input>
                      <em class="hint font-12">≈0.05</em>
                    </div>
                    <div class="input-group">
                      <label v-text="$t('buyVol')||'买入量'"></label>
                      <el-input v-model="buyFormData.orderVol">
                        <span class="unit" slot="suffix">USDT</span>
                      </el-input>
                    </div>
                    <div class="total flex flex-between">
                      <span>{{$t('total')||'累计'}}&nbsp;USDT</span>0
                    </div>
                    <button @click="userData.isLogin?buyHandle:errMsg('请登录后操作')"
                      class="btn-block btn-large btn-danger btn-active"
                      v-text="($t('buy')||'买入')+' BTC'">
                    </button>
                  </div>
                  <!-- 卖出 -->
                  <div class="form-wrap">
                    <div class="font-18 font-bit-bold">{{$t('sell')||'卖出'}}&nbsp;BTC</div>
                    <div class="break-line"></div>
                    <div class="account flex flex-between">
                      <span class="balance">{{$t('avilable')||'可用'}}&nbsp;0.00000000 BTC</span>
                      <a href="javascript:" v-text="$t('recharge')"></a>
                    </div>
                    <div class="input-group">
                      <label v-text="$t('sellingRate')||'卖出价'"></label>
                      <el-input v-model="sellFormData.price">
                        <span class="unit" slot="suffix">BTC</span>
                      </el-input>
                      <em class="hint font-12">≈0.05</em>
                    </div>
                    <div class="input-group">
                      <label v-text="$t('sellVol')||'卖出量'"></label>
                      <el-input v-model="sellFormData.price">
                        <span class="unit" slot="suffix">USDT</span>
                      </el-input>
                    </div>
                    <div class="total flex flex-between">
                      <span>{{$t('total')}}&nbsp;USDT</span>0
                    </div>
                    <button @click="userData.isLogin?buyHandle:errMsg('请登录后操作')"
                      class="btn-block btn-large btn-success btn-active"
                      v-text="($t('sell')||'卖出')+' BTC'">
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
                  <el-table style="font-weight:normal"
                    :data='latestBuyData'
                    :cell-style='myCellStyle' 
                    max-height='220' stripe>
                    <el-table-column width='80'
                      :label='$t("stalls")||"档位"'>
                      <span class="color-danger" slot-scope="scope">
                        {{$t('buy')}}&nbsp;{{scope.row.lv}}
                      </span>
                    </el-table-column>
                    <el-table-column width='150'
                      :label='($t("price")||"价格")+"(USDT)"'
                      prop='price'>
                    </el-table-column>
                    <el-table-column width='120'
                      :label='($t("amount")||"数量")+"(BTC)"'
                      prop='amount'>
                    </el-table-column>
                    <el-table-column :label='($t("total")||"累计")+"(BTC)"'>
                      <div slot-scope="scope" v-text="scope.row.total"></div>
                    </el-table-column>
                  </el-table>
                  <div class="m-top-10"></div>
                  <el-table style="font-weight:normal"
                    :data='latestSoldData'
                    :cell-style='myCellStyle'
                    :show-header='false'
                    max-height='180' stripe>
                    <el-table-column width='80'
                      :label='$t("stalls")||"档位"'>
                      <span class="color-success" slot-scope="scope">
                        {{$t('sell')}}&nbsp;{{scope.row.lv}}
                      </span>
                    </el-table-column>
                    <el-table-column width='150' 
                      :label='($t("price")||"价格")+"(USDT)"'
                      prop='price'>
                    </el-table-column>
                    <el-table-column width='120'
                      :label='($t("amount")||"数量")+"(BTC)"'
                      prop='amount'>
                    </el-table-column>
                    <el-table-column
                      :label='($t("total")||"累计")+"(BTC)"'>
                      <div slot-scope="scope" v-text="scope.row.total"></div>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <div class="panel-container flex flex-between">
                <div class="content-lf">
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
                          :label='($t("price")||"价格")+"(USDT)"'
                          prop='price'>
                        </el-table-column>
                        <el-table-column
                          :label='($t("marketVol")||"挂单量")+"(BTC)"'
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
                          :label='($t("price")||"价格")+"(USDT)"'
                          prop='price'>
                        </el-table-column>
                        <el-table-column
                          :label='($t("marketVol")||"挂单量")+"(BTC)"'
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
                <div class="content-rt">
                  <div class="panel-title flex flex-between">
                    <span class="font-18 font-bit-bold" v-text="$t('tradeRecord')||'成交历史'"></span>
                    <!-- <router-link to=''>更多</router-link> -->
                  </div>
                  <template v-if="userData.isLogin">
                    <div class="break-line"></div>
                    <el-table style="font-weight:normal"
                      :data='historicalBuyData'
                      :cell-style='myCellStyle' stripe>
                      <el-table-column width='100' :label='$t("time")||"时间"'>
                        <span class="color-danger" slot-scope="scope" v-text="scope.row.date"></span>
                      </el-table-column>
                      <el-table-column width='150'
                        :label='($t("price")||"价格")+"(USDT)"'
                        prop='price'>
                      </el-table-column>
                      <el-table-column width='120'
                        :label='($t("amount")||"数量")+"(BTC)"'
                        prop='amount'>
                      </el-table-column>
                      <el-table-column :label='($t("total")||"累计")+"(BTC)"'>
                        <div slot-scope="scope" v-text="scope.row.total"></div>
                      </el-table-column>
                    </el-table>
                  </template>
                  <unlogin-tip></unlogin-tip>
                </div>
              </div>
            </el-main>
        </el-container>
        <my-footer></my-footer>
    </div>
</template>
<script>
export default {
  data() {
    return {
      userData: this.userModel,
      buyFormData: {
        price: "",
        orderVol: ""
      },
      sellFormData: {
        price: "",
        orderVol: ""
      },
      sellFormData: {},
      currentId: 1,
      tableData: [
        {
          thumb: "",
          currency: " BCD",
          latestPrize: "124",
          increase: "+6%"
        },
        {
          thumb: "",
          currency: " CNYT",
          latestPrize: "421",
          increase: "+6%"
        }
      ],
      latestBuyData: [
        {
          i18nKey: "buy",
          lv: "5",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        },
        {
          i18nKey: "buy",
          lv: "4",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        },
        {
          i18nKey: "buy",
          lv: "3",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        },
        {
          i18nKey: "buy",
          lv: "2",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        },
        {
          i18nKey: "buy",
          lv: "1",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        }
      ],
      latestSoldData: [
        {
          i18nKey: "sell",
          lv: "5",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        },
        {
          i18nKey: "sell",
          lv: "4",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        },
        {
          i18nKey: "sell",
          lv: "3",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        },
        {
          i18nKey: "sell",
          lv: "2",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        },
        {
          i18nKey: "sell",
          lv: "1",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        }
      ],
      currentDeclareData: [
        {
          date: "2018-8-8",
          type: "买入",
          price: "0.354581",
          order_vol: "15161",
          complete_vol: "156516"
        },
        {
          date: "2018-8-8",
          type: "买入",
          price: "0.354581",
          order_vol: "15161",
          complete_vol: "156516"
        }
      ],
      historicalDeclareData: [
        {
          date: "2018-8-8",
          type: "卖出",
          price: "0.354581",
          order_vol: "15161",
          complete_vol: "156516"
        },
        {
          date: "2018-8-8",
          type: "卖出",
          price: "0.354581",
          order_vol: "15161",
          complete_vol: "156516"
        }
      ],
      historicalBuyData: [
        {
          date: "17:15:05",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        },
        {
          date: "17:15:05",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        }
      ]
    };
  },
  mounted() {
    this.getEntrust();
  },
  methods: {
    myCellStyle() {
      return "padding:6px 0 !important;border:none";
    },
    buyHandle() {},
    sellHandle() {},
    //获取我的委托
    getEntrust() {
      this.request(this.api.getentrust).then(res => {
        console.log(`我的委托：${JSON.stringify(res)}`);
        if (res && res.code != "0") return this.getDataFaild(res.msg);
        res.data && res.data.list && (this.currentDeclareData = res.data.list);
      });
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
      color: #333;
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
