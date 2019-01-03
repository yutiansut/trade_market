<template>
  <div class="header h-50">
    <div class="header-in flex flex-between">
      <slot name="navBar"></slot>
      <slot name="statusBar"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "my-header"
};
</script>
<style lang="scss">
.header {
  background-color: $bg-dark;
  .header-in {
    width: $content-width;
    margin: 0 auto;
    height: 100%;
  }
}
</style>
