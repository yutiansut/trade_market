<template>
  <div class="app-body overflow-y">
    <div class="header flex flex-v-center flex-between">
      <div class="head-lf flex flex-v-center">
        <img
          class="logo"
          :src="logo"
        >
        <span class="font-bit-bold font-18">VIC</span>
      </div>
      <div class="head-rt">
        <span
          :style="{backgroundImage:'url('+iconBg_1+')'}"
          class="icon"
        ></span>
        <span
          :style="{backgroundImage:'url('+iconBg_2+')'}"
          class="icon"
        ></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      logo: require("@/assets/images/home/home_logo.png"),
      iconBg_1: require("@/assets/images/home/ewm.png"),
      iconBg_2: require("@/assets/images/home/sys.png")
    };
  },
  beforeMount() {}
};
</script>
<style lang="scss" scoped>
.header {
  padding: 1rem 3.3vw 0;
  background: #fff;
  .logo {
    width: 9.3vw;
    & + span {
      margin: 0.5rem;
    }
  }
  .head-rt {
    align-content: flex-end;
  }
  .icon {
    width: 2rem;
    height: 2rem;
    display: inline-block;
    background-size: cover;
    background-repeat: no-repeat;
    &:first-child {
      margin-right: 1.2rem;
    }
  }
}
</style>


