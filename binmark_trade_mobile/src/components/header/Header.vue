<template>
  <div
    v-if="Store.state.showMainHeader"
    class="header"
  >
    <van-nav-bar
      :title="Store.state.headerTitle"
      :right-text="rightText"
      :left-arrow='Store.state.showHeaderBack'
      :border='false'
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>
<script>
export default {
  name: "my-header",
  props: ["rightText", "showHeader", "showArrow", "titleText"],
  data() {
    return {
      canBack: false
    };
  },
  mounted() {},
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

<style lang="scss" scoped>
.van-nav-bar {
  font-size: 1.4em;
  .van-icon {
    color: #333;
  }
  .van-nav-bar__text {
    color: #666;
  }
  .van-ellipsis {
    font-size: 1.6rem;
    font-weight: 600;
  }
}
</style>
