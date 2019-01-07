<template>
  <user-common>
    <h1 class="title font-36 txt-center">注册</h1>
    <div class="welcome font-16 txt-center">欢迎加入EXCHANGE</div>
    <el-form class="register-form">
      <form-input
        input-class='register-ipt'
        label='用户名'
        :is-required='true'
      ></form-input>
      <form-input
        input-class='register-ipt'
        label='密码'
        type='password'
        :is-required='true'
      ></form-input>
      <form-input
        input-class='register-ipt'
        label='确认密码'
        type='password'
        :is-required='true'
      ></form-input>
      <form-input
        input-class='register-ipt'
        label='邀请码（选填）'
        type='text'
      ></form-input>
      <el-checkbox v-model="checked">我已阅读并同意 <em class="color-primary">《用户协议》</em></el-checkbox>
      <button class="btn-large btn-block btn-hover btn-primary">注册</button>
      <p class="txt-center">已有账号？<router-link
          to='/user/login'
          class="color-primary"
        >立即登录</router-link>
      </p>
    </el-form>
  </user-common>
</template>
<script>
import UserCommon from "../../components/user/UserCommon.vue";
export default {
  name: "Register",
  components: {
    UserCommon
  }
};
</script>
<style lang="scss" scoped>
.title {
  margin-top: 40px;
}
.welcome {
  margin-top: 15px;
}
.register-form {
  width: 300px;
  margin: 50px auto 0;
  .register-ipt {
    margin-top: 30px;
    &:first-child {
      margin-top: 0;
    }
  }
  .el-checkbox {
    margin: 15px 0;
  }
  p {
    margin-top: 40px;
  }
}
</style>

