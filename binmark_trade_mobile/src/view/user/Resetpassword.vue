<template>
  <div class="resetpassword">
    <div class="page-head font-26">重置密码</div>
    <form
      @submit.prevent
      class="reset-form"
    >
      <van-field
        type='password'
        v-model="password"
        autocomplete="off"
        placeholder="请输入新密码"
      />
      <van-field
        type='password'
        autocomplete="off"
        v-model="repassword"
        placeholder="请再次输入密码"
      />
      <van-field
        v-model="account"
        autocomplete="off"
        :placeholder="type==0?'请输入手机号':'请输入邮箱'"
      >
        <van-button
          size='small'
          slot="button"
          class="p-rel"
          @click='onTypeChange'
        >
          <img
            class="fl p-abs abs-v-center icon-arrow"
            :src="assetConfig.imgs.arrow_exchange"
          >
          <span
            class="color-primary font-12"
            v-text="type==0?'邮箱验证':'手机验证'"
          ></span>
        </van-button>
      </van-field>
      <div
        v-show='type==0'
        class="input-wrap flex flex-between font-14"
      >
        <input
          autocomplete="off"
          v-model="code"
          type="text"
          placeholder="手机验证码"
        >
        <span
          @click="sendCode"
          class="color-primary "
        >{{codeText}}</span>
      </div>
      <div
        v-show='type==1'
        class="input-wrap flex flex-between font-14"
      >
        <input
          v-model="code"
          autocomplete="off"
          type="text"
          placeholder="邮箱验证码"
        >
        <span
          @click="sendCode"
          class="color-primary "
        >{{codeText}}</span>
      </div>
      <div class="van-hairline--bottom"></div>
      <button
        :disabled='disabled'
        @click="onSubmit"
        class="btn-submit btn-block btn-primary btn-large btn-default riple"
      >重置</button>
    </form>
  </div>
</template>
<script>
import { resetPassword, sendCode } from "@/vuexStore/storeService";
import { verCodeMixin } from "@/mixin/mixin.js";
export default {
  mixins: [verCodeMixin],
  data() {
    return {
      type: 0,
      account: "",
      password: "",
      repassword: ""
    };
  },
  computed: {
    disabled() {
      if (!this.account || !this.password || !this.repassword || !this.code) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    validate() {
      if (!this.Util.isPassword(this.password)) {
        this.$toast({
          message: "密码必须为6-12为字母开头字符",
          position: "bottom"
        });
        return false;
      }
      if (this.password != this.repassword) {
        this.$toast({
          message: "两次输入密码不匹配",
          position: "bottom"
        });
        return false;
      }
      if (
        !this.Util.isPhone(this.account) &&
        !this.Util.isEmail(this.account)
      ) {
        this.$toast({
          message: "邮箱或者手机号格式不正确",
          position: "bottom"
        });
        return false;
      }
      return true;
    },
    sendCode() {
      if (
        !this.Util.isPhone(this.account) &&
        !this.Util.isEmail(this.account)
      ) {
        this.$toast({
          message: "邮箱或者手机号格式不正确",
          position: "bottom"
        });
        return;
      }
      this.timeCountDown();

      sendCode(this.account, this.type == 0 ? 2 : 3).then(res => {
        if (res) {
          this.$toast({
            message: res.msg,
            position: "bottom"
          });
        }
      });
    },
    onSubmit() {
      if (this.validate()) {
        resetPassword({
          ...this.$data
        }).then(res => {
          this.$toast({
            message: res.msg,
            position: "bottom"
          });
          this.navigateTo("/userentry/login");
        });
      }
    },
    onTypeChange() {
      this.type = this.type == 0 ? 1 : 0;
    }
  }
};
</script>
<style lang="scss" scoped>
.reset-form {
  margin-top: 4.5rem;
  .input-wrap {
    margin-top: 1.5rem;
    line-height: 4rem;
  }
  .van-cell {
    margin-top: 1.5rem;
  }
  .btn-submit {
    margin-top: 4rem;
  }
  .van-button {
    padding-left: 2.5rem;
    border-color: $color-primary;
  }
  .icon-arrow {
    width: 1.2rem;
    left: 0.5rem;
  }
}
</style>
