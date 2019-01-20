<template>
  <div class="main h-full">
    <!-- 侧栏滑块 -->
    <slide-pop @onClose="toggleSlideShow" :showPop="showPop">
      <user-aside slot="content"></user-aside>
    </slide-pop>
    <!-- header -->
    <app-header @onHeadClick="toggleSlideShow" :iconLeft="assetConfig.imgs.user_head_portrait">
      <div @click.self="actionTrigger" slot="title" class="coin h-full font-16 abs-vh-center">USDT
        <van-icon v-show="!icon" :name="assetConfig.imgs.nav_otc_arrow_down"/>
        <van-icon v-show="icon" :name="assetConfig.imgs.nav_otc_arrow_upper"/>
      </div>
      <div
        @click="navigateTo('/trade/tradeStatement')"
        slot="right"
        class="font-14 h-35 riple flex flex-v-center color-999"
      >交易须知</div>
    </app-header>
    <div class="content overflow-y">
      <van-tabs color="#fe0042" v-model="active">
        <!-- 买入 -->
        <van-tab title="买入">
          <div class="form">
            <div class="guide-price color-999 font-14">1&nbsp;ETH&nbsp;折合&nbsp;5&nbsp;CNY</div>
            <div class="input-wrap font-14 flex flex-v-center flex-between van-hairline--bottom">
              <input type="text" placeholder="价格">
              <div class="label">USDT</div>
            </div>
            <div class="input-wrap font-14 flex flex-v-center flex-between van-hairline--bottom">
              <input type="text" placeholder="数量">
              <div class="label">CNY</div>
            </div>
            <p class="tips color-danger">*&nbsp;仅支持银行卡支付，支付期限不限</p>
            <button class="btn-block btn-large riple btn-block btn-danger">买入</button>
          </div>
        </van-tab>
        <!-- 卖出 -->
        <van-tab title="卖出">
          <div class="form">
            <div class="guide-price color-999 font-14">指导价：12321</div>
            <div class="input-wrap font-14 flex flex-v-center flex-between van-hairline--bottom">
              <input type="text" placeholder="价格">
              <div class="label">USDT</div>
            </div>
            <div class="input-wrap font-14 flex flex-v-center flex-between van-hairline--bottom">
              <input type="text" placeholder="数量">
              <div class="label">CNY</div>
            </div>
            <p class="tips color-danger">*&nbsp;仅支持银行卡支付，支付期限不限</p>
            <button class="btn-block btn-large riple btn-block btn-success">卖出</button>
          </div>
        </van-tab>
        <!-- 我的订单 -->
        <van-tab title="OTC记录">
          <dl class="record">
            <dt class="flex van-hairline--bottom flex-between flex-v-center">
              <div>
                <div class="money font-16 font-bold">18095.92 CNY</div>
                <div class="status font-13 color-success">已完成</div>
              </div>
              <div class="type font-14 color-danger">买入</div>
            </dt>
            <dd class="font-14 h-45 flex flex-between flex-v-center">
              <span class="color-999">数量</span>
              <span>164546</span>
            </dd>
            <dd class="font-14 h-45 flex flex-between flex-v-center">
              <span class="color-999">单价</span>
              <span>164546</span>
            </dd>
            <dd class="font-14 h-45 flex flex-between flex-v-center">
              <span class="color-999">时间</span>
              <span>164546</span>
            </dd>
          </dl>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 币种上拉菜单 -->
    <van-actionsheet v-model="showActionSheet" :actions="tradeCoins" @select="onSelect"/>
  </div>
</template>
<script>
import appHeader from "@/components/header/AppHeader";
import slidePop from "@/components/other/slidePop";
import userAside from "@/components/slideContent/UserAside";
import Mixin from "@/mixin/mixin";
export default {
  components: { appHeader, slidePop, userAside },
  mixins: [Mixin],
  data() {
    return {
      showActionSheet: false,
      tradeCoins: [
        {
          name: "USDT"
        },
        {
          name: "BTH"
        }
      ],
      tradecoinid: "",
      active: 2,
      price: "",
      number: "",
      icon: false
    };
  },
  methods: {
    actionTrigger() {
      this.showActionSheet = true;
    },
    onSelect(item) {
      this.showActionSheet = false;
    }
  },
  watch: {
    showActionSheet(val) {
      this.icon = val;
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
