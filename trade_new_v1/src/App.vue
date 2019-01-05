<template>
  <div
    id="app"
    class="wh-full"
  >
    <router-view></router-view>
  </div>
</template>
<style lang="scss">
@import "@/assets/css/common.scss";
@import "@/assets/css/element-variable.scss";
#app {
  @include minWidth();
}
</style>
<script>
export default {
  name: "App"
};
</script>


