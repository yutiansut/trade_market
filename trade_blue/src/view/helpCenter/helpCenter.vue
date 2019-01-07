<template>
  <div class="main wh-full">
    <my-header class="header-main">
      <login-bar></login-bar>
    </my-header>
    <div class="content">
      <router-view></router-view>
    </div>
    <my-footer></my-footer>
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
.content {
  min-height: calc(100% - 294px);
}
</style>
