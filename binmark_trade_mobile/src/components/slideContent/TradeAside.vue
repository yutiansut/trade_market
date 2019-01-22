<template>
  <div class="coin-slide w-full overflow-y">
    <van-tabs
      color='#b72026'
      line-width='30'
      v-model="tabActive"
      @click="onClick"
    >
      <van-tab
        v-for="(item,i) in Store.state.mainCoin"
        :key='i'
        :title="item.coinid"
      ></van-tab>
    </van-tabs>
    <div class="coin-list">
      <van-row
        v-for="(item,i) in Store.state.tradeCoin"
        :key='i'
        @click="onRowClick"
        class="h-50 flex flex-v-center"
      >
        <van-col
          span='8'
          class="font-14 font-bold"
          v-text="item.coinid"
        >
        </van-col>
        <van-col
          span='8'
          class="font-14"
          :class='item.rise>0?"color-danger":"color-success"'
          v-text="item.number*1"
        >
        </van-col>
        <van-col
          span='8'
          class="font-14 txt-rt"
          :class='item.rise>0?"color-danger":"color-success"'
          v-text="item.rise*1+'%'"
        >
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
    },
    onClick(index, title) {
      this.$emit("onTabClick", title);
    }
  }
};
</script>

<style lang="scss" scoped>
.van-tabs__nav--line {
  padding: 0 1rem;
}
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

