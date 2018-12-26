<template>
  <div
    v-if="$store.state.showMainHeader"
    class="header"
  >
    <van-nav-bar
      :title="$store.state.headerTitle"
      :right-text="rightText"
      :left-arrow='$store.state.showHeaderBack'
      :border='false'
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>
<script>
export default {
  name: "my-header",
  props: ["rightText", "showHeader", "showArrow"],
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

<style lang="scss">
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
