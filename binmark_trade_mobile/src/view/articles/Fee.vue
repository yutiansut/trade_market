<template>
  <div class="fee-container van-hairline--top h-full">
    <dl class="van-hairline--bottom">
      <dt class="font-16 font-bold">USDT</dt>
      <dd class="flex flex-between">
        <span class="label font-15 color-999">交易手续费</span>
        <span class="font-13">0011</span>
      </dd>
      <dd class="flex flex-between">
        <span class="label font-15 color-999">提币手续费</span>
        <span class="font-13">0011</span>
      </dd>
      <dd class="flex flex-between">
        <span class="label font-15 color-999">提币单笔最低</span>
        <span class="font-13">0011</span>
      </dd>
      <dd class="flex flex-between">
        <span class="label font-15 color-999">提币单日最大</span>
        <span class="font-13">0011</span>
      </dd>
    </dl>
    <dl class="van-hairline--bottom">
      <dt class="font-16 font-bold">USDT</dt>
      <dd class="flex flex-between">
        <span class="label font-15 color-999">交易手续费</span>
        <span class="font-13">0011</span>
      </dd>
      <dd class="flex flex-between">
        <span class="label font-15 color-999">提币手续费</span>
        <span class="font-13">0011</span>
      </dd>
      <dd class="flex flex-between">
        <span class="label font-15 color-999">提币单笔最低</span>
        <span class="font-13">0011</span>
      </dd>
      <dd class="flex flex-between">
        <span class="label font-15 color-999">提币单日最大</span>
        <span class="font-13">0011</span>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.fee-container {
  padding-left: 1rem;
  dl {
    padding-bottom: 1rem;
  }
  dt {
    @include textVcenter(45px);
  }
  dd {
    @include textVcenter(35px);
    padding-right: 1rem;
  }
}
</style>