<template>
  <div class="login user-entry">
    <div class="page-head font-bold">
      <img
        class="login-logo"
        :src="assetConfig.imgs.sign_in_logo"
        alt
      >
    </div>
    <p class="label font-14 color-999">欢迎登录MSCOIN</p>
    <form
      @submit.prevent="onSubmit"
      class="form"
    >
      <van-field
        autocomplete="off"
        v-model="account"
        placeholder="请输入用户名"
      />
      <van-field
        autocomplete="off"
        type="password"
        v-model="password"
        placeholder="请输入密码"
      />
      <button
        :disabled="disabled"
        class="btn-block btn-primary btn-large btn-default riple"
      >登录</button>
      <p class="login-links color-999 font-14 flex flex-between">
        <router-link to='/userentry/resetpassword'>忘记密码</router-link>
        <span>还没有账号？
          <router-link
            to="/userentry/register"
            class="color-primary"
          >注册</router-link>
        </span>
      </p>
    </form>
    <div class="go-download p-abs abs-h-center">
      <a href="http://www.upayw.com/static/download.html">下载APP</a>
    </div>
  </div>
</template>
<script>
import { checkLogin } from "@/vuexStore/storeService.js";
export default {
  data() {
    return {
      account: "",
      password: ""
    };
  },
  mounted() {},
  computed: {
    disabled() {
      if (!this.account || !this.password) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    validate() {
      if (!this.Util.isUserName(this.account)) {
        this.$toast({
          message: "用户名必须由6-12位字母及数字组成",
          position: "bottom"
        });
        return false;
      }
      if (!this.Util.isPassword(this.password)) {
        this.$toast({
          message: "密码必须为6-12位字符",
          position: "bottom"
        });
        return false;
      }
      return true;
    },
    onSubmit() {
      if (this.validate()) {
        checkLogin(this.account, this.password).then(res => {
          this.Store.dispatch("updateCheckLoginState", res);
          this.navigateTo("/userentry/check_login", { account: this.account });
        });
      }
    },
    onTabChange() {}
  }
};
</script>
<style lang="scss" scoped>
.login-logo {
  height: 22px;
}
.login-links {
  margin-top: 1.5rem;
}
.van-cell {
  margin-top: 1.5rem;
}
.go-download {
  bottom: 10%;
  font-size: 16px;
  color: darkslateblue;
}
button {
  margin-top: 3rem;
}
</style>
