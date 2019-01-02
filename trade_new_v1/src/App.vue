<template>
  <div
    id="app"
    class="p-rel wh-full"
  >
    <keep-alive>
      <transition name="slide-left">
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


