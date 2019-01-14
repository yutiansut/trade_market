<template>
  <div class="app-header p-rel flex flex-v-center">
    <img
      @click="onHeadClick"
      class="thumb-30 thumb-round"
      :src="iconLeft ||assetConfig.imgs.user_head_portrait"
    >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "app-header",
  props: {
    iconLeft: null
  },
  methods: {
    onHeadClick() {
      this.$emit("onHeadClick");
    }
  }
};
</script>
<style lang="scss" scoped>
.app-header {
  height: 4.5rem;
  padding: 0 1.25rem;
  background: #000;
}
</style>