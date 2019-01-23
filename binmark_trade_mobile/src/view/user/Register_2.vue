<template>
  <form @submit.prevent='onSubmit'>
    <van-field
      autocomplete="off"
      type='password'
      v-model="password"
      placeholder="请输入密码"
    />
    <van-field
      autocomplete="off"
      type='password'
      v-model="repassword"
      placeholder="请再次输入密码"
    />
    <button
      :disabled='disabled'
      class="btn-submit btn-block btn-primary btn-large btn-default riple"
    >注册</button>
  </form>
</template>
<script>
import { Register } from "../../vuexStore/storeService.js";
export default {
  data() {
    return {
      password: "",
      repassword: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == "Register_1") {
      next();
    } else {
      next({ path: "/userentry/register" });
    }
  },
  computed: {
    disabled() {
      if (!this.password || !this.repassword) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    valide() {
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
      return true;
    },
    onSubmit() {
      if (this.valide()) {
        Register({ ...this.$route.query, password: this.password }).then(
          res => {
            if (res) {
              this.$toast({
                message: res.msg,
                position: "bottom"
              });
              this.navigateTo("/userentry/login");
            }
          }
        );
      }
    }
  }
};
</script>