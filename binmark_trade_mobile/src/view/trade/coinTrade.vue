<template>
  <div class="wh-full overflow-y app-body">
    <!-- 侧栏滑块 -->
    <slide-pop
      @onClose="slideClose"
      :showPop="showPop"
    >
      <trade-aside
        @onTabClick.self='onTabClick'
        @onRowClick.self='onRowClick'
        slot="content"
      ></trade-aside>
    </slide-pop>
    <!-- 头部 -->
    <app-header
      :iconLeft="assetConfig.imgs.nav_transaction_menu"
      @onHeadClick="slideShow"
    >
      <div
        slot="title"
        class="coin font-16 abs-vh-center"
        v-text="coins"
      ></div>
    </app-header>
    <!-- 交易区 -->
    <div class="trade-panel flex flex-between">
      <!-- 买入卖出 -->
      <div class="form-box p-rel">
        <div class="btn-box flex flex-between h-35">
          <div
            @click="toggleType(0)"
            :class="type==0&&'active-0'"
            class="font-14 font-bold"
          >买入{{Store.state.tradecoinid}}</div>
          <div
            @click="toggleType(1)"
            :class="type==1&&'active-1'"
            class="font-14 font-bold"
          >卖出{{Store.state.tradecoinid}}</div>
        </div>
        <p class="price-label color-999">限价</p>
        <form @submit.prevent>
          <div class="from-group flex flex-between flex-v-center font-14 h-45">
            <input
              v-model.number="price"
              type="text"
              placeholder="价格"
            >
            <span
              class="label"
              v-text="Store.state.maincoinid"
            >
            </span>
          </div>
          <div class="from-group flex flex-between flex-v-center font-14 h-45">
            <input
              v-model.number="number"
              type="text"
              placeholder="数量"
            >
            <span
              class="label"
              v-text="Store.state.tradecoinid"
            ></span>
          </div>
          <div
            class="available font-13 color-danger"
            v-html="availableLabel"
          ></div>
          <!-- 快速输入数量 -->
          <van-row
            class="fast-input h-30"
            gutter="6"
          >
            <van-col
              v-for="(item,i) in fastInputNum"
              :key="i"
              span="6"
            >
              <div
                :class="numLevel==item.val &&'active'"
                @click="getNum(item.val)"
                v-text="item.label"
              ></div>
            </van-col>
          </van-row>
          <div class="total font-16 font-bold color-666">
            交易额：
            <span
              class="color-danger"
              v-text="total"
            ></span>
          </div>
          <button
            @click="forBuy"
            v-show="type==0"
            class="btn-large btn-block riple btn-danger"
          >买入</button>
          <button
            @click="forSell"
            v-show="type==1"
            class="btn-large btn-block riple btn-success"
          >卖出</button>
        </form>
      </div>
      <!-- 买入卖出五档图-->
      <div class="trade-trend">
        <div class="table">
          <van-row class="thead h-35 color-666">
            <van-col
              class="font-13"
              span="12"
            >价格</van-col>
            <van-col
              class="txt-rt font-13"
              span="12"
            >数量</van-col>
          </van-row>
          <!-- 卖出五档图 -->
          <div class="tbody">
            <div
              @click='OrderClick(item)'
              v-for="(item,i) in SellOrder"
              :key='i'
            >
              <van-row class="h-25 riple p-rel">
                <div
                  :style='{width:(item.total/sellListTotal)*100+"%"}'
                  class="progress p-abs"
                ></div>
                <van-col
                  class="font-13 color-success"
                  span="12"
                >{{item.price*1}}</van-col>
                <van-col
                  class="txt-rt font-13"
                  span="12"
                >{{item.number*1}}</van-col>
              </van-row>
            </div>
          </div>
          <div
            :class="coinInfo.prise>0?'color-danger':'color-success'"
            class="rise txt-center font-14 h-25"
          >最新价 {{coinInfo.prise?coinInfo.prise*1:0}}</div>
          <!-- 买入五档图 -->
          <div class="tbody">
            <div
              @click='OrderClick(item)'
              v-for="(item,i) in BuyOrder"
              :key='i'
            >
              <van-row class="h-25 riple p-rel">
                <div
                  :style='{width:(item.total/buyListTotal)*100+"%"}'
                  class="progress p-abs"
                ></div>
                <van-col
                  class="font-13 color-success"
                  span="12"
                >{{item.price*1}}</van-col>
                <van-col
                  class="txt-rt font-13"
                  span="12"
                >{{item.number*1}}</van-col>
              </van-row>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 交易记录 -->
    <div class="trade-record">
      <van-tabs
        color="#fe0042"
        line-width="30"
        v-model="tabActive"
        sticky
      >
        <van-tab title="当前委托">
          <div
            v-if="Store.state.isLogin"
            class="record-table"
          >
            <template v-if='currentEntrust.length>0'>
              <van-row class="thead color-666 flex flex-v-center h-45">
                <van-col span="6 font-14">市场</van-col>
                <van-col span="7 font-14">价格</van-col>
                <van-col span="7 font-14">成交量/数量</van-col>
                <van-col span="4 font-14 txt-rt">操作</van-col>
              </van-row>
              <div
                v-if="currentEntrust.length>0"
                class="tbody"
              >
                <van-row
                  v-for="item in currentEntrust"
                  :key='item.autoid'
                  class="flex flex-v-center"
                >
                  <van-col span="6 font-14">
                    <div
                      class="font-14 font-bold"
                      v-text="item.tradcoin"
                    ></div>
                    <small
                      class="color-999"
                      v-text="item.writedate"
                    ></small>
                  </van-col>
                  <van-col span="7 font-14 color-success">
                    <div class="font-14 font-bold">1519159</div>
                    <small v-text="item.type==0?'买入':'卖出'"></small>
                  </van-col>
                  <van-col span="7 font-14">
                    <div
                      class="font-14 font-bold"
                      v-text="item.dealnumber*1"
                    ></div>
                    <small
                      class="color-999"
                      v-text="item.number*1"
                    ></small>
                  </van-col>
                  <van-col span="4 font-14 txt-rt">
                    <button
                      @click="cancelOrder(item)"
                      class="btn-mini btn-success riple"
                    >撤单</button>
                  </van-col>
                </van-row>
              </div>
            </template>
            <template v-else>
              <no-record></no-record>
            </template>
          </div>
        </van-tab>
        <van-tab title="历史委托">
          <div
            v-if="Store.state.isLogin"
            class="record-table"
          >
            <template v-if="entrustRecord.length>0">
              <van-row class="thead color-666 flex flex-v-center h-45">
                <van-col span="9 font-14">市场</van-col>
                <van-col span="8 font-14">价格</van-col>
                <van-col span="7 font-14 txt-rt">成交量/数量</van-col>
              </van-row>
              <div class="tbody">
                <van-row
                  v-for="item in entrustRecord"
                  :key='item.autoid'
                  class="flex flex-v-center"
                >
                  <van-col span="9 font-14">
                    <div
                      class="font-14 font-bold"
                      v-text="item.tradcoin"
                    ></div>
                    <small
                      class="color-999"
                      v-text="item.writedate"
                    ></small>
                  </van-col>
                  <van-col span="8 font-14 color-success">
                    <div
                      class="font-14 font-bold"
                      v-text="item.price*1"
                    ></div>
                    <small v-text="item.type==0?'买入':'卖出'"></small>
                  </van-col>
                  <van-col span="7 font-14 txt-rt">
                    <div
                      class="font-14 font-bold"
                      v-text="item.dealnumber*1"
                    ></div>
                    <small
                      class="color-999"
                      v-text="item.number*1"
                    ></small>
                  </van-col>
                </van-row>
              </div>
            </template>
            <template v-else>
              <no-record></no-record>
            </template>
          </div>
        </van-tab>
      </van-tabs>
      <div
        class="h-45 unlogin font-16 txt-center"
        v-if='!Store.state.isLogin'
      >请先&nbsp;<router-link
          to='/userentry/login'
          class="color-info"
        >登录</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import appHeader from "@/components/header/AppHeader";
import slidePop from "@/components/other/slidePop";
import tradeAside from "@/components/slideContent/TradeAside";
import { asideMixin, coinTradeMixin } from "@/mixin/mixin";
import { sumCalc, randomString } from "@/assets/js/commonFunc.js";
import {
  currentEntrust,
  entrustRecord,
  getCoinInfo,
  getBuyOrder,
  getSellOrder,
  tradeHandle,
  clearEntrust
} from "../../vuexStore/storeService.js";
let webSocket = null;
let ajaxDone = true;
let timer = null;
window.onbeforeunload = () => {
  if (webSocket) {
    webSocket.close();
  }
};
export default {
  components: { appHeader, slidePop, tradeAside },
  mixins: [asideMixin, coinTradeMixin],
  data() {
    return {
      type: 0,
      number: "",
      price: "",
      balance: 0,
      available: 0,
      numLevel: 0,
      fastInputNum: [
        {
          label: "25%",
          val: 0.25
        },
        {
          label: "50%",
          val: 0.5
        },
        {
          label: "75%",
          val: 0.75
        },
        {
          label: "100%",
          val: 1
        }
      ],
      tabActive: 0,
      currentEntrust: [],
      entrustRecord: [],
      coinInfo: {},
      SellOrder: [],
      BuyOrder: [],
      init: false //用于判断是否初始化，以免loadData方式加载后币种变化在watch重复调用
    };
  },
  mounted() {
    let { maincoinid, tradecoinid } = this.$route.query;
    if (maincoinid && tradecoinid) {
      this.getCoinData()
        .then(list => {
          return this.getTradeCoin(maincoinid, tradecoinid);
        })
        .then(() => {
          this.loadData(maincoinid, tradecoinid);
          this.liveUpdate();
        });
    } else {
      this.getCoinData()
        .then(list => {
          try {
            return this.getTradeCoin(list[0].coinid);
          } catch (err) {
            console.log(err);
          }
        })
        .then(() => {
          this.loadData(
            this.Store.state.maincoinid,
            this.Store.state.tradecoinid
          );
          // 实时更新
          this.liveUpdate();
        });
    }
    this.init = true;
  },
  destroyed() {
    if (timer) clearInterval(timer);
  },
  computed: {
    total() {
      return `${(this.number * this.price).toFixed(2)}`;
    },
    coins() {
      if (this.Store.state.tradecoinid && this.Store.state.maincoinid) {
        return this.Store.state.tradecoinid + "/" + this.Store.state.maincoinid;
      }
    },
    availableLabel() {
      if (this.type == 1) {
        return `可兑换：${this.available * 1 || 0}&nbsp;${this.Store.state
          .tradecoinid || ""}`;
      } else {
        return `可用：${this.balance * 1 || 0}&nbsp;${this.Store.state
          .maincoinid || ""}`;
      }
    },
    //最新买入总计
    buyListTotal() {
      let total = 0;
      this.BuyOrder.map(item => {
        total += item.price * item.number;
      });
      return total;
    },
    //最新卖出总计
    sellListTotal() {
      let total = 0;
      this.SellOrder.map(item => {
        total += item.price * item.number;
      });
      return total;
    }
  },
  methods: {
    validate() {
      if (this.total == 0 || isNaN(this.total)) {
        this.$toast({ message: "价格或者数量不合法" });
        return false;
      }
      return true;
    },
    // 撤单
    cancelOrder(item) {
      let { id, price, number } = item;
      if (id) {
        clearEntrust(id).then(res => {
          currentEntrust(
            this.Store.state.maincoinid,
            this.Store.state.tradecoinid
          ).then(res => {
            this.currentEntrust = res;
          });
          if (item.type == 0) {
            this.balance =
              this.balance * 1 + Math.round(item.price * item.number);
          } else {
            this.available = this.available * 1 + item.number;
          }
          this.liveUpdate();
        });
      }
    },
    loadData(maincoinid, tradecoinid) {
      currentEntrust(maincoinid, tradecoinid).then(res => {
        if (res) {
          this.currentEntrust = res;
        }
      });
      entrustRecord(maincoinid, tradecoinid).then(res => {
        if (res) {
          this.entrustRecord = res;
        }
      });
      getCoinInfo(maincoinid, tradecoinid).then(res => {
        this.coinInfo = res;
      });
      getSellOrder(maincoinid, tradecoinid).then(res => {
        try {
          // 求和
          this.SellOrder = sumCalc(res, "price", "number");
        } catch (err) {
          console.log(err);
        }
      });
      getBuyOrder(maincoinid, tradecoinid).then(res => {
        try {
          // 求和
          this.BuyOrder = sumCalc(res, "price", "number");
        } catch (err) {
          console.log(err);
        }
      });
      Promise.all([
        this.getAvailable(maincoinid),
        this.getAvailable(tradecoinid)
      ]).then(res => {
        try {
          this.available = res[1].usable;
          this.balance = res[0].usable;
        } catch (err) {
          console.log(err);
        }
      });
    },
    liveUpdate() {
      let { maincoinid, tradecoinid } = this.Store.state;
      if ("WebSocket" in window) {
        this.updateDataBySocket(maincoinid, tradecoinid);
      } else {
        this.updateDataByAjax(maincoinid, tradecoinid);
      }
    },
    updateDataByAjax(maincoinid, tradecoinid) {
      try {
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
          if (ajaxDone) {
            ajaxDone = false;
            getSellOrder(maincoinid, tradecoinid).then(res => {
              this.sellOrder = sumCalc(res, "price", "number");
            });
            getBuyOrder(maincoinid, tradecoinid).then(res => {
              this.buyOrder = sumCalc(res, "price", "number");
            });
            getCoinInfo(maincoinid, tradecoinid).then(res => {
              this.coinInfo = res;
              ajaxDone = true;
            });
          }
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    },
    updateDataBySocket(maincoinid, tradecoinid) {
      let token = this.storage.get("token") || randomString(32);
      let params = `${token}/${maincoinid}_${tradecoinid}`;
      if (webSocket) {
        try {
          webSocket.send(params);
          return;
        } catch (err) {
          console.log(err);
        }
      }
      try {
        webSocket = new WebSocket(this.api.socketUrl + params);
        webSocket.onopen = () => {
          console.log("socket 已经连接，可以发送数据");
          webSocket.send(`${maincoinid}_${tradecoinid}`);
        };
        webSocket.onmessage = event => {
          let msg = JSON.parse(event.data);
          this.BuyOrder = sumCalc(msg.buy, "price", "number");
          this.SellOrder = sumCalc(msg.sell, "price", "number");
        };
        webSocket.onerror = err => {
          console.log("socket 链接错误");
          webSocket = null;
          if (timer) clearInterval(this.timer);
          this.updateDataByAjax(maincoinid, tradecoinid);
        };
        webSocket.onclose = () => {
          console.log("socket 连接关闭");
        };
      } catch (err) {
        console.log(err);
      }
    },
    OrderClick(item) {
      this.number = item.number * 1;
      this.price = item.price * 1;
    },
    resetForm() {
      this.number = "";
      this.price = "";
    },
    toggleType(index) {
      this.type = index;
    },
    onTabClick(coinid) {
      if (coinid) this.getTradeCoin(coinid);
    },
    onRowClick(item) {
      let { maincoinid, coinid } = item;
      this.Store.commit("updateMainCoinid", maincoinid);
      this.Store.commit("updateTradeCoinid", coinid);
      this.showPop = false;
    },
    async forBuy() {
      if (this.validate()) {
        let { maincoinid, tradecoinid } = this.Store.state;
        let res = await tradeHandle(this.api.forbuy, {
          prise: this.price,
          number: this.number,
          maincoin: maincoinid,
          tradcoin: tradecoinid
        });
        if (res) {
          this.currentEntrust = await currentEntrust(maincoinid, tradecoinid);
          this.balance = this.balance * 1 - this.total;
        }
        if (webSocket)
          webSocket.send(
            `${this.storage.get("token")}_${maincoinid}_${tradecoinid}`
          );
      }
    },
    async forSell() {
      if (this.validate()) {
        let { maincoinid, tradecoinid } = this.Store.state;
        let res = await tradeHandle(this.api.forsell, {
          prise: this.price,
          number: this.number,
          maincoin: maincoinid,
          tradcoin: tradecoinid
        });
        if (res) {
          this.available = this.available - this.number;
          this.currentEntrust = await currentEntrust(maincoinid, tradecoinid);
        }
        if (webSocket)
          webSocket.send(
            `${this.storage.get("token")}_${maincoinid}_${tradecoinid}`
          );
      }
    },
    getNum(val) {
      this.numLevel = val;
      this.number = Math.round(this.number * val);
    }
  },
  watch: {
    coins(val) {
      if (!this.init) {
        let [tradecoin, maincoin] = val.split("/");
        this.loadData(maincoin, tradecoin);
      }
      this.init = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.coin {
  color: #fff;
}
.trade-panel {
  background: #fff;
  .form-box,
  .trade-trend {
    margin-top: 1rem;
    box-sizing: border-box;
  }
  .form-box {
    padding-left: 1rem;
    padding-bottom: 20px;
    width: 56.8%;
    flex: 1;
    button {
      margin-top: 21px;
    }
  }
  .total {
    margin-top: 15px;
  }
  .trade-trend {
    width: 43.2%;
  }
  .btn-box {
    line-height: 35px;
    text-align: center;
    color: #666;
    box-sizing: border-box;
    > div {
      flex: 1;
      height: 100%;
      border-width: 1px;
      box-sizing: border-box;

      border-style: solid;
      border-color: #eee;
    }
    .active-0 {
      color: $color-danger;
      border-color: $color-danger;
      + div {
        border-left: none;
      }
    }
    .active-1 {
      color: $color-success;
      border-color: $color-success;
      + div {
        border-right: none;
      }
    }
  }
  .price-label {
    margin-top: 11px;
  }
  .available {
    margin-top: 0.5rem;
  }
  .table {
    .rise {
      line-height: 25px;
    }
  }
  .tbody {
    line-height: 25px;
    height: 125px;
    overflow-y: scroll;
    .van-col {
      position: relative;
      z-index: 99;
    }
    .progress {
      height: 100%;
      z-index: 9;
      right: 0;
      top: 0;
      background-color: #eee;
      opacity: 0.4;
    }
  }
}
.fast-input {
  margin-top: 1rem;
  .van-col {
    > div {
      @include textVcenter(30px);
      border: 1px solid transparent;
      box-sizing: border-box;
      text-align: center;
      background: #f5f5f5;
    }
  }
  div.active {
    border-color: $color-danger;
  }
}

.trade-trend {
  padding: 0 1rem;
  .thead {
    line-height: 35px;
  }
}
.from-group {
  border: 1px solid #eee;
  box-sizing: border-box;
  padding: 0 1rem;
  margin-top: 1rem;
  input {
    display: block;
    height: 100%;
    width: 60%;
    border: none;
  }
  .label {
    display: block;
    width: 40%;
    text-align: right;
  }
}
.trade-record {
  margin-top: 1rem;
}
.record-table {
  .thead {
    padding: 0 1rem;
  }
  .tbody {
    padding: 0 1rem;
    background: #fff;
    .van-row {
      padding: 1rem 0;
    }
    .van-col {
      > div:first-child {
        margin-bottom: 0.3rem;
      }
    }
  }
}
</style>