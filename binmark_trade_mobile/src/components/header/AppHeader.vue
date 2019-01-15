<template>
  <div class="app-header p-rel flex flex-v-center flex-between">
    <img
      :style="{visibility:iconLeft?'visable':'hidden'}"
      @click="onHeadClick"
      class="thumb-30 thumb-round"
      :src="iconLeft"
    >
    <slot name='title'></slot>
    <div class="header-rt">
      <slot name="right"></slot>
    </div>
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