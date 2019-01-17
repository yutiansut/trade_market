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
    <button class="btn-submit btn-block btn-primary btn-large btn-default riple">注册</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      password: "password",
      repassword: "repassword"
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == "Register_1") {
      next();
    } else {
      next({ path: "/userentry/register" });
    }
  },
  methods: {
    onSubmit() {}
  }
};
</script>