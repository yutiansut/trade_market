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
      @onHeadClick="slideShow"
      :iconLeft="assetConfig.imgs.user_head_portrait"
    >
      <div
        @click.self="pickerTrigger"
        slot="title"
        class="coin h-full font-16 abs-vh-center"
      >{{coinInfo.coinid}}
        <van-icon
          v-show="!icon"
          :name="assetConfig.imgs.nav_otc_arrow_down"
        />
        <van-icon
          v-show="icon"
          :name="assetConfig.imgs.nav_otc_arrow_upper"
        />
      </div>
      <div
        @click="navigateTo('/trade/tradeStatement')"
        slot="right"
        class="font-14 h-35 riple flex flex-v-center color-999"
      >交易须知</div>
    </app-header>
    <div class="content overflow-y">
      <van-tabs
        sticky
        offset-top='55'
        color="#fe0042"
        v-model="active"
      >
        <!-- 买入 -->
        <van-tab title="买入">
          <div class="form">
            <div
              class="guide-price color-999 font-14"
              v-html="usable"
            ></div>
            <div class="input-wrap font-14 flex flex-v-center flex-between van-hairline--bottom color-999">
              <input
                disabled
                placeholder="价格"
                :value="buycny"
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
                v-text="coinInfo.coinid||''"
              ></div>
            </div>
            <p class="total font-16">总计：{{buyTotal}}</p>
            <p class="tips color-danger">*&nbsp;仅支持银行卡支付，支付期限不限</p>
            <button
              @click="buyOtc"
              :disabled="buydisabled"
              class="btn-block btn-large riple btn-block btn-danger"
            >买入</button>
          </div>
          <dl
            v-for='(item,i) in otcRecordByType'
            :key='i'
            class="record"
          >
            <dt class="flex van-hairline--bottom flex-between flex-v-center">
              <div>
                <div
                  class="money font-16 font-bold"
                  v-text="item.hz"
                ></div>
                <div :class="item.state==0?'color-danger':'color-success'">{{item.state==0?'待付款':'已完成'}}</div>
              </div>
              <div class="type font-14 color-danger">买入</div>
            </dt>
            <dd class="font-14 h-45 flex flex-between flex-v-center">
              <span>总价</span>
              <span v-text="(item.zj||0)*1"></span>
            </dd>
            <dd class="font-14 h-45 flex flex-between flex-v-center">
              <span class="color-999">数量</span>
              <span v-text="(item.number||0)*1"></span>
            </dd>
            <dd class="font-14 h-45 flex flex-between flex-v-center">
              <span class="color-999">单价</span>
              <span v-text="(item.price||0)*1"></span>
            </dd>
            <dd class="font-14 h-45 flex flex-between flex-v-center">
              <span class="color-999">打款账号</span>
              <span v-text="item.bankcard"></span>
            </dd>
            <dd class="font-14 h-45 flex flex-between flex-v-center">
              <span class="color-999">备注</span>
              <span v-text="item.bz"></span>
            </dd>
            <dd class="font-14 h-45 flex flex-between flex-v-center">
              <span class="color-999">时间</span>
              <span v-text="item.wdate"></span>
            </dd>
          </dl>
        </van-tab>
        <!-- 卖出 -->
        <van-tab title="卖出">
          <div class="form">
            <div
              class="guide-price color-999 font-14"
              v-html="usable"
            ></div>
            <div class="input-wrap font-14 flex flex-v-center flex-between van-hairline--bottom color-999">
              <input
                disabled
                type="text"
                placeholder="价格"
                :value="sellcny"
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
            <p class="tips color-danger">*&nbsp;仅支持银行卡支付，支付期限不限</p>
            <button
              @click="sellOtc"
              :disabled='selldisabled'
              class="btn-block btn-large riple btn-block btn-success"
            >卖出</button>
          </div>
          <dl
            v-for='(item,i) in otcRecordByType'
            :key='i'
            class="record"
          >
            <dt class="flex van-hairline--bottom flex-between flex-v-center">
              <div>
                <div
                  class="money font-16 font-bold"
                  v-text="item.hz"
                ></div>
                <div :class="item.state==0?'color-danger':'color-success'">{{item.state==0?'待收款':'已完成'}}</div>
              </div>
              <div class="type font-14 color-danger">卖出</div>
            </dt>
            <dd class="font-14 h-45 flex flex-between flex-v-center">
              <span>总价</span>
              <span v-text="(item.zj||0)*1"></span>
            </dd>
            <dd class="font-14 h-45 flex flex-between flex-v-center">
              <span class="color-999">数量</span>
              <span v-text="(item.number||0)*1"></span>
            </dd>
            <dd class="font-14 h-45 flex flex-between flex-v-center">
              <span class="color-999">单价</span>
              <span v-text="(item.price||0)*1"></span>
            </dd>
            <dd class="font-14 h-45 flex flex-between flex-v-center">
              <span class="color-999">收款账号</span>
              <span v-text="item.bankcard"></span>
            </dd>
            <dd class="font-14 h-45 flex flex-between flex-v-center">
              <span class="color-999">备注</span>
              <span v-text="item.bz"></span>
            </dd>
            <dd class="font-14 h-45 flex flex-between flex-v-center">
              <span class="color-999">时间</span>
              <span v-text="item.wdate"></span>
            </dd>
          </dl>
        </van-tab>
        <!-- 我的订单 -->
        <van-tab title="OTC记录">
          <dl
            v-for="(item,i) in otcRecord"
            :key="i"
            class="record"
          >
            <dt class="flex van-hairline--bottom flex-between flex-v-center">
              <div>
                <div class="money font-16 font-bold">{{item.zj*1}}&nbsp;CNY</div>
                <div
                  v-if="item.type==0&&item.state==0"
                  class="status font-13 color-danger"
                >待付款</div>
                <div
                  v-if="item.type==1&&item.state==0"
                  class="status font-13 color-danger"
                >待收款</div>
                <div
                  v-if="item.type==0&&item.state==1"
                  class="status font-13 color-success"
                >已完成</div>
                <div
                  v-if="item.type==1&&item.state==1"
                  class="status font-13 color-success"
                >已完成</div>
              </div>
              <div class="type font-14 color-danger">{{item.type==0?'买入':'卖出'}}</div>
            </dt>
            <dd class="font-14 h-45 flex flex-between flex-v-center">
              <span class="color-999">数量</span>
              <span>{{item.number*1}}</span>
            </dd>
            <dd class="font-14 h-45 flex flex-between flex-v-center">
              <span class="color-999">单价</span>
              <span>{{item.price*1}}</span>
            </dd>
            <dd class="font-14 h-45 flex flex-between flex-v-center">
              <span class="color-999">时间</span>
              <span>{{item.wdate}}</span>
            </dd>
          </dl>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 币种上拉菜单 -->
    <transition name="van-slide-up">
      <van-picker
        title='OTC币种'
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
import { Picker } from "vant";
import { asideMixin } from "@/mixin/mixin";
import { randomNum } from "../../assets/js/commonFunc.js";
import {
  getOTCCoin,
  getDayNumber,
  getOTCOrder,
  otcBuy,
  otcSell,
  getOtcBank,
  getOtcOrderByType
} from "@/vuexStore/storeService.js";
export default {
  components: { appHeader, slidePop, userAside, Picker },
  mixins: [asideMixin],
  data() {
    return {
      showPicker: false,
      tradeCoins: [],
      tradecoinid: "",
      active: 0,
      price: "",
      sellnumber: "",
      buynumber: "",
      icon: false,
      coinInfo: {},
      daynumber: {},
      otcRecord: [],
      otcRecordByType: [],
      otcSellRecord: [],
      bankinfo: {}
    };
  },
  computed: {
    miniumNum() {
      return `数量(最少${(this.coinInfo.minnum || 0) * 1})`;
    },
    buycny() {
      return (this.coinInfo.buycny || 0) * 1;
    },
    sellcny() {
      return (this.coinInfo.sellcny || 0) * 1;
    },
    usable() {
      return `可用：${(this.daynumber.usable || 0) * 1}&nbsp;${this.coinInfo
        .coinid || ""}`;
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
    sellTotal() {
      if (this.coinInfo.sellcny && this.sellnumber) {
        return this.coinInfo.sellcny * this.sellnumber;
      } else {
        return 0;
      }
    },
    buyTotal() {
      if (this.coinInfo.buycny && this.buynumber) {
        return this.coinInfo.buycny * this.buynumber;
      } else {
        return 0;
      }
    }
  },
  mounted() {
    getOTCCoin().then(res => {
      if (res.length > 0) {
        this.tradeCoins = res;
        this.coinInfo = res[0];
        getDayNumber(this.coinInfo.coinid).then(res => {
          this.daynumber = res;
        });
        getOtcOrderByType(this.coinInfo.coinid, this.active).then(res => {
          if (res) this.otcRecordByType = res;
        });
      }
    });
    getOtcBank().then(res => {
      if (res) this.bankinfo = res;
    });
  },
  methods: {
    pickerTrigger() {
      this.showPicker = true;
    },
    validate(num) {
      if (num >= this.coinInfo.minnum) {
        return true;
      } else {
        return false;
      }
    },
    getNote() {
      let str = "";
      for (let i = 0; i < 6; i++) {
        str += randomNum(0, 9);
      }
      return str;
    },
    buyOtc() {
      let bz = this.getNote();
      if (this.validate(this.buynumber)) {
        otcBuy({
          coin: this.coinInfo.coinid,
          number: this.buynumber,
          jz: this.buyTotal,
          id: this.bankinfo.autoid,
          bz: bz
        });
      } else {
        this.$toast({
          message: "买入数量不能小于最小值",
          position: "bottom"
        });
      }
    },
    sellOtc() {
      if (this.validate(this.sellnumber)) {
        otcSell(this.coinInfo.coinid, this.sellnumber, this.sellTotal);
      } else {
        this.$toast({
          message: "卖出数量不能小于最小值",
          position: "bottom"
        });
      }
    },
    onConfirm(item) {
      this.coinInfo = item;
      this.showPicker = false;
    },
    cancelPicker() {
      this.showPicker = false;
    }
  },
  watch: {
    showPicker(val) {
      this.icon = val;
    },
    active(val) {
      this.sellnumber = "";
      this.buynumber = "";
      if (val == 2) {
        getOTCOrder().then(res => {
          this.otcRecord = res;
        });
      }
      getOtcOrderByType(this.coinInfo.coinid, val).then(res => {
        if (res) this.otcRecordByType = res;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.coin {
  color: #fff;
  line-height: 4.5rem;
  padding: 0 1.25rem;
  .van-icon {
    position: relative;
    top: 0.2rem;
    left: 0.2rem;
  }
}
.total {
  @include textVcenter(45px);
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
.input-wrap {
  margin-top: 1rem;
  @include textVcenter(45px);
  input {
    flex: 1;
    &[disabled] {
      background: transparent;
      color: #999;
    }
  }
}
.record {
  padding: 0 1rem;
  background: #fff;
  &:not(:first-child) {
    margin-top: 1rem;
  }
  dt {
    padding-top: 1.25rem;
    padding-bottom: 1rem;
  }
  .money {
    margin-bottom: 0.5rem;
  }
}
.tips {
  margin-top: 1rem;
}
</style>
