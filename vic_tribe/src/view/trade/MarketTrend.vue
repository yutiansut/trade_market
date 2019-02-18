<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body overflow-y h-full">
      <div class="k-map van-hairline--bottom">
        <div class="k-map-header flex flex-between">
          <span class="font-15 font-bold">行情（H）</span>
          <div class="market-val font-12 color-666">
            市值（$）<span class="color-danger">0.38</span>
            市值（￥）<span class="color-danger">0.38</span>
          </div>
        </div>
        <div class="k-map-container"></div>
      </div>
      <div class="k-map van-hairline--bottom">
        <div class="k-map-header flex flex-between">
          <span class="font-15 font-bold">交易量（V）</span>
          <div class="market-val font-12 color-666">
            市值（$）<span class="color-danger">0.38</span>
            市值（￥）<span class="color-danger">0.38</span>
          </div>
        </div>
        <div class="k-map-container"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
$gap: 1rem;
.app-body {
  margin-top: 1rem;
  background: #fff;
}
.k-map {
  padding-bottom: $gap;
}
.k-map-header {
  @include textVcenter(45px);
  padding: 0 $gap;
}
.market-val {
  span:first-child {
    margin-right: $gap;
  }
}
</style>