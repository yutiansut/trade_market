<template>
  <div class="app-main wh-full">
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
.van-tabs__nav--card {
  margin: 0 1rem;
}
.app-body {
  background: #fff;
}
</style>