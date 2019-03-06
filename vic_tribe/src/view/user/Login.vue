<template>
  <div class="login user-entry">
    <account-head></account-head>
    <div class="page-head font-bold">
      <span class="font-20">登录</span>
      <span class="font-18">VIC&nbsp;&nbsp;tribe</span>
    </div>
    <p class="label font-14 color-666">
      您可以使用VIC tribe账号/手机号进行登录
    </p>
    <form class="form">
      <!-- <tab-bar
        @onTabChange='onTabChange'
        :tabItem='tabItem'
      ></tab-bar> -->
      <van-row v-show="type=='0'">
        <van-col
          class="font-16"
          span='6'
        >手机号</van-col>
        <van-col
          class="font-16"
          span='18'
        >
          <input
            v-model="account"
            autocomplete='off'
            type="text"
            placeholder="请输入手机号"
          >
        </van-col>
      </van-row>
      <van-row v-show="type=='1'">
        <van-col
          class="font-16"
          span='6'
        >邮箱</van-col>
        <van-col
          class="font-16"
          span='18'
        >
          <input
            v-model="account"
            autocomplete='off'
            type="text"
            placeholder="请输入邮箱"
          >
        </van-col>
      </van-row>
      <van-row>
        <van-col span='6'>密码</van-col>
        <van-col span='14'>
          <input
            v-model="password"
            autocomplete='off'
            :type="passwordVisable?'text':'password'"
            placeholder="请输入密码"
          >
        </van-col>
        <van-col span='4'>
          <i
            @touchend="toggleVisiable"
            class="iconfont font-24"
            :class="passwordVisable?'icon-eye_open':'icon-icon_eye-close'"
          ></i>
        </van-col>
      </van-row>
    </form>
    <router-link
      class="font-14 fr link-to"
      to='/userentry/forget_password'
    >忘记密码？</router-link>
    <button
      @touchend='onSubmit'
      class="btn-block btn-large btn-default btn-active btn-round"
    >登录</button>
    <a
      href=""
      class="down-load font-16"
    >下载APP</a>
    <p class="version p-abs abs-h-center txt-center font-18 color-999">VIC tribe 1.0版本</p>
  </div>
</template>
<script>
import accountHead from "@/components/account/accountHead";
import { passwordVisable } from "@/mixins/mixins.js";
import { Login, getSmsCode } from "@/vuexStore/commonController.js";
export default {
  components: { accountHead, passwordVisable },
  mixins: [passwordVisable],
  data() {
    return {
      type: 0,
      account: "",
      password: ""
    };
  },
  methods: {
    validate() {
      let code = 0;
      let msg = "";
      if (this.account == "") {
        msg = "手机号不能为空";
        code = 1;
        return { code, msg };
      }
      if (!this.Validate.isPhone(this.account)) {
        msg = "手机号码格式不正确";
        code = 1;
        return { code, msg };
      }
      if (!this.Validate.isPassword(this.password)) {
        msg = "密码必须为6-12个字符";
        code = 1;
        return { code, msg };
      }
      return { code, msg };
    },
    onSubmit() {
      let { code, msg } = this.validate();
      if (code != 0) {
        this.$toast(msg);
        return;
      }
      Login(this.account, this.password).then(res => {
        if (res) {
          this.$store.dispatch("changeLoginState", true);
          this.storage.set("isLogin", true);
          this.storage.set("token", res.data.token);
          this.navigateTo("/");
        }
      });
    },
    onTabChange(i) {
      this.type = i;
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  .down-load {
    display: block;
    text-align: center;
    color: #fff;
    margin-top: 3.7vh;
  }
  .version {
    bottom: 2rem;
  }
}
</style>
