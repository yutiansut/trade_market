<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full">
      <van-cell-group>
        <van-cell
          title="数量"
          title-class='color-666'
          :value='moneyNum'
        ></van-cell>
        <van-cell
          title="金额"
          title-class='color-666'
          :value='tradePrice'
        ></van-cell>
      </van-cell-group>
      <div class="btn-wrap">
        <button
          @click='onSubmit'
          class="btn btn-block btn-large btn-active btn-dark btn-radius"
        >确定买入</button>
      </div>
    </div>
  </div>
</template>
<script>
import { matchingCoinTrade } from "@/vuexStore/tradeController.js";
export default {
  data() {
    return {
      id: "",
      tradePrice: "",
      moneyNum: ""
    };
  },
  mounted() {
    let { id, tradePrice, moneyNum } = this.$route.query;
    this.tradePrice = tradePrice;
    this.moneyNum = moneyNum;
    this.id = id;
  },
  methods: {
    onSubmit() {
      this.id && matchingCoinTrade(this.id);
    }
  }
};
</script>
<style lang="scss" scoped>
$gap: 1rem;
.app-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.btn-wrap {
  padding: 0 $gap $gap;
}
</style>