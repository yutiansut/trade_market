<template>
    <div class="main wh-full">
        <my-header class="header-main">
            <login-bar></login-bar>
        </my-header>
        <el-container>
            <el-aside width='400px'>
                <c2c-aside-comp :myData='currencyList'></c2c-aside-comp>
            </el-aside>
            <el-main>
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
                        <button class="btn-block btn-large btn-danger btn-active">买入BTC</button>
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
                        <button class="btn-block btn-large btn-success btn-active">买入BTC</button>
                    </div>
                </div>
                <div class="warning-box">
                    <h3>转让须知</h3>
                    <span class="color-666">1、转让后获得相应的CNY。  2、转让获得的CNY可以提现至您指定的账户内，最低提现金额为100。 3、转让是直接扣除您在本平台的相应代币的数量。 4、本平台仅提供收购各类币种，转让后无法取消操作。</span>
                </div>
                <div class="panel-container">
                    <div class="panel-header flex flex-between flex-v-center">
                        <span class="font-bit-bold font-18">我的订单</span>
                        <router-link to=''>更多</router-link>
                    </div>
                    <div class="break-line"></div>
                    <el-table
                    :data='myOrderList'>
                        <el-table-column prop='date' label='时间'></el-table-column>
                        <el-table-column prop='currency' label='币种'></el-table-column>
                        <el-table-column prop='amount' label='数量'></el-table-column>
                        <el-table-column prop='unitPrice' label='单价(CNY)'></el-table-column>
                        <el-table-column prop='totalPrice' label='总价(CNY)'></el-table-column>
                        <el-table-column prop='status' label='状态'></el-table-column>
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
      currencyList: [
        {
          id: "1",
          currency: "BTC / CNY",
          thumb: ""
        },
        {
          id: "2",
          currency: "BTC / CNY",
          thumb: ""
        }
      ],
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
