<template>
  <div class="register user-entry">
    <account-head
      to='/userentry/login'
      linkLabel='已有账号？'
    ></account-head>
    <div class="page-head font-bold">
      <span class="font-20">注册</span>
      <span class="font-18">VIC&nbsp;&nbsp;tribe</span>
    </div>
    <p class="label font-14 color-666">
      您可以使用VIC tribe账号/邮箱账号进行注册
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
            type="password"
            placeholder="请输入密码"
          >
        </van-col>
        <van-col span='4'>
          <i class="iconfont font-24 icon-icon_eye-close"></i>
        </van-col>
      </van-row>
      <van-row>
        <van-col span='6'>确认密码</van-col>
        <van-col span='14'>
          <input
            v-model="repassword"
            autocomplete='off'
            type="password"
            placeholder="请再次输入密码"
          >
        </van-col>
        <van-col span='4'>
          <i class="iconfont font-24 icon-icon_eye-close"></i>
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
    <button class="btn-block btn-large btn-default btn-active btn-round">注册</button>
    <div class="terms font-16">
      <p class="color-999 font-14">点击“注册”按钮即表示您同意</p>
      <a href="">服务条款</a><a href="">风险与合规披露</a><a href="">隐私政策声明</a>
    </div>
  </div>
</template>
<script>
import accountHead from "@/components/account/accountHead";
import { verCodeMixin } from "@/mixins/mixins.js";
export default {
  components: { accountHead },
  mixins: [verCodeMixin],
  data() {
    return {
      tabItem: ["手机号", "邮箱"],
      type: 0,
      account: "",
      password: "",
      repassword: ""
    };
  },
  methods: {
    onTabChange(i) {
      this.type = i;
    },
    getCode() {
      this.timeCountDown();
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-block {
  margin-top: 4.5vh;
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
