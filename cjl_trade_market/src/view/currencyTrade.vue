<template>
    <div class="main wh-full">
        <my-header class="header-main">
            <login-bar></login-bar>
        </my-header>
        <el-container>
            <!-- 左侧表格栏目 -->
            <el-aside width="400px">
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
                  <span><em class="color-666">涨幅</em><i class="color-danger">+3.68%</i></span>
                  <span><em class="color-666">高</em><i>0.000013482</i></span>
                  <span><em class="color-666">低</em><i>0.000010578</i></span>
                  <span><em class="color-666">24H量</em><i>314854300BTC</i></span>
                </div>
              </div>
              <!-- K线图占位 -->
              <div id='kMap' class="k-map"></div>
              <div class="panel-container flex flex-between">
                <div class="content-lf flex flex-between">
                  <!-- 买入 -->
                  <div class="form-wrap">
                    <div class="font-18 font-bit-bold">买入BTC</div>
                    <div class="break-line"></div>
                    <div class="account flex flex-between">
                      <span class="balance">可用 0.00000000 BTC</span>
                      <a href="javascript:">充值</a>
                    </div>
                    <div class="input-group">
                      <label>买入价</label>
                      <el-input v-model="buyFormData.price">
                        <span class="unit" slot="suffix">BTC</span>
                      </el-input>
                      <em class="hint font-12">≈0.05</em>
                    </div>
                    <div class="input-group">
                      <label>买入量</label>
                      <el-input v-model="buyFormData.orderVol">
                        <span class="unit" slot="suffix">USDT</span>
                      </el-input>
                    </div>
                    <div class="total flex flex-between">
                      <span>累计USDT</span>0
                    </div>
                    <button @click="userData.isLogin?buyHandle:errMsg('请登录后操作')"
                      class="btn-block btn-large btn-danger btn-active">买入BTC</button>
                  </div>
                  <!-- 卖出 -->
                  <div class="form-wrap">
                    <div class="font-18 font-bit-bold">卖出BTC</div>
                    <div class="break-line"></div>
                    <div class="account flex flex-between">
                      <span class="balance">可用 0.00000000 BTC</span>
                      <a href="javascript:">充值</a>
                    </div>
                    <div class="input-group">
                      <label>卖出BTC</label>
                      <el-input v-model="sellFormData.price">
                        <span class="unit" slot="suffix">BTC</span>
                      </el-input>
                      <em class="hint font-12">≈0.05</em>
                    </div>
                    <div class="input-group">
                      <label>卖出量</label>
                      <el-input v-model="sellFormData.price">
                        <span class="unit" slot="suffix">USDT</span>
                      </el-input>
                    </div>
                    <div class="total flex flex-between">
                      <span>累计USDT</span>0
                    </div>
                    <button @click="userData.isLogin?buyHandle:errMsg('请登录后操作')"
                      class="btn-block btn-large btn-success btn-active">卖出BTC</button>
                  </div>
                </div>
                <!-- 交易行情 -->
                <div class="trade-market">
                  <div class="flex flex-between flex-v-center">
                    <span class='font-18'>最新价 0.0000011422 BTC<em class="font-12 color-666">≈ 0.05 CNY</em></span>
                    <!-- <router-link to=''>更多</router-link> -->
                  </div>
                  <div class="break-line"></div>
                  <el-table style="font-weight:normal"
                    :data='latestBuyData'
                    :cell-style='myCellStyle' 
                    max-height='220' stripe>
                    <el-table-column width='80' label='档位'>
                      <span class="color-danger" slot-scope="scope" v-text="scope.row.lv"></span>
                    </el-table-column>
                    <el-table-column width='150' label='价格(USDT)' prop='price'></el-table-column>
                    <el-table-column width='120' label='数量(BTC)' prop='amount'></el-table-column>
                    <el-table-column label='累计(BTC)'>
                      <div slot-scope="scope" v-text="scope.row.total"></div>
                    </el-table-column>
                  </el-table>
                  <div class="m-top-10"></div>
                  <el-table style="font-weight:normal"
                    :data='latestSoldData'
                    :cell-style='myCellStyle'
                    :show-header='false'
                    max-height='180' stripe>
                    <el-table-column width='80' label='档位'>
                      <span class="color-success" slot-scope="scope" v-text="scope.row.lv"></span>
                    </el-table-column>
                    <el-table-column width='150' label='价格(USDT)' prop='price'></el-table-column>
                    <el-table-column width='120' label='数量(BTC)' prop='amount'></el-table-column>
                    <el-table-column label='累计(BTC)'>
                      <div slot-scope="scope" v-text="scope.row.total"></div>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <div class="panel-container flex flex-between">
                <div class="content-lf">
                    <div class="panel-title font-18 font-bit-bold">当前委托</div>
                    <template v-if="userData.isLogin">
                      <el-table stripe 
                        :data='currentDeclareData'>
                        <el-table-column width="140" label='日期' prop='date'></el-table-column>
                        <el-table-column width='100' label='类型'>
                          <span slot-scope="scope" v-text="scope.row.type"></span>
                        </el-table-column>
                        <el-table-column label='价格(USDT)' prop='price'></el-table-column>
                        <el-table-column label='挂单量(BTC)' prop='order_vol'></el-table-column>
                        <el-table-column label='成交量' prop='complete_vol'></el-table-column>
                        <el-table-column width="60" label='操作'>
                          <span class="handle color-danger" slot-scope="scope">撤单</span>
                        </el-table-column>
                      </el-table>
                    </template>
                    <unlogin-tip></unlogin-tip>
                    <div class="panel-title font-18 font-bit-bold">历史委托</div>
                    <template v-if="userData.isLogin">
                      <el-table stripe :data='historicalDeclareData'>
                        <el-table-column width="140" label='日期' prop='date'></el-table-column>
                        <el-table-column width='100' label='类型'>
                          <span slot-scope="scope" v-text="scope.row.type"></span>
                        </el-table-column>
                        <el-table-column label='价格(USDT)' prop='price'></el-table-column>
                        <el-table-column label='挂单量(BTC)' prop='order_vol'></el-table-column>
                        <el-table-column label='成交量' prop='complete_vol'></el-table-column>
                        <el-table-column width="60" label='操作'>
                          <span class="handle color-danger" slot-scope="scope">撤单</span>
                        </el-table-column>
                      </el-table>
                    </template>
                    <unlogin-tip></unlogin-tip>
                </div>
                <div class="content-rt">
                  <div class="panel-title flex flex-between">
                    <span class="font-18 font-bit-bold">成交历史</span>
                    <!-- <router-link to=''>更多</router-link> -->
                  </div>
                  <template v-if="userData.isLogin">
                    <div class="break-line"></div>
                    <el-table style="font-weight:normal"
                      :data='historicalBuyData'
                      :cell-style='myCellStyle' stripe>
                      <el-table-column width='100' label='时间'>
                        <span class="color-danger" slot-scope="scope" v-text="scope.row.date"></span>
                      </el-table-column>
                      <el-table-column width='150' label='价格(USDT)' prop='price'></el-table-column>
                      <el-table-column width='120' label='数量(BTC)' prop='amount'></el-table-column>
                      <el-table-column label='累计(BTC)'>
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
      tabConfig: [
        {
          id: "1",
          name: "USDT",
          label: "USDT"
        },
        {
          id: "2",
          name: "BTC",
          label: "BTC"
        },
        {
          id: "3",
          name: "ETH",
          label: "ETH"
        },
        {
          id: "4",
          name: "自选",
          label: "自选"
        }
      ],
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
          lv: "买5",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        },
        {
          lv: "买4",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        },
        {
          lv: "买3",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        },
        {
          lv: "买2",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        },
        {
          lv: "买1",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        }
      ],
      latestSoldData: [
        {
          lv: "卖5",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        },
        {
          lv: "卖4",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        },
        {
          lv: "卖3",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        },
        {
          lv: "卖2",
          price: "2.461",
          amount: "114.041",
          total: "280.65"
        },
        {
          lv: "卖1",
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
  mounted() {},
  methods: {
    onTabChange(id, index) {
      this.currentId = id;
    },
    myCellStyle() {
      return "padding:6px 0 !important;border:none";
    },
    buyHandle() {},
    sellHandle() {}
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
  width: 480px;
  > div:first-child {
    margin-bottom: 12px;
  }
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
  height: 480px;
}
.form-wrap {
  width: 470px;
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
    width: 980px;
    .handle {
      cursor: pointer;
    }
  }
  .content-rt {
    width: 480px;
  }
}
</style>
