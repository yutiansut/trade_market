<template>
  <div class="container h-full van-hairline--top">
    <div class="form">
      <div class="form-group">
        <div class="label color-666 font-14">邮箱</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            autocomplete="off"
            class="h-35"
            placeholder="请输入邮箱"
          >
          <span class="message-code">获取验证码</span>
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">邮箱验证码</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            autocomplete="off"
            class="h-35"
            placeholder="请输入验证码"
          >
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">登录密码</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            autocomplete="off"
            class="h-35"
            type='password'
            placeholder="请输入登录密码"
          >
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">图形验证码</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            autocomplete="off"
            class="h-35"
            type='password'
            placeholder="请输入图形验证码"
          >
          <span>图形验证码</span>
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
export default {};
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