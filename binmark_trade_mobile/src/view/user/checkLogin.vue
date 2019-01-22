<template>
  <div class="login user-entry">
    <tab-bar
      my-class='tab-bar'
      @onTabChange='onTabChange'
      :tabItem='tabItem'
    ></tab-bar>
    <form
      @submit.prevent="onSubmit"
      class="check-form"
    >
      <div
        v-show='type==0'
        class="input-wrap flex flex-between font-14"
      >
        <input
          v-model="code"
          type="text"
          placeholder="请输入手机验证码"
        >
        <span
          @click="getCode"
          class="color-primary "
        >{{codeText}}</span>
      </div>
      <div
        v-show='type==2'
        class="input-wrap flex flex-between font-14"
      >
        <input
          v-model="code"
          type="text"
          placeholder="请输入邮箱验证码"
        >
        <span
          @click="getCode"
          class="color-primary "
        >{{codeText}}</span>
      </div>
      <div
        v-show='type==1'
        class="input-wrap flex flex-between font-14"
      >
        <input
          v-model="code"
          type="text"
          placeholder="请输入谷歌验证码"
        >
      </div>
      <div class="van-hairline--bottom"></div>
      <button
        :disabled='disabled'
        class="btn-block btn-danger btn-large btn-default riple"
      >确认</button>
    </form>
  </div>
</template>
<script>
import { verCodeMixin } from "@/mixin/mixin.js";
import { Login, setCode } from "@/vuexStore/storeService.js";
export default {
  mixins: [verCodeMixin],
  data() {
    return {
      type: 0,
      account: "",
      codeType: "1",
      tabItem: []
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == "Login") {
      next();
    } else {
      next({ path: "/userentry/login" });
    }
  },
  computed: {
    disabled() {
      return this.code == "" ? true : false;
    }
  },
  mounted() {
    this.tabItem = [];
    if (this.Store.state.checkLoginState.istel) {
      this.tabItem.push("手机验证");
    }
    if (this.Store.state.checkLoginState.isgoogle) {
      this.tabItem.push("谷歌验证");
    }
    if (this.Store.state.checkLoginState.isemail) {
      this.tabItem.push("邮箱验证");
    }
  },
  methods: {
    getCode() {
      this.timeCountDown();
      let { tel, email } = this.Store.state.checkLoginState;
      if (this.type == 0) {
        this.codeType = 2;
        this.account = tel;
      } else if (this.type == 2) {
        this.codeType = 3;
        this.account = email;
      }
      setCode(this.account, this.codeType).then(res => {
        this.$toast({
          message: res.msg,
          position: "bottom"
        });
      });
    },
    onSubmit() {
      Login(this.account, this.type, this.code).then(res => {
        this.Store.dispatch("updateLoginState", true);
        this.Store.dispatch("updateUserinfo", res.data.userInfo[0]);
        this.storage.set("token", res.data.token);
        this.storage.set("isLogin", true);
      });
    },
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
