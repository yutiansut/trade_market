<template>
  <div class="container h-full">
    <div class="content van-hairline--top h-full">
      <div class="flex flex-between flex-v-center">
        <img
          class="thumb-40 thumb-round"
          :src="assetConfig.imgs.user_head_portrait"
        >
        <span class="font-15">15623454605</span>
      </div>
    </div>
    <div class="btn-group">
      <button class="btn-primary btn-large btn-block">退出登录</button>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.content {
  padding: 1rem 1rem 0 1rem;
}
.btn-group {
  padding: 0 1rem 1rem;
}
</style>