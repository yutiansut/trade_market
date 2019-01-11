// 登录注册主页面
<template>
  <div
    :style="{backgroundImage:'url('+bg+')'}"
    class="wh-full account-main"
  >
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bg: require("@/assets/images/login/bj.png")
    };
  }
};
</script>
<style lang="scss" scoped>
.account-main {
  background-color: #333;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 2.7vh 8vw 0 8vw;
  box-sizing: border-box;
}
</style>
