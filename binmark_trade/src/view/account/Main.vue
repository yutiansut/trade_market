<template>
    <div class="main wh-full">
        <my-header class="header-main">
            <login-bar></login-bar>
        </my-header>
        <div class="container">
            <router-view></router-view>
        </div>
        <my-footer></my-footer>
    </div>
</template>
<style lang="scss" scoped>
.container {
  min-height: calc(100% - 294px);
  padding: 30px 0;
  width: 77%;
  margin: 0 auto;
}
</style>
<script>
export default {
  data() {
    return {};
  },
};
</script>
