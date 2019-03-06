<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full">
      <van-cell-group>
        <van-field
          v-model="phone"
          placeholder='输入注册时的手机号'
          label='手机号'
        ></van-field>
        <van-field
          v-model="oldPassword"
          placeholder='输入原密码'
          type='password'
          label='原密码'
        ></van-field>
        <van-field
          v-model="newPassword"
          placeholder='请输入新密码'
          type='password'
          label='新密码'
        ></van-field>
        <van-field
          v-model="reNewPassword"
          placeholder='请再次输入新密码'
          type='password'
          label='重复新密码'
        ></van-field>
        <van-field
          v-model="code"
          placeholder='请输入验证码'
          label='验证码'
        >
          <span
            @click='getCode'
            slot="button"
            v-text="codeText"
          ></span>
        </van-field>
      </van-cell-group>
      <button
        @click='saveChange'
        :disabled="disabled"
        class="btn-block btn-radius btn-active btn-dark btn-large"
      >保存修改</button>
    </div>
  </div>
</template>
<script>
import { verCodeMixin } from "@/mixins/mixins.js";
import { modifyLoginPass, getSmsCode } from "@/vuexStore/commonController.js";
export default {
  mixins: [verCodeMixin],
  data() {
    return {
      phone: "",
      oldPassword: "",
      newPassword: "",
      reNewPassword: ""
    };
  },
  computed: {
    disabled() {
      if (
        !this.phone ||
        !this.oldPassword ||
        !this.newPassword ||
        !this.reNewPassword ||
        !this.code
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    validate() {
      let code = 0,
        msg = "";
      if (!this.Validate.isPhone(this.phone)) {
        code = 1;
        msg = "手机号码格式不正确";
      } else if (this.newPassword !== this.reNewPassword) {
        code = 1;
        msg = "两次输入密码不匹配";
      }
      return { code, msg };
    },
    getCode() {
      if (!this.Validate.isPhone(this.phone)) {
        this.$toast("请输入正确的手机号");
        return;
      }
      if (!this.canGetCode) return;
      getSmsCode(this.phone, 3).then(res => {
        this.timeCountDown();
      });
    },
    saveChange() {
      let { code, msg } = this.validate();
      if (code != 0) {
        this.$toast(msg);
        return;
      }
      modifyLoginPass(
        this.oldPassword,
        this.phone,
        this.newPassword,
        this.code
      ).then(res => {
        if (res) this.$router.go("-1");
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.app-body {
  padding: 0 1rem;
}
.van-cell-group {
  margin: 1rem -1rem 3.5rem -1rem;
}
</style>