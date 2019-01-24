<template>
  <div class="fee-container van-hairline--top h-full">
    <dl
      v-for="(item,i) in fees"
      :key='i'
      class="van-hairline--bottom"
    >
      <dt class="font-16 font-bold flex flex-v-center">
        <img
          class="thumb-30"
          :src="item.logo"
        >&nbsp;&nbsp;&nbsp;
        <span>{{item.coinid}}</span>
      </dt>
      <dd class="flex flex-between">
        <span class="label font-15 color-999">交易手续费</span>
        <span class="font-13">{{(item.tradgas||0)*100+"%"}}</span>
      </dd>
      <dd class="flex flex-between">
        <span class="label font-15 color-999">提币手续费</span>
        <span class="font-13">{{(item.outgas||0)*100+"%"}}</span>
      </dd>
      <dd class="flex flex-between">
        <span class="label font-15 color-999">提币单笔最低</span>
        <span class="font-13">{{item.oneoutlow*1}}</span>
      </dd>
      <dd class="flex flex-between">
        <span class="label font-15 color-999">提币单日最大</span>
        <span class="font-13">{{item.oneoutheight*1}}</span>
      </dd>
    </dl>
  </div>
</template>
<script>
import { CoinFee } from "@/vuexStore/storeService.js";
export default {
  data() {
    return {
      fees: []
    };
  },
  mounted() {
    CoinFee().then(res => {
      this.fees = res;
    });
  }
};
</script>
<style lang="scss" scoped>
.fee-container {
  padding-left: 1rem;
  dl {
    padding-bottom: 1rem;
  }
  dt {
    @include textVcenter(45px);
  }
  dd {
    @include textVcenter(35px);
    padding-right: 1rem;
  }
}
</style>