<template>
  <div class="container h-full van-hairline--top">
    <div class="form">
      <div class="form-group">
        <div class="label color-666 font-14">户主</div>
        <div class="form-input font-15 van-hairline--bottom">
          <span class="font-bold">先生</span>
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">卡号</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            autocomplete="off"
            class="h-35"
            placeholder="请输入卡号"
          >
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">开户银行</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            autocomplete="off"
            class="h-35"
            placeholder="请输入卡户银行"
          >
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">开户支行</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            autocomplete="off"
            class="h-35"
            placeholder="请输入开户支行"
          >
        </div>
      </div>
    </div>
    <div class="btn-group">
      <button
        @click="onSubmit"
        class="btn-large btn-block riple btn-primary"
      >确定</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onSubmit() {}
  }
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
}
.form-group {
  margin-top: 1rem;
}

.message-code {
  color: #3388ff;
  border-radius: 45px;
}
.btn-group {
  padding: 1rem;
}
</style>