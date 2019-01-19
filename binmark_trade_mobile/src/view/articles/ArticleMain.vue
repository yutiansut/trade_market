<template>
  <div class="app-main h-full">
    <my-header></my-header>
    <div class="app-body overflow-y h-full">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.app-body {
  background: #fff;
}
</style>