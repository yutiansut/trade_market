<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <router-view></router-view>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.van-tabs__nav--card {
  margin: 0 1rem;
}

.container {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
}
</style>