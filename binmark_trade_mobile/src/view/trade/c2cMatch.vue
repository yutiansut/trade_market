<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body overflow-y">
      <div class="order-list">
        <dl class="order">
          <dt class="font-bold flex flex-between">
            <span class="font-16">你是YY</span>
            <span class="status color-danger">进行中</span>
          </dt>
          <dd class="flex flex-between">
            <div>
              <span class="color-999">价格&nbsp;&nbsp;</span>
              <span>116515651</span>
            </div>
            <div>
              <span class="color-danger">213265&nbsp;&nbsp;</span>
              <span class="color-999">成交</span>
            </div>
          </dd>
          <dd class="flex flex-between">
            <div>
              <span class="color-999">数量&nbsp;&nbsp;</span>
              <span>6385</span>
            </div>
            <div>
              <span class="color-danger">2017/7/7&nbsp;&nbsp;</span>
              <span class="color-999">限额</span>
            </div>
          </dd>
          <dd class="total van-hairline--bottom">
            <span class="color-666">总计&nbsp;&nbsp;</span>
            <span>18095.92 CNY</span>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.order-list {
  margin-top: 1rem;
  overflow: hidden;
  padding: 0 1rem;
  background: #fff;
  .order {
    dt {
      @include textVcenter(30px);
      margin-top: 1rem;
    }
    dd {
      margin-top: 2rem;
      font-size: 1.25rem;
    }
    .total {
      padding-bottom: 1.25rem;
    }
    .status {
      font-size: 1.25rem;
    }
  }
}
</style>