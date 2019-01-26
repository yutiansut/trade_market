<template>
  <div class="main h-full">
    <!-- 侧栏滑块 -->
    <slide-pop
      @onClose="slideClose"
      :showPop="showPop"
    >
      <user-aside slot="content"></user-aside>
    </slide-pop>
    <!-- header -->
    <app-header
      :iconLeft="assetConfig.imgs.user_head_portrait"
      @onHeadClick="slideShow"
    >
      <div
        slot="title"
        class="coin font-16 abs-vh-center"
        v-text="coinInfo.coinid"
      ></div>
      <div
        @click.self="actionTrigger"
        slot="right"
        class="font-14 h-35 flex flex-v-center color-999"
      >选择币种</div>
    </app-header>
    <div class="content overflow-y">
      <van-tabs
        sticky
        offset-top='55px'
        color="#fe0042"
        v-model="active"
      >
        <!-- 买入 -->
        <van-tab title="买入">
          <div class="form">
            <div class="guide-price color-999 font-14">指导价：{{(coinInfo.cny||0)*1}} CNY</div>
            <div class="input-wrap font-14 flex flex-v-center flex-between van-hairline--bottom">
              <input
                v-model="buyprice"
                type="text"
                placeholder="价格"
              >
              <div class="label">CNY</div>
            </div>
            <div class="input-wrap font-14 flex flex-v-center flex-between van-hairline--bottom">
              <input
                v-model.number="buynumber"
                :placeholder="miniumNum"
              >
              <div
                class="label"
                v-text="coinInfo.coinid"
              ></div>
            </div>
            <p class="total font-16">总计：{{buyTotal}}</p>
            <button
              @click="addBuy"
              :disabled='buydisabled'
              class="btn-block btn-large riple btn-block btn-danger"
            >买入</button>
          </div>
        </van-tab>
        <!-- 卖出 -->
        <van-tab title="卖出">
          <div class="form">
            <div class="guide-price color-999 font-14">指导价：{{(coinInfo.cny||0)*1}} CNY</div>
            <div class="input-wrap font-14 flex flex-v-center flex-between van-hairline--bottom">
              <input
                v-model="sellprice"
                type="text"
                placeholder="价格"
              >
              <div class="label">CNY</div>
            </div>
            <div class="input-wrap font-14 flex flex-v-center flex-between van-hairline--bottom">
              <input
                v-model.number="sellnumber"
                :placeholder="miniumNum"
              >
              <div
                class="label"
                v-text="coinInfo.coinid"
              ></div>
            </div>
            <p class="total font-16">总计：{{sellTotal}}</p>
            <button
              @click="addSell"
              :disabled='selldisabled'
              class="btn-block btn-large riple btn-block btn-success"
            >卖出</button>
          </div>
        </van-tab>
        <!-- 我的订单 -->
        <van-tab title="我的订单">
          <div class="order-list">
            <dl
              v-for="item in myPublishedOrder"
              :key='item.autoid'
              class="order"
            >
              <dt class="font-bold flex flex-between">
                <span
                  class="font-16"
                  v-text="item.userid||''"
                ></span>
                <span class="status color-danger">进行中</span>
              </dt>
              <dd class="flex flex-between">
                <div>
                  <span class="color-999">单号&nbsp;&nbsp;</span>
                  <span v-bind="item.autoid"></span>
                </div>
                <div>
                  <span
                    :class="item.type==0?'color-danger':'color-success'"
                    v-text="item.type==0?'买入':'卖出'"
                  ></span>&nbsp;&nbsp;
                  <span class="color-999">类型</span>
                </div>
              </dd>
              <dd class="flex flex-between">
                <div>
                  <span class="color-999">价格&nbsp;&nbsp;</span>
                  <span v-text='(item.price||0)*1'></span>
                </div>
                <div>
                  <span class="color-danger">{{item.wdate}}&nbsp;&nbsp;</span>
                  <span class="color-999">时间</span>
                </div>
              </dd>
              <dd>
                <span class="color-999">数量&nbsp;&nbsp;</span>
                <span v-text="(item.price||0)*1"></span>
              </dd>
              <dd class="total van-hairline--bottom">
                <span class="color-666">总计&nbsp;&nbsp;</span>
                <span v-text="item.total||0"></span>
              </dd>
            </dl>
          </div>
        </van-tab>
        <!-- 交易中的订单 -->
        <van-tab title="交易中">
          <div class="order-list">
            <dl
              v-for="item in myTradingOrderList"
              :key='item.autoid'
              @click="navigateTo('/trade/order_detail',{id:item.autoid,type:item.type})"
              class="order"
            >
              <dt class="font-bold flex flex-between">
                <span
                  class="font-16"
                  v-text="item.buyname"
                ></span>
                <span class="status color-danger">进行中</span>
              </dt>
              <dd class="flex flex-between">
                <div>
                  <span class="color-999">单号&nbsp;&nbsp;</span>
                  <span v-text="item.autoid"></span>
                </div>
                <div>
                  <span
                    :class="item.type==0?'color-danger':'color-success'"
                    v-text="item.type==0?'买入':'卖出'"
                  ></span>&nbsp;&nbsp;
                  <span class="color-999">类型</span>
                </div>
              </dd>
              <dd class="flex flex-between">
                <div>
                  <span class="color-999">价格&nbsp;&nbsp;</span>
                  <span v-text="item.price*1"></span>
                </div>
                <div>
                  <span
                    class="color-danger"
                    v-text="item.sdate"
                  ></span>&nbsp;&nbsp;
                  <span class="color-999">时间</span>
                </div>
              </dd>
              <dd>
                <span class="color-999">数量&nbsp;&nbsp;</span>
                <span v-text="item.number*1"></span>
              </dd>
              <dd class="total van-hairline--bottom">
                <span class="color-666">总计&nbsp;&nbsp;</span>
                <span v-text="item.zj*1"></span>
              </dd>
            </dl>
          </div>
        </van-tab>
        <!-- 历史订单 -->
        <van-tab title="历史订单">
          <div class="order-list">
            <dl
              v-for='item in historyOrder'
              :key='item.autoid'
              class="order"
            >
              <dt class="font-bold flex flex-between">
                <span class="font-16">你是YY</span>
                <span class="status color-666">已完成</span>
              </dt>
              <dd class="flex flex-between">
                <div>
                  <span class="color-999">单号&nbsp;&nbsp;</span>
                  <span>116515651</span>
                </div>
                <div>
                  <span class="color-danger">买入&nbsp;&nbsp;</span>
                  <span class="color-999">类型</span>
                </div>
              </dd>
              <dd class="flex flex-between">
                <div>
                  <span class="color-999">价格&nbsp;&nbsp;</span>
                  <span>6385</span>
                </div>
                <div>
                  <span class="color-danger">2017/7/7&nbsp;&nbsp;</span>
                  <span class="color-999">时间</span>
                </div>
              </dd>
              <dd>
                <span class="color-999">数量&nbsp;&nbsp;</span>
                <span>6385</span>
              </dd>
              <dd class="total van-hairline--bottom">
                <span class="color-666">总计&nbsp;&nbsp;</span>
                <span>6385</span>
              </dd>
            </dl>
          </div>
        </van-tab>
      </van-tabs>
      <!-- 市场挂单 -->
      <div
        v-show="active<=1"
        class="market-list"
      >
        <div class="font-14 color-999 font-bold">市场挂单（只显示在线商家）</div>
        <div
          v-if="marketOrderList.length>0"
          class="list-item"
        >
          <van-row
            v-for="(item,i) in marketOrderList"
            :key='i'
            class="item flex flex-v-center"
          >
            <van-col span="10">
              <p class="dt font-16 font-bold">李先生</p>
              <p class="dd font-14">
                <span class="color-999">数量&nbsp;</span>
                <span>10&nbsp;&nbsp;KMT</span>
              </p>
              <p class="dd font-14">
                <span class="color-999">日期&nbsp;</span>
                <span>2017/8/8</span>
              </p>
            </van-col>
            <van-col span="8">
              <p class="dt font-18 font-bold">￥4498</p>
              <p class="dd font-14">
                <span class="color-999">价格&nbsp;</span>
                <span>10&nbsp;&nbsp;KMT</span>
              </p>
              <p class="dd font-14">
                <span class="color-999">总计&nbsp;</span>
                <span>2017/8/8</span>
              </p>
            </van-col>
            <van-col
              class="flex col-last"
              span="6"
            >
              <button class="btn-rounded btn-danger riple thumb-40 font-14">买入</button>
            </van-col>
          </van-row>
        </div>
        <div class="flex flex-v-center flex-h-center h-45 font-15 color-999"><span>暂无数据</span></div>
      </div>
    </div>
    <!-- 币种上拉菜单 -->
    <transition name="van-slide-up">
      <van-picker
        title='C2C币种'
        show-toolbar
        v-show="showPicker"
        :columns="tradeCoins"
        value-key='coinid'
        visible-item-count='3'
        @confirm="onConfirm"
        @cancel='cancelPicker'
      />
    </transition>
  </div>
</template>
<script>
import appHeader from "@/components/header/AppHeader";
import slidePop from "@/components/other/slidePop";
import userAside from "@/components/slideContent/UserAside";
import { asideMixin } from "@/mixin/mixin";
import { sumCalc } from "@/assets/js/commonFunc.js";
import {
  getc2cCoin,
  getDayNumber,
  addBuy,
  addSell,
  getc2cOrderByType,
  getMyc2cTrade,
  getc2cHistory
} from "@/vuexStore/storeService.js";
import { Picker } from "vant";
import { getPublishedOrder } from "../../vuexStore/coinService";
export default {
  components: { appHeader, slidePop, userAside, Picker },
  mixins: [asideMixin],
  data() {
    return {
      showPicker: false,
      tradeCoins: [],
      tradecoinid: "",
      active: 3,
      buyprice: "",
      sellprice: "",
      sellnumber: "",
      buynumber: "",
      coinInfo: {},
      daynumber: {},
      marketOrderList: [],
      myPublishedOrder: [],
      myTradingOrderList: [],
      historyOrder: []
    };
  },
  mounted() {
    getc2cCoin().then(res => {
      if (res) {
        this.coinInfo = res[0];
        this.tradeCoins = res;
        getDayNumber(this.coinInfo.coinid).then(res => {
          this.daynumber = res;
        });
        getc2cOrderByType(this.coinInfo.coinid, this.active).then(res => {
          if (res) this.marketOrderList = res;
        });
      }
    });
  },
  computed: {
    miniumNum() {
      return `数量(最少${(this.coinInfo.minnum || 0) * 1})`;
    },
    buydisabled() {
      if (!this.buynumber || isNaN(this.buynumber)) {
        return true;
      } else {
        return false;
      }
    },
    selldisabled() {
      if (!this.sellnumber || isNaN(this.sellnumber)) {
        return true;
      } else {
        return false;
      }
    },
    buyTotal() {
      return this.buynumber * this.buyprice;
    },
    sellTotal() {
      return this.sellnumber * this.sellprice;
    }
  },
  methods: {
    actionTrigger() {
      this.showPicker = true;
    },
    onConfirm(item) {
      this.coinInfo = item;
      this.showPicker = false;
    },
    cancelPicker() {
      this.showPicker = false;
    },
    beforeBuy() {
      if (this.buynumber < this.coinInfo.minnum) {
        this.$toast({
          message: "买入数量不能小于最小值",
          position: "bottom"
        });
        return false;
      }
      if (isNaN(this.buyTotal)) {
        this.$toast({
          message: "价格或者数量不合法",
          position: "bottom"
        });
        return false;
      }
      return true;
    },
    beforeSell() {
      if (this.sellnumber < this.coinInfo.minnum) {
        this.$toast({
          message: "卖出数量不能小于最小值",
          position: "bottom"
        });
        return false;
      }
      if (isNaN(this.sellTotal)) {
        this.$toast({
          message: "价格或者数量不合法",
          position: "bottom"
        });
        return false;
      }
      return true;
    },
    addBuy() {
      addBuy(this.coinInfo.coinid, this.buyprice, this.buynumber);
    },
    addSell() {
      if (this.validate(this.sellnumber)) {
        addSell(this.coinInfo.coinid, this.sellprice, this.sellnumber);
      }
    }
  },
  watch: {
    active(val) {
      switch (val) {
        case 2:
          //获取我发布的订单
          getPublishedOrder().then(res => {
            if (res && res.length > 0) {
              let result = sumCalc(res, "price", "number");
              this.myPublishedOrder = res;
            }
          });
          break;
        case 3:
          getMyc2cTrade().then(res => {
            if (res && res.length > 0) {
              this.myTradingOrderList = res;
            }
          });
          break;
        case 4:
          getc2cHistory().then(res => {
            if (res && res.length > 0) {
              this.historyOrder = res;
            }
          });
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.coin {
  color: #fff;
}
.total {
  margin-top: 1rem;
}
.main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .content {
    flex: 1;
  }
  .form {
    padding: 1rem;
    background: #fff;
    button {
      margin-top: 2.5rem;
    }
  }
}
.market-list {
  margin-top: 1rem;
  padding: 1rem;
  background: #fff;
}
.list-item {
  margin-top: 1.25rem;
  .item {
    padding: 1.5rem 1rem;
    background: #f6f6f6;
    border-radius: 3px;
    margin-top: 1.25rem;
    &:first-child {
      margin-top: 0;
    }
  }
  .dt {
    line-height: 21px;
    margin-bottom: 1rem;
  }
  .dd {
    margin-bottom: 0.5rem;
  }
  .btn-rounded {
    border-radius: 100%;
    color: #fff;
    line-height: 38px;
  }
  .col-last {
    justify-content: flex-end;
  }
}
.input-wrap {
  margin-top: 1rem;
  @include textVcenter(45px);
  input {
    flex: 1;
  }
}
.order-list {
  overflow: hidden;
  padding: 0 1rem;
  background: #fff;
  .order {
    dt {
      @include textVcenter(30px);
      margin-top: 1rem;
    }
    dd {
      margin-top: 2rem;
      font-size: 1.25rem;
    }
    .total {
      padding-bottom: 1.25rem;
    }
    .status {
      font-size: 1.25rem;
    }
  }
}
</style>
