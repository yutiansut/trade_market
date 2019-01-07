<template>
  <transition name="el-fade-in-linear">
    <router-view></router-view>
  </transition>
</template>
<style lang="scss">
@import "@/assets/css/variable.scss";
@import "@/assets/css/element-ui-reset.scss";
@import "@/assets/css/header/headerReset.scss";
@import "@/assets/css/header/headerDefault.scss";
</style>
<script>
export default {
  name: "App"
};
</script>

