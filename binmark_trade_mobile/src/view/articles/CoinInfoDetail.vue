<template>
  <div class="app-body overflow-y coin-detail van-hairline--top">
    <div class="title font-18 font-bold flex flex-v-center">
      <img
        class="coin-logo thumb-30"
        :src="coinDetail.logo"
      >
      {{coinDetail.name}}
    </div>
    <div class="coin-info font-14 van-hairline--bottom">
      <span class="font-bold">币种简介：</span>{{coinDetail.info}}
    </div>
    <div class="coin-properties font-14">
      <div class="van-hairline--bottom font-bold">币种属性</div>
      <van-row>
        <van-col span='16'>
          推出日期：{{coinDetail.sdate}}
        </van-col>
        <van-col span='8'>
          发行总量：{{coinDetail.number*1}}
        </van-col>
      </van-row>
      <van-row>
        <van-col span='16'>
          市值：{{coinDetail.usdt}}
        </van-col>
        <van-col span='8'>
          币种算法：{{coinDetail.coinscrypt}}
        </van-col>
      </van-row>
      <van-row>
        <van-col span='16'>
          区块大小：{{coinDetail.blocksize}}
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
import { getCoinProfile } from "@/vuexStore/storeService.js";
export default {
  data() {
    return {
      id: "",
      coinDetail: {}
    };
  },
  async mounted() {
    let { id } = this.$route.params;
    await getCoinProfile();
    this.coinDetail = this.Store.state.coinInfo[id];
  }
};
</script>
<style lang="scss" scoped>
$gap: 1.25rem;
.coin-detail {
  padding: 0 $gap;
  .title {
    margin: $gap 0;
  }
  .coin-info {
    margin-top: $gap;
    line-height: 1.8;
    padding-bottom: $gap;
  }
  .coin-properties {
    margin-top: $gap;
    > div:first-child {
      padding-bottom: $gap;
    }
  }
  .van-row {
    line-height: 3rem;
  }
  .coin-logo {
    margin-right: 1rem;
  }
}
</style>
