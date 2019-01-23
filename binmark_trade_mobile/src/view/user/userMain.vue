// 登录注册
<template>
  <div class="wh-full app-main">
    <my-header titleText=""></my-header>
    <div class="account-main wh-full">
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
  background: #fff;
}
</style>
