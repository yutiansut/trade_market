// 登录注册主页面
<template>
  <div class="wh-full">
    <my-header titleText=""></my-header>
    <div class="account-main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.account-main {
  padding: 2.7vh 8vw 0 8vw;
  box-sizing: border-box;
}
</style>
