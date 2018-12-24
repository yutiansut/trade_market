<template>
  <div class="header van-hairline--bottom">
    <van-nav-bar
      :title="$store.state.headerTitle"
      :right-text="rightText"
      :left-arrow='$store.state.showHeaderBack'
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>
<script>
export default {
  name: "my-header",
  props: ["rightText"],
  data() {
    return {
      canBack: false
    };
  },
  methods: {
    onClickRight() {
      this.$emit("onHeaderRtClick");
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
.van-nav-bar {
  font-size: 1.4em;
  .van-icon {
    color: #333;
  }
}
</style>
