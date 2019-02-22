<template>
  <div class="login user-entry">
    <account-head></account-head>
    <div class="page-head font-bold">
      <span class="font-20">登录</span>
      <span class="font-18">VIC&nbsp;&nbsp;tribe</span>
    </div>
    <p class="label font-14 color-666">
      您可以使用VIC tribe账号/邮箱账号进行登录
    </p>
    <form class="form">
      <tab-bar
        @onTabChange='onTabChange'
        :tabItem='tabItem'
      ></tab-bar>
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
            type="password"
            placeholder="请输入密码"
          >
        </van-col>
        <van-col span='4'>
          <i
            @click="toggleVisiable"
            class="iconfont font-24"
            :class="passwordVisable?'icon-icon_eye-open':'icon-icon_eye-close'"
          ></i>
        </van-col>
      </van-row>
      <van-row>
        <van-col span='6'>验证码</van-col>
        <van-col span='10'>
          <input
            v-model="code"
            autocomplete='off'
            type="text"
            placeholder="请输入验证码"
          >
        </van-col>
        <van-col span='8'>
          <span
            @touchend='getCode'
            v-text="codeText"
          ></span>
        </van-col>
      </van-row>
    </form>
    <router-link
      class="font-14 fr link-to"
      to=''
    >忘记密码？</router-link>
    <button class="btn-block btn-large btn-default btn-active btn-round">登录</button>
    <a
      href=""
      class="down-load font-16"
    >下载APP</a>
    <p class="version p-abs abs-h-center txt-center font-18 color-999">VIC tribe 1.0版本</p>
  </div>
</template>
<script>
import accountHead from "@/components/account/accountHead";
import { verCodeMixin, passwordVisable } from "@/mixins/mixins.js";
export default {
  components: { accountHead, passwordVisable },
  mixins: [verCodeMixin, passwordVisable],
  data() {
    return {
      tabItem: ["手机号", "邮箱"],
      type: 0,
      account: "",
      password: ""
    };
  },
  methods: {
    validate() {
      let code = 1;
      let msg = "";
      if (this.account == "") {
        msg = "用户名不能为空";
        code = 0;
      } else if (!this.Validate(this.account)) {
        msg = "用户名必须6-12位字母或者数字";
        code = 0;
      }
      return { code, msg };
    },
    getCode() {
      this.timeCountDown();
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
    margin-top: 2.7vh;
  }
  .version {
    bottom: 2rem;
  }
}
</style>
