<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body van-hairline--top overflow-y h-full">
      <div class="detail-head flex flex-between van-hairline--bottom">
        <div class="coin">
          <div class="font-bold font-18">USDT</div>
          <div class="status font-13 color-success">提现完成</div>
        </div>
        <div class="amount font-18">132465</div>
      </div>
      <div class="detail-body">
        <van-row class="h-45 font-15 flex flex-v-center">
          <van-col
            class="color-999"
            span='6'
          >单号</van-col>
          <van-col
            class="txt-rt"
            span='18'
          >1003152</van-col>
        </van-row>
        <van-row class="h-45 font-15 flex flex-v-center">
          <van-col
            class="color-999"
            span='6'
          >操作方式</van-col>
          <van-col
            class="txt-rt"
            span='18'
          >汇入地址充值</van-col>
        </van-row>
        <van-row class="h-45 font-15 flex flex-v-center">
          <van-col
            class="color-999"
            span='6'
          >交易ID</van-col>
          <van-col
            class="txt-rt"
            span='18'
          >0x167c797350d4548fvr1889f1er258vb800
            a 4a5c65</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.app-body {
  padding: 0 1rem;
  background: #fff;
}
.detail-head {
  padding: 1.25rem 0;
  .status {
    margin-top: 0.85rem;
  }
}
</style>