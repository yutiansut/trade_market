<template>
  <div class="container h-full van-hairline--top">
    <form class="form">
      <div class="form-group">
        <div class="label color-666 font-14">邮箱</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            v-model="email"
            autocomplete="off"
            class="h-35"
            placeholder="请输入邮箱"
          >
          <span
            @click="sendCode"
            class="message-code"
            v-text="codeText"
          ></span>
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">邮箱验证码</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            v-model="code"
            autocomplete="off"
            class="h-35"
            placeholder="请输入验证码"
          >
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">登录密码</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            v-model="password"
            autocomplete="off"
            class="h-35"
            type='password'
            placeholder="请输入登录密码"
          >
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">图形验证码</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            v-model="imgCode"
            autocomplete="off"
            class="h-35"
            placeholder="请输入图形验证码"
          >
          <span
            @click="createCode(verCodeNumArr,4)"
            class="code-wrap"
          >
            <ver-code
              :contentHeight='35'
              :identifyCode='verCodeStr'
            >
            </ver-code>
          </span>
        </div>
      </div>
    </form>
    <div class="btn-group">
      <button
        :disabled="disabled"
        @click="onSubmit"
        class="btn-large btn-block riple btn-primary"
      >确定</button>
    </div>
  </div>
</template>
<script>
import { verCodeMixin, imgCodeMixin } from "@/mixin/mixin.js";
import { sendCode, bindEmail } from "../../vuexStore/storeService.js";
import verCode from "@/components/other/verCode";
export default {
  components: { verCode },
  mixins: [verCodeMixin, imgCodeMixin],
  data() {
    return {
      email: "",
      password: "",
      imgCode: ""
    };
  },
  mounted() {
    this.createCode(this.verCodeNumArr, 4);
  },
  computed: {
    disabled() {
      if (!this.email || !this.password || !this.imgCode || !this.code) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    validate() {
      if (!this.Util.isEmail(this.email)) {
        this.$toast({
          message: "邮箱格式不正确"
        });
        return false;
      }
      if (!this.code) {
        this.$toast({
          message: "验证码不能为空"
        });
        return false;
      }
      if (!this.Util.isPassword(this.password)) {
        this.$toast({
          message: "密码必须以字母开头的6-12位字符"
        });
        return false;
      }
      if (!this.formData.imgCode) {
        this.$toast({
          message: "图形验证码不能为空"
        });
        return false;
      }
      if (this.formData.imgCode != this.verCodeStr) {
        this.$toast({
          message: "图形验证码不正确"
        });
        return false;
      }
      return true;
    },
    onSubmit() {
      if (this.validate()) {
        bindEmail({
          code: this.code,
          password: this.password,
          email: this.email
        }).then(res => {
          if (res) this.navigateTo("/account");
        });
      }
    },
    sendCode() {
      this.timeCountDown();
      sendCode(this.email, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.form-group {
  margin-top: 1rem;
}
.message-code {
  color: $color-info;
  border-radius: 45px;
}
.code-wrap {
  line-height: normal;
}
.btn-group {
  padding: 1rem;
}
</style>