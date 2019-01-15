<template>
  <div class="entrust-detail app-main">
    <my-header></my-header>
    <div class="van-hairline--top"></div>
    <div class="app-body overflow-y">
      <div class="detail">
        <div class="detail-head">
          <div class="coin font-17 font-bold">
            <span>BTC/</span>
            <span class="color-999">USDT</span>
          </div>
          <div class="type color-success">撤单</div>
        </div>
        <div class="van-hairline--top"></div>
        <van-row class="h-45 font-14 flex flex-v-center">
          <van-col
            span='8'
            class="color-999"
          >成交量/数量</van-col>
          <van-col
            span='16'
            class="txt-rt"
          >0.200202/11646546</van-col>
        </van-row>
        <van-row class="h-45 font-14 flex flex-v-center">
          <van-col
            span='8'
            class="color-999"
          >均价/单价</van-col>
          <van-col
            span='16'
            class="txt-rt"
          >0.200202/11646546</van-col>
        </van-row>
        <van-row class="h-45 font-14 flex flex-v-center">
          <van-col
            span='8'
            class="color-999"
          >应收手续费</van-col>
          <van-col
            span='16'
            class="txt-rt"
          >11646546</van-col>
        </van-row>
        <van-row class="h-45 font-14 flex flex-v-center">
          <van-col
            span='8'
            class="color-999"
          >实收手续费</van-col>
          <van-col
            span='16'
            class="txt-rt"
          >11646546</van-col>
        </van-row>
        <van-row class="h-45 font-14 flex flex-v-center">
          <van-col
            span='8'
            class="color-999"
          >成交金额</van-col>
          <van-col
            span='16'
            class="txt-rt"
          >11646546</van-col>
        </van-row>
        <van-row class="h-45 font-14 flex flex-v-center">
          <van-col
            span='8'
            class="color-999"
          >实际到账</van-col>
          <van-col
            span='16'
            class="txt-rt"
          >11646546</van-col>
        </van-row>
      </div>
      <!-- 成交记录 -->
      <div class="trade-record">
        <div class="title font-16 font-bold">成交记录</div>
        <van-cell-group>
          <van-cell
            title-class='font-15'
            label-class='label color-999'
            value-class='font-16'
            title="0.048ETH"
            value="188"
            label="2012/7/7"
          />
        </van-cell-group>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style <style lang="scss" scoped>
.detail {
  padding: 0 1rem;
  background: #fff;
  .detail-head {
    padding: 1.25rem 0;
  }
  .coin {
    margin-bottom: 0.5rem;
  }
}
.trade-record {
  margin-top: 1.25rem;
  background: #fff;
  .title {
    @include textVcenter(45px);
    margin-bottom: 0.5rem;
  }
  padding: 1rem;
  .van-cell {
    padding: 1rem;
  }
}
</style>

