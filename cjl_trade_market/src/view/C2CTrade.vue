<template>
    <div class="main">
        <my-header class="header-main">
            <login-bar></login-bar>
        </my-header>
        <el-container>
            <!-- 侧栏列表 -->
            <el-aside width="400px">
              <c2c-aside-comp
                :myData='currencyList'
                @onListClick='onListClick'>
              </c2c-aside-comp>
            </el-aside>
            <el-main>
                <div class="panel-head flex flex-v-center">
                    <img class="thumb-30" src="" alt="">
                    <span class="font-bold font-20">{{coinInfo.coinid}}/CNY</span>
                    <div class="market-condition">
                        <span>
                          <em class="color-666" v-text="$t('livePrice')||'实时价'"></em>
                          <i v-text="coinInfo.price"></i>
                        </span>
                        <span>
                          <em class="color-666" v-text="$t('increase')||'涨幅'"></em>
                          <i class="color-danger">+3.68%</i>
                        </span>
                        <span>
                          <em class="color-666" v-text="$t('high')||'高'"></em>
                          <i>￥7.29</i>
                        </span>
                        <span>
                          <em class="color-666" v-text="$t('low')||'低'"></em>
                          <i>￥6.70</i>
                        </span>
                    </div>
                </div>
                <!-- 分割线 -->
                <div class="break-line"></div>
                <!-- 买入/卖出 -->
                <div class="panel-container p-rel flex flex-between">
                    <div class="form-wrap">
                        <div class="font-18 font-bit-bold" v-html="buyingLabel"></div>
                        <div class="break-line"></div>
                        <div class="account flex flex-between">
                            <span class="balance">{{$t('avilable')||'可用'}}&nbsp;0.00000000{{coinInfo.coinid}}</span>
                            <a href="/property" v-text="$t('recharge')||'充值'"></a>
                        </div>
                        <div class="input-group">
                            <label v-text="$t('buyingValiation')||'买入估价'"></label>
                            <el-input>
                                <span class="unit" slot="suffix">CNY</span>
                            </el-input>
                        </div>
                        <div class="input-group">
                            <label v-text="$t('buyVol')||'买入量'"></label>
                            <el-input>
                                <span class="unit" slot="suffix" v-text="coinInfo.coinid||''"></span>
                            </el-input>
                        </div>
                        <div class="input-group">
                            <label v-text="$t('balance')||'余额'"></label>
                            <el-input>
                                <span class="unit" slot="suffix">CNY</span>
                            </el-input>
                        </div>
                        <button @click="userData.isLogin?buyHandle:errMsg('请登录后操作')"
                          class="btn-block btn-large btn-danger btn-active"
                          v-html="buyingLabel">
                        </button>
                    </div>
                    <div class="vertical-line p-abs abs-h-center"></div>
                    <div class="form-wrap">
                        <div class="font-18 font-bit-bold" v-html="sellingLabel"></div>
                        <div class="break-line"></div>
                        <div class="account flex flex-between">
                          <span class="balance">{{$t('avilable')||'可用'}}&nbsp;0.00000000 BTC</span>
                          <a href="javascript:" v-text="$t('recharge')"></a>
                        </div>
                        <div class="input-group">
                            <label v-text="$t('sellingValiation')||'卖出估价'"></label>
                            <el-input>
                                <span class="unit" slot="suffix">CNY</span>
                            </el-input>
                        </div>
                        <div class="input-group">
                            <label v-text="$t('sellVol')||'卖出量'"></label>
                            <el-input>
                                <span class="unit" slot="suffix" v-text="coinInfo.coinid||''"></span>
                            </el-input>
                        </div>
                        <div class="input-group">
                            <label v-text="$t('balance')||'余额'"></label>                            
                            <el-input>
                                <span class="unit" slot="suffix">CNY</span>
                            </el-input>
                        </div>
                        <button @click="userData.isLogin?sellHandle:errMsg('请登录后操作')"
                          class="btn-block btn-large btn-success btn-active"
                          v-html="sellingLabel">
                        </button>
                    </div>
                </div>
                <!-- 挂单 -->
                <div class="panel-container">
                    <div class="panel-header font-18 font-bit-bold" v-text="$t('inOrder')||'市场挂单'"></div>
                    <div class="break-line"></div>
                    <el-table
                        :fit='true'
                        :max-height='428'
                        :data='marketList'>
                        <el-table-column width="120"
                          :label='$t("type")||"类型"'>
                          <span slot-scope="scope"
                            v-text="scope.row.type=='0'?($t('buy')||'买入'):($t('sell')||'卖出')"
                            :class="scope.row.type=='0'?'color-danger':'color-success'">
                          </span>
                        </el-table-column>
                        <el-table-column prop='price'
                          :label='($t("price")||"价格")+"(CNY)"'>
                        </el-table-column>
                        <el-table-column prop='number'
                          :label='numberLabel'>
                        </el-table-column>
                        <el-table-column prop='total'
                          :label='($t("total")||"总计")+"(CNY)"'>
                        </el-table-column>
                        <!-- <el-table-column prop='tradeLimit'
                          :label='($t("tradeLimit")||"交易限额")+"(USDT)"'>
                        </el-table-column>
                        <el-table-column width="150" prop='seller'
                          :label='$t("sellerOnline")||"商家在线"'>
                        </el-table-column>
                        <el-table-column width="150" prop='volumn'
                          :label='$t("orderVol")||"成交单数"'>
                        </el-table-column>
                        <el-table-column width="120" prop='meanTime'
                          :label='$t("averageTime")||"平均用时"'>
                        </el-table-column> -->
                        <el-table-column width='100'
                          :label='$t("operation")||"操作"'>
                          <template slot-scope="scope">
                            <button v-if='scope.row.type=="1"'
                              class="btn-inline btn-mini btn-radius btn-danger"
                              v-text="$t('buy')"
                              @click="userData.isLogin?buyOrderHandle:errMsg('请登录后操作')">
                            </button>
                            <button v-else
                              class="btn-inline btn-mini btn-radius btn-success"
                              v-text="$t('sell')">
                            </button>
                          </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 我的订单 -->
                <div class="panel-container">
                    <div class="panel-header font-18 font-bit-bold"
                      v-text="$t('myOrder')">
                    </div>
                    <template v-if="userData.isLogin">
                      <div class="break-line"></div>
                      <el-table
                        :fit='true'
                        :data='myOrderList'>
                          <el-table-column width="150"
                            prop='autoid'
                            :label='$t("orderId")||"单号"'>
                          </el-table-column>
                          <el-table-column width='120'
                            :label='$t("type")||"类型"'>
                            <span slot-scope="scope"
                              v-text="scope.row.type=='0'?($t('buy')||'买入'):($t('sell')||'卖出')"
                              :class="scope.row.type=='0'?'color-danger':'color-success'">
                            </span>
                          </el-table-column>
                          <el-table-column prop='price'
                            :label='($t("price")||"价格")+"(CNY)"'>
                          </el-table-column>
                          <el-table-column prop='number'
                            :label='numberLabel'>
                          </el-table-column>
                          <el-table-column prop='money'
                            :label='amountLabel'>
                          </el-table-column>
                          <!-- <el-table-column width='150' prop='name'
                            :label='$t("theirName")||"对方姓名"'>
                          </el-table-column> -->
                          <el-table-column width="200" prop='wdate'
                            :label='$t("createdTime")||"建立时间"'>
                          </el-table-column>
                          <el-table-column width="100"
                            :label='$t("operation")||"操作"'>
                            <span slot-scope="scope"
                            v-text='"进行中"'
                            :class='"status-"+scope.row.status'></span>
                          </el-table-column>
                      </el-table>
                    </template>
                    <unlogin-tip></unlogin-tip>
                </div>
                <div class="panel-container">
                    <div class="panel-header font-18 font-bit-bold"
                      v-text="$t('myCtcOrder')||'我的CTC交易订单'">
                    </div>
                    <template v-if="userData.isLogin">
                      <div class="break-line"></div>
                      <el-table
                          :data='myC2COrderList'>
                          <el-table-column width="150"
                            prop='autoid'
                            :label='$t("orderId")||"单号"'>
                          </el-table-column>
                          <el-table-column width='120'
                            :label='$t("type")||"类型"'>
                            <span slot-scope="scope"
                              v-text="scope.row.type=='0'?($t('buy')||'买入'):($t('sell')||'卖出')"
                              :class="scope.row.type=='0'?'color-danger':'color-success'">
                            </span>
                          </el-table-column>
                          <el-table-column prop='price'
                            :label='($t("price")||"价格")+"(CNY)"'>
                          </el-table-column>
                          <el-table-column prop='number'
                            :label='numberLabel'>
                          </el-table-column>
                          <el-table-column prop='money'
                            :label='amountLabel'>
                          </el-table-column>
                          <!-- <el-table-column width='150' prop='name'
                            :label='$t("theirName")||"对方姓名"'>
                          </el-table-column> -->
                          <el-table-column width="200" prop='wdate'
                            :label='$t("createdTime")||"建立时间"'>
                          </el-table-column>
                          <el-table-column width="100"
                            :label='$t("operation")||"操作"'>
                            <span slot-scope="scope" 
                            v-text='statusMap["status_"+scope.row.state].label'
                            :class='"status-"+scope.row.state'></span>
                          </el-table-column>
                      </el-table>
                    </template>
                    <unlogin-tip></unlogin-tip>
                </div>
            </el-main>
        </el-container>
        <my-footer></my-footer>
        <!-- 操作确认弹窗 -->
        <trade-confirm
          :show='dialogId==1?true:false'
          :title="$t(confirmCfg.titlei18n)||confirmCfg.title"
          :numLabel="$t(confirmCfg.numLabeli18n)||confirmCfg.numLabel"
          :amountLabel="$t(confirmCfg.amountLabeli18n)||confirmCfg.amountLabel"
          :valuationLabel='$t(confirmCfg.valuationLabeli18n)||confirmCfg.valuationLabel'
          :tradeModeLabel='$t(confirmCfg.tradeModeLabeli18n)||confirmCfg.tradeModeLabel'>
        </trade-confirm>
        <!-- 订单匹配弹窗 -->
        <order-match
          :show='dialogId==2?true:false'
          :myData='orderMatchList'
          :operateLable='$t(operateLabeli18n)||operateLable'>
        </order-match>
        <!-- 挂单买入/卖出待确认弹窗 -->
        <order-confirm
          :show='dialogId==3?true:false'>
        </order-confirm>
        <market-order
          :show='dialogId==4?true:false'
          :title='$t("buyPendingOrder")||marketOrderCfg.title'
          :volumnLabel='$t("buyVol")||marketOrderCfg.volumnLabel'>
        </market-order>
        <order-paid
          :show='dialogId==5?true:false'
          :title="$t('orderDetail')||'订单详情'">
        </order-paid>
    </div>
</template>
<script>
import TradeConfirm from "@/components/dialogContent/TradeConfirm";
import orderMatch from "@/components/dialogContent/orderMatching";
import orderConfirm from "@/components/dialogContent/OrderConfirm";
import marketOrder from "@/components/dialogContent/MarketOrder";
import orderPaid from "@/components/dialogContent/orderPaid";
export default {
  components: {
    TradeConfirm,
    orderMatch,
    orderConfirm,
    marketOrder,
    orderPaid
  },
  data() {
    return {
      dialogId: null,
      userData: this.userModel,
      operateLable: "卖出",
      operateLabeli18n: "sell",
      coinid: "",
      coinInfo: "",
      myBlance: 0,
      myAvailable: 0,
      accountInfo: null,
      // 订单匹配弹窗配置
      confirmCfg: {
        title: "买入确认",
        titlei18n: "buyingConfirm",
        numLabel: "买入数量",
        numLabeli18n: "buyingNum",
        amountLabel: "买入金额",
        amountLabeli18n: "buyingAmount",
        valuationLabel: "买入估价",
        valuationLabeli18n: "buyingValiation",
        tradeModeLabel: "交易方式",
        tradeModeLabeli18n: "tradeMethods"
      },
      //市场挂单弹窗配置
      marketOrderCfg: {
        title: "市挂单买入",
        volumnLabel: "买入量"
      },
      // 状态映射表
      statusMap: {
        status_1: {
          label: "进行中"
        },
        status_2: {
          label: "已完成"
        },
        status_3: {
          label: "待付款"
        },
        status_4: {
          label: "待收款"
        },
        status_5: {
          label: "撤单"
        }
      },
      // 市场挂单
      marketList: null,
      //正在进行中订单
      myOrderList: null,
      // 我的C2C订单
      myC2COrderList: [],
      // 侧栏列表
      currencyList: [],
      // 订单匹配列表
      orderMatchList: [
        {
          id: "1",
          name: "李先生",
          price: "100",
          amount: "10"
        },
        {
          id: "2",
          name: "李先生",
          price: "100",
          amount: "10"
        }
      ]
    };
  },
  mounted() {
    this.getc2corder();
    this.getC2Ccoin()
      .then(res => {
        this.currencyList = res;
        this.coinInfo = res[0];
        return Promise.resolve(res[0].coinid);
      })
      .then(coin => {
        this.gettradorder(coin);
        this.getMyAccount(coin);
        return this.getc2callorder(coin);
      })
      .then(result => {
        result && (this.marketList = result);
        // result && (this.coinInfo = result);
      });
  },
  computed: {
    // 购买文字
    buyingLabel() {
      return `${this.$t("buy") || "买入"}&nbsp;${this.coinInfo.coinid || ""}`;
    },
    // 售卖文字
    sellingLabel() {
      return `${this.$t("sell") || "买入"}&nbsp;${this.coinInfo.coinid || ""}`;
    },
    // 数量项目
    numberLabel() {
      return `${this.$t("amount") || "数量"}(${this.coinInfo.coinid || ""})`;
    },
    //金额文字
    amountLabel() {
      return `${this.$t("money") || "金额"}(CNY)`;
    }
  },
  methods: {
    buyHandle() {},
    sellHandle() {},
    buyOrderHandle() {},
    onListClick(data) {
      console.log(data);
    },
    // 获取c2c币种
    getC2Ccoin() {
      return this.request(this.api.getc2ccoin, {
        showLoading: 0
      }).then(res => {
        console.log(`c2c币种：${JSON.stringify(res)}`);
        if (res.data && res.data.list) {
          return Promise.resolve(res.data.list);
        }
      });
    },
    // 获取市场挂单
    getc2callorder(coinid) {
      return this.request(this.api.getc2callorder, {
        coin: coinid
      }).then(res => {
        console.log(`市场挂单:${JSON.stringify(res)}`);
        if (res.code == "0") {
          return Promise.resolve(res.data.list);
        }
      });
    },
    getCoinbyCoin(coinid) {
      return this.request(this.api.getCoinbyCoin, {
        coin: coinid
      }).then(res => {
        console.log(`用户币种信息：${JSON.stringify(res)}`);
        if (res.code == "0") {
          return Promise.resolve(res.data.list[0]);
        }
      });
    },
    // 获取我c2c交易的订单
    getc2corder() {
      return this.request(this.api.getc2corder).then(res => {
        console.log(`c2c我的订单：${JSON.stringify(res)}`);
        if (res.code == "0") {
          this.myOrderList = res.data.list;
        }
      });
    },
    //获取我的c2c订单
    gettradorder(coin) {
      return this.request(this.api.gettradorder, {
        coin: coin
      }).then(res => {
        console.log(`c2c交易订单：${JSON.stringify(res)}`);
        this.myC2COrderList = res.data.result;
      });
    },
    //获取资产信息
    getMyAccount(coin) {
      this.request(this.api.getaccount, { search: coin }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
$border: 1px solid #e5e5e5;
.break-line {
  @include breakLine;
}
span {
  &.color-danger {
    color: $color-danger;
  }
  &.color-success {
    color: $color-success;
  }
}
.vertical-line {
  height: 360px;
  width: 1px;
  background: $bd-color;
  transform: scaleX(0.5);
  bottom: 0;
}
span {
  &.status-0 {
    color: #ccc;
  }
  &.status-1 {
    color: $main-font-color;
  }
  &.status-2 {
    color: $color-success;
  }
  &.status-3 {
    color: $color-danger;
  }
}
$mr: 11px;
.el-container {
  border-bottom: $border;
  .panel-head {
    margin-bottom: 9px;
    .thumb-30 {
      margin-right: $mr;
    }
  }
  .market-condition {
    span {
      display: inline-block;
      margin-left: 20px;
    }
    em {
      padding-right: 13px;
    }
  }
  .panel-container {
    .panel-header {
      margin: 40px 0 12px 0;
    }
  }
  .form-wrap {
    width: 720px;
    margin-top: 30px;
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
  }
}
</style>
