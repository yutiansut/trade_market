<template>
  <div class="log-list van-hairline--top overflow-y h-full">
    <div class="log van-hairline--bottom">
      <div class="flex flex-between">
        <span class="title font-15 font-bold">成功</span>
        <span class="color-666 font-14">192.168.1.12</span>
      </div>
      <div class="color-999 flex flex-between font-14">
        <span>2018-10-11 17:23:50</span>
        <span>cn</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.log-list {
  background: #fff;
}
.log {
  padding: 1.25rem 1rem;
  .title {
    margin-bottom: 1rem;
    line-height: 2rem;
  }
}
</style>