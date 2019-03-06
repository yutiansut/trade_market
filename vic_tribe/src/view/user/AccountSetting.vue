<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full">
      <van-cell-group>
        <van-cell
          size='large'
          is-link
          to='/user/repassword_1'
          title="修改登录密码"
        />
        <van-cell
          size='large'
          is-link
          to='/user/repassword_2'
          title="修改支付密码"
        />
        <van-cell
          size='large'
          is-link
          to='/user/auth'
          title="实名认证"
        />
      </van-cell-group>
      <button
        @click='logOut'
        class="btn-block btn-large btn-danger btn-round"
      >退出登录</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    logOut() {
      this.storage.set("token", "");
      this.storage.set("isLogin", false);
      this.$store.dispatch("changeLoginState", false);
      this.navigateTo("/userentry/login");
    }
  }
};
</script>
<style lang="scss" scoped>
.van-cell-group {
  margin-top: 1rem;
}
button.btn-block {
  width: 85%;
  margin: 4rem auto auto;
}
</style>