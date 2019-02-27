<template>
  <div class="wh-full container">
    <div
      class="user flex"
      :style="{backgroundImage:'url('+assetConfig.topBg+')'}"
    >
      <div class="header-title txt-center p-rel h-45 font-16">
        <van-icon
          class="p-abs abs-v-center"
          size='1.8rem'
          name="arrow-left"
          @touchend='goBack'
        />
        <span>{{$store.state.headerTitle}}</span>
      </div>
      <div class="money txt-center">
        <div class="font-18">总资产</div>
        <div class="font-24">{{$store.state.accountInfo.customerIntegral}}</div>
      </div>
    </div>
    <div class="row font-16 flex flex-between h50">
      <div class="flex flex-v-center">
        <img :src="assetConfig.balance">
        <span>余额</span>
      </div>
      <div>{{$store.state.accountInfo.useMoney}}</div>
    </div>
    <div class="row font-16 flex flex-between h50">
      <div class="flex flex-v-center">
        <img :src="assetConfig.VIC">
        <span>VIC</span>
      </div>
      <div>{{$store.state.accountInfo.useCoin}}</div>
    </div>
    <div class="row font-16 flex flex-between h50">
      <div class="flex flex-v-center">
        <img :src="assetConfig.tradeVic">
        <span>交易 VIC</span>
      </div>
      <div>{{$store.state.accountInfo.lockCoin}}</div>
    </div>
  </div>
</template>
<script>
import { selectAccount } from "@/vuexStore/customerController.js";
export default {
  data() {
    const assetConfig = {
      topBg: require("../../assets/images/user/bj_wdqy.png"),
      tradeVic: require("../../assets/images/wallet/jyvic.png"),
      VIC: require("../../assets/images/wallet/vic.png"),
      balance: require("../../assets/images/wallet/ye.png")
    };
    return {
      assetConfig
    };
  },
  mounted() {
    selectAccount();
  }
};
</script>
<style lang="scss" scoped>
.user {
  height: 25%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: #fff;
  flex-direction: column;
  > div:last-child {
    flex: 1;
  }
}
.money {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > div {
    line-height: 1.5;
  }
}
.header-title {
  line-height: 45px;
  .van-icon {
    left: 0;
    height: 100%;
    line-height: 45px;
    padding: 0 1rem;
  }
}
.row {
  margin-top: 15px;
  background: #fff;
  box-sizing: border-box;
  padding: 0 15px;
  @include textVcenter(55px);
  img {
    height: 75%;
    margin-right: 10px;
  }
}
</style>
