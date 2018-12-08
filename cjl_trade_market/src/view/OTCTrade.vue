<template>
    <div class="main wh-full">
        <my-header class="header-main">
            <login-bar></login-bar>
        </my-header>
        <el-container>
            <el-aside width='400px'>
                <c2c-aside-comp
                    @onListClick="onListClick"
                    :myData='currencyList'>
                </c2c-aside-comp>
            </el-aside>
            <el-main>
                <div class="panel-container p-rel flex flex-between">
                    <div class="form-wrap">
                        <div class="font-18 font-bit-bold" v-html="buyingLabel"></div>
                        <div class="break-line"></div>
                        <div class="account flex flex-between">
                            <span class="balance">{{$t('avilable')||'可用'}}&nbsp;0.00000000 BTC</span>
                            <a href="/property" v-text="$t('recharge')||'充值'"></a>
                        </div>
                        <div class="input-group">
                            <label v-text="$t('buyingValiation')||'买入估价'"></label>
                            <el-input disabled :value='coinInfo.buycny'>
                                <span class="unit" slot="suffix">CNY</span>
                            </el-input>
                        </div>
                        <div class="input-group">
                            <label v-text="$t('buyVol')||'买入量'"></label>
                            <el-input>
                                <span class="unit" slot="suffix" v-text="coinInfo.coinid"></span>
                            </el-input>
                        </div>
                        <div class="input-group">
                            <label v-text="$t('money')||'金额'"></label>
                            <el-input>
                                <span class="unit" slot="suffix">CNY</span>
                            </el-input>
                        </div>
                        <button
                            @click="userData.isLogin?buyHandle:errMsg('请登录后操作')"
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
                          <a href="/property" v-text="$t('recharge')"></a>
                        </div>
                        <div class="input-group">
                            <label v-text="$t('sellingValiation')||'卖出估价'"></label>
                            <el-input disabled :value='coinInfo.sellcny'>
                                <span class="unit" slot="suffix">CNY</span>
                            </el-input>
                        </div>
                        <div class="input-group">
                            <label v-text="$t('sellVol')||'卖出量'"></label>
                            <el-input>
                                <span class="unit" slot="suffix" v-text="coinInfo.coinid"></span>
                            </el-input>
                        </div>
                        <div class="input-group">
                            <label v-text="$t('money')||'金额'"></label>                            
                            <el-input>
                                <span class="unit" slot="suffix">CNY</span>
                            </el-input>
                        </div>
                        <button
                            @click="userData.isLogin?sellHandle:errMsg('请登录后操作')"
                            class="btn-block btn-large btn-success btn-active"
                            v-html="sellingLabel">
                        </button>
                    </div>
                </div>
                <div class="warning-box">
                    <h3 v-text="$t('transferNote')||'转让须知'"></h3>
                    <span class="color-666">1、转让后获得相应的CNY。  2、转让获得的CNY可以提现至您指定的账户内，最低提现金额为100。 3、转让是直接扣除您在本平台的相应代币的数量。 4、本平台仅提供收购各类币种，转让后无法取消操作。</span>
                </div>
                <div class="panel-container">
                    <div class="panel-header flex flex-between flex-v-center">
                        <span class="font-bit-bold font-18"
                            v-text="$t('myOrder')||'我的订单'">
                        </span>
                        <!-- <router-link to=''>更多</router-link> -->
                    </div>
                    <div class="break-line"></div>
                    <el-table
                    :data='myOrderList'>
                        <el-table-column prop='date'
                            :label='$t("time")||"时间"'>
                        </el-table-column>
                        <el-table-column prop='currency'
                            :label='$t("currencyType")||"币种"'>
                        </el-table-column>
                        <el-table-column prop='amount'
                           :label='$t("amount")||"数量"'>
                        </el-table-column>
                        <el-table-column prop='unitPrice'
                            :label='($t("unitPrice")||"单价")+"(CNY)"'>
                        </el-table-column>
                        <el-table-column prop='totalPrice'
                            :label='($t("totalPrice")||"总价")+"(CNY)"'>
                        </el-table-column>
                        <el-table-column prop='status'
                            :label='($t("status")||"状态")'>
                        </el-table-column>
                    </el-table>
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
      currencyList: [],
      coinInfo: "",
      myOrderList: [
        {
          date: "2018-09-07",
          currency: "BTC",
          amount: "30",
          unitPrice: "20335.0000",
          totalPrice: "800.00~30000.00",
          status: "进行中"
        }
      ]
    };
  },
  computed: {
    buyingLabel() {
      return `${this.$t("buy") || "买入"}&nbsp;${this.coinInfo.coinid}`;
    },
    sellingLabel() {
      return `${this.$t("sell") || "卖出"}&nbsp;${this.coinInfo.coinid}`;
    }
  },
  mounted() {
    this.getOtcCoin();
  },
  methods: {
    getOtcCoin() {
      this.request(this.api.getotccoin).then(res => {
        console.log(`OTC币种${JSON.stringify(res)}`);
        if (res.code == "0" && res.data && res.data.list && res.data.list[0]) {
          this.currencyList = res.data.list;
          this.coinInfo = res.data.list[0];
        }
      });
    },
    onListClick(data) {
      this.coinInfo = data;
    }
  }
};
</script>
<style lang="scss" scoped>
.break-line {
  @include breakLine;
}
$mr: 11px;
$border: 1px solid #e5e5e5;
.el-container {
  border-bottom: $border;
  .form-wrap {
    width: 720px;
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
  .warning-box {
    border: $default-border;
    padding: 20px;
    margin-top: 20px;
    h3 {
      line-height: 2;
    }
    span {
      line-height: 1.5;
    }
  }
}
.panel-container {
  .panel-header {
    margin: 30px 0 12px 0;
  }
}
</style>
