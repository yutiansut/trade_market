<template>
  <div class="login user-entry">
    <account-head
      to='/userentry/login'
      linkLabel='返回登录'
    ></account-head>
    <div class="page-head font-bold">
      <span class="font-20">找回密码</span>
    </div>
    <p class="label font-14 color-666">
      您可以使用手机号进行找回
    </p>
    <form class="form">
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
      <van-row>
        <van-col span='6'>新密码</van-col>
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
            @click="toggleVisiable"
            class="iconfont font-24"
            :class="passwordVisable?'icon-eye_open':'icon-icon_eye-close'"
          ></i>
        </van-col>
      </van-row>
      <van-row>
        <van-col span='6'>确认密码</van-col>
        <van-col span='14'>
          <input
            v-model="repassword"
            autocomplete='off'
            :type="passwordVisable?'text':'password'"
            placeholder="请再次输入密码"
          >
        </van-col>
        <van-col span='4'>
          <i
            @click="toggleVisiable"
            class="iconfont font-24"
            :class="passwordVisable?'icon-eye_open':'icon-icon_eye-close'"
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
            @click='getCode'
            v-text="codeText"
          ></span>
        </van-col>
      </van-row>
    </form>
    <button
      @click='onSubmit'
      class="btn-block btn-large btn-default btn-active btn-round"
    >确认</button>
  </div>
</template>
<script>
import accountHead from "@/components/account/accountHead";
import { passwordVisable, verCodeMixin } from "@/mixins/mixins.js";
import { forgetPassword, getSmsCode } from "@/vuexStore/commonController.js";
export default {
  components: { accountHead, passwordVisable },
  mixins: [passwordVisable, verCodeMixin],
  data() {
    return {
      type: 0,
      account: "",
      password: "",
      repassword: ""
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
      if (this.repassword !== this.password) {
        msg = "两次输入密码不一致";
        code = 1;
        return { code, msg };
      }
      if (!this.code) {
        msg = "验证码不能为空";
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
      forgetPassword(this.phone, this.password, this.code).then(res => {
        if (res) {
          this.navigateTo("/userentry/login");
        }
      });
    },
    getCode() {
      if (!this.Validate.isPhone(this.account)) {
        this.$toast("手机号码格式不正确");
        return;
      }
      if (this.canGetCode) {
        getSmsCode(this.account, 1).then(res => {
          this.timeCountDown();
        });
      }
    },
    onTabChange(i) {
      this.type = i;
    }
  }
};
</script>
<style lang="scss" scoped>
.form {
  margin-bottom: 4rem;
}
</style>


