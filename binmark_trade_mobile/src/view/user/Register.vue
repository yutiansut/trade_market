<template>
  <div class="register">
    <div class="page-head font-26">注册账户</div>
    <div class="register-form">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: 0,
      getCodeMsg: "发送验证码"
    };
  },
  methods: {
    onSubmit() {}
  }
};
</script>
<style lang="scss">
.register-form {
  margin-top: 6rem;
  .input-wrap {
    margin-top: 1.5rem;
    line-height: 4rem;
  }
  .van-cell {
    margin-top: 1.5rem;
  }
  .btn-submit {
    margin-top: 4rem;
  }
  .van-button {
    padding-left: 2.5rem;
    border-color: $color-primary;
  }
  .icon-arrow {
    width: 1.2rem;
    left: 0.5rem;
  }
}
</style>