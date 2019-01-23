<template>
  <div class="login user-entry">
    <tab-bar
      my-class="tab-bar"
      @onTabChange="onTabChange"
      :tabItem="tabItem"
      :tabIndex="loginType"
    ></tab-bar>
    <form
      @submit.prevent="onSubmit"
      class="check-form"
    >
      <div
        v-show="loginType==1"
        class="input-wrap flex flex-between font-14"
      >
        <input
          v-model="code"
          type="text"
          placeholder="请输入手机验证码"
        >
        <span
          @click="sendCode"
          class="color-primary"
        >{{codeText}}</span>
      </div>
      <div
        v-show="loginType==2"
        class="input-wrap flex flex-between font-14"
      >
        <input
          v-model="code"
          type="text"
          placeholder="请输入邮箱验证码"
        >
        <span
          @click="sendCode"
          class="color-primary"
        >{{codeText}}</span>
      </div>
      <div
        v-show="loginType==0"
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
        :disabled="disabled"
        class="btn-block btn-danger btn-large btn-default riple"
      >确认</button>
    </form>
  </div>
</template>
<script>
import { verCodeMixin } from "@/mixin/mixin.js";
import { Login, sendCode } from "@/vuexStore/storeService.js";
export default {
  mixins: [verCodeMixin],
  data() {
    return {
      loginType: 1,
      account: "",
      codeType: "2",
      tabItem: [
        {
          label: "手机验证",
          type: "1"
        },
        {
          label: "谷歌验证",
          type: "0"
        },
        {
          label: "邮箱验证",
          type: "2"
        }
      ]
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
    let {
      isemail,
      isgoogle,
      istel,
      tel,
      email
    } = this.Store.state.checkLoginState;
    if (isemail && !isgoogle && !istel) {
      this.loginType = 2;
      this.codeType = 3;
      this.account = email;
    } else if (isgoogle && !isemail && !istel) {
      this.loginType = 0;
    } else if (istel && !isgoogle && !isemail) {
      this.account = tel;
      this.codeType = 2;
      this.loginType = 1;
    } else if (!isemail && !isgoogle && !istel) {
      this.account = "";
      this.loginType = "";
    }
  },
  methods: {
    sendCode() {
      this.timeCountDown();
      sendCode(this.account, this.codeType).then(res => {
        if (res) {
          this.$toast({
            message: res.msg,
            position: "bottom"
          });
        }
      });
    },
    onSubmit() {
      Login(this.account, this.loginType, this.code).then(data => {
        this.Store.dispatch("updateLoginState", true);
        this.Store.dispatch("updateUserinfo", data.userinfo[0]);
        this.storage.set("token", data.token);
        this.storage.set("isLogin", true);
        this.navigateTo("/home");
      });
    },
    onTabChange(i) {
      this.loginType = i;
      let { tel, email } = this.Store.state.checkLoginState;
      if (i == 1) {
        // 发送手机
        this.codeType = 2;
        this.account = tel;
      } else if (i == 2) {
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
