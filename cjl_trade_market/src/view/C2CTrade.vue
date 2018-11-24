<template>
    <div class="main">
        <my-header class="header-main">
            <login-bar></login-bar>
        </my-header>
        <el-container>
            <!-- 侧栏列表 -->
            <el-aside width="400px">
              <c2c-aside-comp :myData='currencyList'></c2c-aside-comp>
            </el-aside>
            <el-main>
                <div class="panel-head flex flex-v-center">
                    <img class="thumb-30" src="" alt="">
                    <span class="font-bold font-20">BTC/CNY</span>
                    <div class="market-condition">
                        <span><em class="color-666">实时价</em><i>￥6.94</i></span>
                        <span><em class="color-666">涨幅</em><i class="color-danger">+3.68%</i></span>
                        <span><em class="color-666">高</em><i>￥7.29</i></span>
                        <span><em class="color-666">低</em><i>￥6.70</i></span>
                    </div>
                </div>
                <!-- 分割线 -->
                <div class="break-line"></div>
                <!-- 买入/卖出 -->
                <div class="panel-container p-rel flex flex-between">
                    <div class="form-wrap">
                        <div class="font-18 font-bit-bold">买入BTC</div>
                        <div class="break-line"></div>
                        <div class="account flex flex-between">
                            <span class="balance">可用 0.00000000 BTC</span>
                            <a href="javascript:">充值</a>
                        </div>
                        <div class="input-group">
                            <label>买入估价</label>
                            <el-input>
                                <span class="unit" slot="suffix">BTC</span>
                            </el-input>
                        </div>
                        <div class="input-group">
                            <label>买入量</label>
                            <el-input>
                                <span class="unit" slot="suffix">USDT</span>
                            </el-input>
                        </div>
                        <div class="input-group">
                            <label>余额</label>
                            <el-input>
                                <span class="unit" slot="suffix">CNY</span>
                            </el-input>
                        </div>
                        <button @click="isLogin?buyBTC:errMsg('请登录后操作')" class="btn-block btn-large btn-danger btn-active">买入BTC</button>
                    </div>
                    <div class="vertical-line p-abs abs-h-center"></div>
                    <div class="form-wrap">
                        <div class="font-18 font-bit-bold">卖出BTC</div>
                        <div class="break-line"></div>
                        <div class="account flex flex-between">
                            <span class="balance">可用 0.00000000 BTC</span>
                            <a href="javascript:">充值</a>
                        </div>
                        <div class="input-group">
                            <label>卖出估价</label>
                            <el-input>
                                <span class="unit" slot="suffix">BTC</span>
                            </el-input>
                        </div>
                        <div class="input-group">
                            <label>卖出量</label>
                            <el-input>
                                <span class="unit" slot="suffix">USDT</span>
                            </el-input>
                        </div>
                        <div class="input-group">
                            <label>余额</label>
                            <el-input>
                                <span class="unit" slot="suffix">CNY</span>
                            </el-input>
                        </div>
                        <button @click="isLogin?sellHandle:errMsg('请登录后操作')" class="btn-block btn-large btn-success btn-active">卖出BTC</button>
                    </div>
                </div>
                <!-- 挂单 -->
                <div class="panel-container">
                    <div class="panel-header font-18 font-bit-bold">市场挂单</div>
                    <div class="break-line"></div>
                    <el-table
                        :fit='true'
                        :max-height='428'
                        :data='marketList'>
                        <el-table-column width="120" label='类型'>
                          <span slot-scope="scope"
                            v-text="scope.row.type"
                            :class="scope.row.type=='买入'?'color-danger':'color-success'">
                          </span>
                        </el-table-column>
                        <el-table-column prop='price' label='价格(CNY)'></el-table-column>
                        <el-table-column prop='amount' label='数量(USDT)'></el-table-column>
                        <el-table-column prop='total' label='总计(CNY)'></el-table-column>
                        <el-table-column prop='tradeLimit' label='交易限额(USDT)'></el-table-column>
                        <el-table-column width="150" prop='seller' label='商家在线'></el-table-column>
                        <el-table-column width="150" prop='volumn' label='成交单数'></el-table-column>
                        <el-table-column width="120" prop='meanTime' label='平均用时'></el-table-column>
                        <el-table-column width='100' label='操作'>
                          <template slot-scope="scope">
                            <button v-if='scope.row.type=="买入"'
                              class="btn-inline btn-mini btn-radius btn-danger"
                              v-text="scope.row.type"
                              @click="isLogin?buyOrderHandle:errMsg('请登录后操作')">
                            </button>
                            <button v-else
                              class="btn-inline btn-mini btn-radius btn-success"
                              v-text="scope.row.type">
                            </button>
                          </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 我的订单 -->
                <div class="panel-container">
                    <div class="panel-header font-18 font-bit-bold">我的订单</div>
                    <template v-if="isLogin">
                      <div class="break-line"></div>
                      <el-table
                        :fit='true'
                        :data='myOrderList'>
                          <el-table-column width="150" prop='orderId' label='单号'></el-table-column>
                          <el-table-column width='120' label='类型'>
                            <span slot-scope="scope"
                              v-text="scope.row.type"
                              :class="scope.row.type=='买入'?'color-danger':'color-success'">
                            </span>
                          </el-table-column>
                          <el-table-column prop='price' label='价格(CNY)'></el-table-column>
                          <el-table-column prop='amount' label='数量(USDT)'></el-table-column>
                          <el-table-column prop='money' label='金额(CNY)'></el-table-column>
                          <el-table-column width='150' prop='name' label='对方姓名'></el-table-column>
                          <el-table-column width="200" prop='createdTime' label='建立时间'></el-table-column>
                          <el-table-column width="100" label='操作'>
                              <span slot-scope="scope" 
                              v-text='statusMap["status_"+scope.row.status].label'
                              :class='"status-"+scope.row.status'></span>
                          </el-table-column>
                      </el-table>
                    </template>
                    <unlogin-tip></unlogin-tip>
                </div>
                <div class="panel-container">
                    <div class="panel-header font-18 font-bit-bold">我的C2C交易订单</div>
                    <template v-if="isLogin">
                      <div class="break-line"></div>
                      <el-table
                          :data='myC2COrderList'>
                          <el-table-column label='单号' prop=''></el-table-column>
                          <el-table-column label='类型' prop=''></el-table-column>
                          <el-table-column label='价格(CNY)' prop=''></el-table-column>
                          <el-table-column label='数量(USDT)' prop=''></el-table-column>
                          <el-table-column label='金额(CNY)' prop=''></el-table-column>
                          <el-table-column label='对方姓名' prop=''></el-table-column>
                          <el-table-column label='建立时间' prop=''></el-table-column>
                          <el-table-column width="100" label='操作'>
                              <span slot-scope="scope"></span>
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
          :title="confirmCfg.title"
          :numLabel="confirmCfg.numLabel"
          :amountLabel="confirmCfg.amountLabel"
          :valuationLabel='confirmCfg.valuationLabel'>
        </trade-confirm>
        <!-- 订单匹配弹窗 -->
        <order-match
          :show='dialogId==2?true:false'
          :myData='orderMatchList'
          :operateLable='operateLable'>
        </order-match>
        <!-- 挂单买入/卖出待确认弹窗 -->
        <order-confirm
          :show='dialogId==3?true:false'>
        </order-confirm>
        <market-order
          :show='dialogId==4?true:false'
          :title='marketOrderCfg.title'
          :volumnLabel='marketOrderCfg.volumnLabel'>
        </market-order>
        <order-paid
          :show='dialogId==5?true:false'
          :title="'订单详情'">
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
      isLogin: null,
      operateLable: "卖出",
      // 订单匹配弹窗配置
      confirmCfg: {
        title: "买入确认",
        numLabel: "买入数量",
        amountLabel: "买入金额",
        valuationLabel: "买入估价"
      },
      //市场挂单弹窗配置
      marketOrderCfg: {
        title: "市挂单买入",
        volumnLabel: "买入量"
      },
      // 状态映射表
      statusMap: {
        status_0: {
          label: "进行中"
        },
        status_1: {
          label: "已完成"
        },
        status_2: {
          label: "代付款"
        },
        status_3: {
          label: "代收款"
        },
        status_4: {
          label: "撤单"
        }
      },
      // 市场挂单
      marketList: [
        {
          type: "买入",
          price: "6.64",
          amount: "30000.0000",
          total: "20335.0000 拷贝",
          tradeLimit: "800.00~30000.00",
          seller: "黎** 1分钟",
          volumn: "6分钟",
          meanTime: "6分钟"
        }
      ],
      //我的订单
      myOrderList: [
        {
          orderId: "10000200",
          type: "买入",
          price: "30000.0000",
          amount: "30000.0000",
          money: "800.00~30000.00",
          name: "黎**",
          createdTime: "2018-09-07 14:20:30",
          status: "0"
        }
      ],
      // 我的C2C订单
      myC2COrderList: [],
      // 侧栏列表
      currencyList: [
        {
          thumb: "",
          currency: "USDT/ CNY"
        }
      ],
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
    this.isLogin = this.userModel.isLogin;
  },
  methods: {
    buyBTC() {},
    sellBTC() {},
    buyOrderHandle() {}
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
