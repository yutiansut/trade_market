<template>
  <div class="wh-full app-main">
    <my-header></my-header>
    <transition name="van-slide-left">
      <router-view></router-view>
    </transition>
    <my-footer></my-footer>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>

</style>
