<template>
  <user-common>
    <h1 class="title font-36 txt-center">登录</h1>
    <div class="welcome font-16 txt-center">欢迎来到EXCHANGE</div>
    <el-form
      @submit.native.prevent
      class="login-form"
    >
      <form-input
        input-class='login-ipt'
        label='用户名'
        :is-required='true'
      ></form-input>
      <form-input
        input-class='login-ipt'
        label='密码'
        type='password'
        :is-required='true'
      ></form-input>
      <button class="btn-large btn-block btn-hover btn-primary">登录</button>
      <p class="flex flex-between">
        <router-link
          class="color-primary"
          to=''
        >忘记密码</router-link>
        <span>
          <em class="color-666">没有账号？</em>
          <router-link
            class="color-primary"
            to=''
          >注册</router-link>
        </span>
      </p>
    </el-form>
  </user-common>
</template>
<script>
import UserCommon from "../../components/user/UserCommon.vue";
export default {
  components: {
    UserCommon
  }
};
</script>
<style lang="scss" scoped>
.welcome {
  margin-top: 15px;
}
.title {
  margin-top: 100px;
}
.login-form {
  display: block;
  width: 300px;
  margin: 50px auto 0;
  .login-ipt {
    margin-top: 30px;
    &:first-child {
      margin-top: 0;
    }
  }
  p {
    margin-top: 15px;
  }
  button {
    margin-top: 40px;
  }
}
</style>
