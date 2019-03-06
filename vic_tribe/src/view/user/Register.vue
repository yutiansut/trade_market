<template>
  <div class="register user-entry">
    <account-head
      to='/userentry/login'
      linkLabel='已有账号？'
    ></account-head>
    <div class="page-head font-bold">
      <span class="font-20">注册</span>
    </div>
    <p class="label font-14 color-666">
      您可以使用手机号进行注册
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
            class="iconfont font-24"
            @touchend="toggleVisiable"
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
            @touchend="toggleVisiable"
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
            @touchend='getCode'
            v-text="codeText"
          ></span>
        </van-col>
      </van-row>
      <van-row v-show="type=='0'">
        <van-col
          class="font-16"
          span='6'
        >推荐人</van-col>
        <van-col
          class="font-16"
          span='18'
        >
          <input
            v-model="parentPhone"
            autocomplete='off'
            type="text"
            placeholder="请输入推荐人手机号"
          >
        </van-col>
      </van-row>
    </form>
    <button
      @touchend='onSubmit'
      class="btn-block btn-large btn-default btn-active btn-round"
    >注册</button>
    <!-- <div class="terms font-16">
      <p class="color-999 font-14">点击“注册”按钮即表示您同意</p>
      <a href="">服务条款</a><a href="">风险与合规披露</a><a href="">隐私政策声明</a>
    </div> -->
  </div>
</template>
<script>
import accountHead from "@/components/account/accountHead";
import { verCodeMixin, passwordVisable } from "@/mixins/mixins.js";
import { Register, getSmsCode } from "@/vuexStore/commonController.js";
export default {
  components: { accountHead },
  mixins: [verCodeMixin, passwordVisable],
  data() {
    return {
      // tabItem: ["手机号", "邮箱"],
      type: 0,
      account: "",
      password: "",
      repassword: "",
      parentPhone: ""
    };
  },
  mounted() {
    let { parentPhone } = this.$route.query;
    parentPhone && (this.parentPhone = parentPhone);
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
      if (this.password !== this.repassword) {
        msg = "两次密码不一致";
        code = 1;
        return { code, msg };
      }

      if (!this.code) {
        msg = "短信验证码不能为空";
        code = 1;
        return { code, msg };
      }
      if (this.parentPhone == "") {
        msg = "请输入推荐码";
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
      Register(this.account, this.password, this.code, this.parentPhone).then(
        res => {
          if (res) this.navigateTo("/userentry/login");
        }
      );
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
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-block {
  margin-top: 6vh;
  margin-bottom: 1rem;
}
.terms {
  color: #f5f5f5;
  line-height: 1.6;
  a {
    text-decoration: underline;
    margin-right: 1.2rem;
  }
}
</style>
