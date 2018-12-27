<template>
  <div class="app-body">
    <van-tabs color='#333'>
      <van-tab title="积分账单"></van-tab>
      <van-tab title="余额账单"></van-tab>
      <van-tab title="VIC账单">
        <div class="table-body">
          <van-row class="flex flex-v-center">
            <van-col span='12'>
              <div class="label font-14">当日余额释放</div>
              <small class="color-666 font-14">2018-8-2</small>
            </van-col>
            <van-col
              span='12'
              class="font-18 txt-rt"
            >+0.25</van-col>
          </van-row>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.table-body {
  margin-top: 0.9rem;
  background: #fff;
  .van-row {
    padding: 0.8rem 1.25rem;
    border-bottom: 0.075rem solid #eee;
  }
  .label {
    margin-bottom: 0.45rem;
  }
}
</style>