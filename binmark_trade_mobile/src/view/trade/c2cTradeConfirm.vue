<template>
  <div class="wh-full app-main">
    <my-header></my-header>
    <div class="app-body overflow-y">
      <div class="order-detail">
        <van-row class="h-45 font-16 flex flex-v-center">
          <van-col
            span='6'
            class="color-999"
          >数量</van-col>
          <van-col
            span='18'
            class="txt-rt"
          >100.000&nbsp;USDT</van-col>
        </van-row>
        <van-row class="h-45 font-16 flex flex-v-center">
          <van-col
            span='6'
            class="color-999"
          >金额</van-col>
          <van-col
            span='18'
            class="txt-rt"
          >100.000&nbsp;USDT</van-col>
        </van-row>
        <van-row class="h-45 font-16 flex flex-v-center">
          <van-col
            span='6'
            class="color-999"
          >估价</van-col>
          <van-col
            span='18'
            class="txt-rt"
          >741.0000&nbsp;USDT</van-col>
        </van-row>
        <van-row class="h-45 font-16 flex flex-v-center">
          <van-col
            span='6'
            class="color-999"
          >支付方式</van-col>
          <van-col
            span='18'
            class="txt-rt"
          >银行卡</van-col>
        </van-row>
      </div>
    </div>
    <button class="confirm-btn btn-block riple btn-large btn-primary">确定下单</button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.Store.commit("setHeaderTitle", "USDT买入");
  }
};
</script>
<style lang="scss" scoped>
button.confirm-btn {
  box-sizing: border-box;
  margin: 0 auto 1rem auto;
  width: calc(100% - 2rem);
}
.order-detail {
  margin-top: 1rem;
  padding: 1rem;
  background: #fff;
}
</style>