<template>
  <div class="login user-entry">
    <tab-bar my-class="tab-bar" @onTabChange="onTabChange" :tabItem="tabItem"></tab-bar>
    <form @submit.prevent="onSubmit" class="check-form">
      <div v-show="tabIndex==0" class="input-wrap flex flex-between font-14">
        <input v-model="code" type="text" placeholder="请输入手机验证码">
        <span @click="getCode" class="color-primary">{{codeText}}</span>
      </div>
      <div v-show="tabIndex==2" class="input-wrap flex flex-between font-14">
        <input v-model="code" type="text" placeholder="请输入邮箱验证码">
        <span @click="getCode" class="color-primary">{{codeText}}</span>
      </div>
      <div v-show="tabIndex==1" class="input-wrap flex flex-between font-14">
        <input v-model="code" type="text" placeholder="请输入谷歌验证码">
      </div>
      <div class="van-hairline--bottom"></div>
      <button :disabled="disabled" class="btn-block btn-danger btn-large btn-default riple">确认</button>
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
      loginType: 1,
      tabIndex: 0,
      account: "",
      codeType: "2",
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
    this.account = this.Store.state.checkLoginState.tel;
  },
  methods: {
    getCode() {
      this.timeCountDown();
      setCode(this.account, this.codeType).then(res => {
        this.$toast({
          message: res.msg,
          position: "bottom"
        });
      });
    },
    onSubmit() {
      Login(this.account, this.loginType, this.code).then(data => {
        this.Store.dispatch("updateLoginState", true);
        this.Store.dispatch("updateUserinfo", data.userInfo[0]);
        this.storage.set("token", data.token);
        this.storage.set("isLogin", true);
        this.navigateTo("/home");
      });
    },
    onTabChange(i) {
      this.tabIndex = i;
      let { tel, email } = this.Store.state.checkLoginState;
      if (i == 0) {
        //手机验证
        this.loginType = 1;
        this.codeType = 2;
        this.account = tel;
      } else if (i == 1) {
        // 谷歌验证
        this.loginType = 0;
      } else {
        //邮箱验证
        this.loginType = 2;
        this.codeType = 3;
        this.account = email;
      }
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
