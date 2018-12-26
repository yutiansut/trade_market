<template>
  <div class="app-body wh-full">
    <div class="table">
      <van-row>
        <van-col
          class="txt-center font-14 font-bold"
          span=8
        >时间</van-col>
        <van-col
          class="txt-center font-14 font-bold"
          span=8
        >余额数量</van-col>
        <van-col
          class="txt-center font-14 font-bold"
          span=8
        >兑换数量</van-col>
      </van-row>
      <van-row>
        <van-col
          class="txt-center font-14"
          span=8
        >2018-8-9</van-col>
        <van-col
          class="txt-center font-14"
          span=8
        >40000</van-col>
        <van-col
          class="txt-center font-14"
          span=8
        >10000</van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.table {
  margin-top: 1rem;
  background: #fff;
  .van-row {
    height: 4.5rem;
    line-height: 4.4rem;
    color: #555;
    border-top: 0.1rem solid #eee;
  }
}
</style>
