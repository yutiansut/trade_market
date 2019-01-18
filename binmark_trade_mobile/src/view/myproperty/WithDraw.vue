<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full overflow-y">
      <div class="content h-full van-hairline--top">
        <div class="form-group font-bold">
          <div class="label color-666 font-14">可用余额</div>
          <div class="form-input font-15 van-hairline--bottom">
            <span class="value">0.0000 USDT</span>
          </div>
        </div>
        <div class="form-group font-bold">
          <div class="label color-666 font-14">提现地址</div>
          <div class="form-input font-15 van-hairline--bottom">
            <input
              class="h-35"
              type="text"
              placeholder="请选择提现地址"
            >
          </div>
        </div>
        <div class="form-group font-bold">
          <div class="label color-666 font-14">地址名称</div>
          <div class="form-input font-15 van-hairline--bottom">
            <input
              class="h-35"
              type="text"
              placeholder="地址名称：例如 My Address选填"
            >
          </div>
        </div>
        <div class="form-group font-bold">
          <div class="label color-666 font-14">提现金额</div>
          <div class="form-input font-15 van-hairline--bottom">
            <input
              class="h-35"
              type="text"
              placeholder="请输入提现金额"
            >
            <span class="color-666">USDT</span>
          </div>
        </div>
        <div class="form-group font-bold">
          <div class="label color-666 font-14">手续费</div>
          <div class="form-input font-15 van-hairline--bottom">
            <input
              class="h-35"
              type="text"
              placeholder="请输入提现金额"
            >
            <span class="color-666">USDT</span>
          </div>
        </div>
        <div class="font-13 tips color-danger">单笔提现最少200USDT 单笔提现最多500USDT</div>
      </div>
    </div>
    <div class="bottom">
      <div class="font-18 color-666 flex flex-between">
        <span>实际到账</span>
        <span>0.0000 USDT</span>
      </div>
      <button class="btn-large btn-block btn-primary">确定</button>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
$gap: 1rem;
.content {
  background: #fff;
}

.tips {
  padding: 0 $gap;
  margin-top: 1.25rem;
}

.bottom {
  background: #fff;
  padding: $gap;
  button {
    margin-top: 1.25rem;
  }
}
</style>