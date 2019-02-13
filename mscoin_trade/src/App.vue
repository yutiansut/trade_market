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
  name: "App",
  beforeRouteEnter(to, from, next) {
    if(/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){  //测试当前是哪个手机系统，可根据业务需要选择
        console.log("现在是手机端")
    }else {
        console.log("现在是PC端")
    }
  }
};
</script>

