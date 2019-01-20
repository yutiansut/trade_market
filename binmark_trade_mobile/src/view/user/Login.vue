<template>
  <div class="login user-entry">
    <div class="page-head font-bold">
      <img class="login-logo" :src="assetConfig.imgs.logo_1" alt>
    </div>
    <p class="label font-14 color-999">欢迎登录MSCOIN</p>
    <form autocomplete="off" @submit.prevent="onSubmit" class="form">
      <van-field v-model="account" placeholder="请输入用户名"/>
      <van-field type="password" v-model="password" placeholder="请输入密码"/>
      <button :disabled="disabled" class="btn-block btn-primary btn-large btn-default riple">登录</button>
      <p class="login-links color-999 font-14 flex flex-between">
        <router-link to>忘记密码</router-link>
        <span>还没有账号？
          <router-link to="/userentry/register" class="color-primary">注册</router-link>
        </span>
      </p>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      disabled: false,
      account: "",
      password: ""
    };
  },
  methods: {
    getCode() {},
    onSubmit() {
      console.log();
    },
    onTabChange() {}
  }
};
</script>
<style lang="scss" scoped>
.login-logo {
  height: 3rem;
}
.login-links {
  margin-top: 1.5rem;
}
.van-cell {
  margin-top: 1.5rem;
}
button {
  margin-top: 3rem;
}
</style>
