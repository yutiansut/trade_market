<template>
  <div
    id="app"
    class="wh-full"
  >
    <keep-alive>
      <transition name="el-fade">
        <router-view></router-view>
      </transition>
    </keep-alive>
  </div>
</template>
<style lang="scss">
@import "@/assets/css/common.scss";
@import "@/assets/css/element-variable.scss";
</style>
<script>
export default {
  name: "App"
};
</script>


