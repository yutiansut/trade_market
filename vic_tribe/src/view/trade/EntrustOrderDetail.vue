<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body overflow-y h-full">
      <div class="order-info van-hairline--bottom">
        <div class="flex flex-between font-14">
          <div class="label color-666">价格</div>
          <div class="value">100.00</div>
        </div>
        <div class="flex flex-between font-14">
          <div class="label color-666">数量</div>
          <div class="value">100.00</div>
        </div>
        <div class="flex flex-between font-14">
          <div class="label color-666">金额</div>
          <div class="value">100.00</div>
        </div>
        <div class="flex flex-between font-14">
          <div class="label color-666">状态</div>
          <div class="value status-1">待确认</div>
        </div>
      </div>
      <div class="panel">
        <div class="title font-15 font-bold">凭证</div>
        <div class="img-list">
          <div class="img-container p-rel">
            <img
              class="p-abs abs-v-center"
              src=""
              alt="凭证"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="btn-wrap">
      <button class="btn btn-block btn-dark btn-active btn-large btn-radius">我已付款</button>
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
$gap: 10px;
.app-body {
  margin-top: $gap;
  background: #fff;
}
.order-info {
  padding: 0 $gap;
  > div {
    padding: $gap 0;
  }
}
.panel {
  padding: 0 $gap;
  .title {
    padding: 14px 0;
  }
}
.btn-wrap {
  padding: 0 $gap $gap;
  background: #fff;
}
.img-list {
  overflow: hidden;
  .img-container {
    width: calc(50% - 5px);
    padding-top: calc(50% - 5px);
    float: left;
    &:not(:first-child) {
      margin-left: 10px;
    }
  }
  img {
    width: 100%;
  }
}

.status-0 {
  color: #666;
}
.status-1 {
  color: $color-danger;
}
.status-2 {
  color: $color-success;
}
</style>