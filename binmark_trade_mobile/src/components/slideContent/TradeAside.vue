<template>
  <div class="coin-slide w-full overflow-y">
    <van-tabs
      color='#b72026'
      line-width='30'
      v-model="tabActive"
    >
      <van-tab title="USDT"></van-tab>
      <van-tab title="BTC"></van-tab>
      <van-tab title="ETH"></van-tab>
    </van-tabs>
    <div class="coin-list">
      <van-row
        @click="onRowClick"
        class="h-50 flex flex-v-center"
      >
        <van-col
          span='6'
          class="font-14 font-bold"
        >
          USDT
        </van-col>
        <van-col
          span='9'
          class="font-14"
        >
          0.251515
        </van-col>
        <van-col
          span='9'
          class="font-14 txt-rt"
        >
          -0.72%
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "trade-aside",
  data() {
    return {
      tabActive: 0
    };
  },
  methods: {
    onRowClick() {
      this.$emit("onRowClick");
    }
  }
};
</script>

<style lang="scss" scoped>
.coin-list {
  .van-row {
    position: relative;
    padding: 0 1rem;
    &:not(:last-child)::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 1px;
      background-color: #ebedf0;
      transform: scaleY(0.5);
    }
    &:active {
      background: #ebedf0;
    }
  }
}
</style>

