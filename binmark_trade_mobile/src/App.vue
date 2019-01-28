<template>
  <div
    :style="{height:appHeight+'px'}"
    id="app"
  >
    <keep-alive>
      <transition name="van-fade">
        <router-view></router-view>
      </transition>
    </keep-alive>
  </div>
</template>
<style lang="scss">
@import "@/assets/css/public.scss";
</style>

<script>
export default {
  name: "App",
  data() {
    return {
      appHeight: ""
    };
  },
  mounted() {
    this.appHeight = window.screen.height;
  }
};
</script>

