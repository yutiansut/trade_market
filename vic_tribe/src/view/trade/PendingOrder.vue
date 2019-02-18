<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full">
      <div class="panel">
        <div class="panel-head font-14 font-bold">
          订单详情<div class="van-hairline--bottom"></div>
        </div>
        <div class="panel-body">
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >单号</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >1216161</van-col>
          </van-row>
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >单价</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >￥1216161</van-col>
          </van-row>
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >数量</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >1216161</van-col>
          </van-row>
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >总价</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >￥1216161</van-col>
          </van-row>
        </div>
      </div>
      <div class="panel">
        <div class="panel-head font-14 font-bold">
          卖方<div class="van-hairline--bottom"></div>
        </div>
        <div class="panel-body">
          <van-row class="font-14">
            <van-col
              class="color-666"
              span='8'
            >真实姓名</van-col>
            <van-col
              class="txt-rt"
              span='16'
            >李先生</van-col>
          </van-row>
        </div>
      </div>
      <div class="panel">
        <div class="panel-head font-14 font-bold">
          上传凭证<div class="van-hairline--bottom"></div>
        </div>
        <div class="panel-body"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
$gap: 1rem;
.panel {
  margin-top: $gap;
  background: #fff;
  .panel-head {
    @include textVcenter(45px);
    padding-left: $gap;
  }
  .van-row {
    padding: 10px 15px;
    line-height: 24px;
  }
}
</style>