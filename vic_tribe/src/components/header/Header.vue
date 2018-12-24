<template>
  <div class="header">
    <van-nav-bar
      :title="$store.state.headerTitle"
      :right-text="rightText"
      :left-arrow='true'
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
    onClickLeft() {}
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
