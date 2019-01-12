<template>
  <div class="login user-entry">
    <tab-bar
      my-class='tab-bar'
      @onTabChange='onTabChange'
      :tabItem='tabItem'
    ></tab-bar>
    <form class="check-form">
      <div
        v-show='type==0'
        class="input-wrap flex flex-between font-14"
      >
        <input
          type="text"
          placeholder="请输入验证码"
        >
        <span class="color-primary ">{{getCodeMsg}}</span>
      </div>
      <div
        v-show='type==1'
        class="input-wrap flex flex-between font-14"
      >
        <input
          type="text"
          placeholder="邮箱验证码"
        >
        <span class="color-primary ">{{getCodeMsg}}</span>
      </div>
      <div
        v-show='type==2'
        class="input-wrap flex flex-between font-14"
      >
        <input
          type="text"
          placeholder="请输入谷歌验证码"
        >
      </div>
      <div class="van-hairline--bottom"></div>
      <button
        :disabled='disabled'
        class="btn-block btn-danger btn-large btn-default btn-active"
      >确认</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      disabled: true,
      type: 0,
      code: "",
      timer: null,
      getCodeMsg: "发送验证码",
      tabItem: ["手机验证", "邮箱验证", "谷歌验证"]
    };
  },
  // beforeRouterEnter(to, from, next) {
  //   if (from.name == "Login" && this.Store.state.isCheckLogin) {
  //     next();
  //   } else {
  //     next({ path: "/user/login" });
  //   }
  // },
  methods: {
    getCode() {},
    onTabChange(i) {
      this.type = i;
    }
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
.tab-bar {
  margin-top: 2rem;
}
.check-form {
  margin-top: 6rem;
  .input-wrap {
    line-height: 4rem;
  }
  .van-cell {
    margin-top: 1.5rem;
  }
  button {
    margin-top: 4rem;
  }
}
</style>
