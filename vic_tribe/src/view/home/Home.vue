<template>
  <div class="app-body overflow-y">
    <div class="header flex flex-v-center">
      <img
        class="logo"
        :src="logo"
      >
      <span class="font-bit-bold font-18">VIC</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      logo: require("@/assets/images/home/home_logo.png")
    };
  },
  beforeMount() {}
};
</script>
<style lang="scss" scoped>
.header {
  padding: 0 3.3vw;
  .logo {
    width: 9.3vw;
  }
}
</style>


