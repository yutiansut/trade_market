<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full">
      <van-cell-group>
        <van-cell
          title="数量"
          title-class='color-666'
          value='100 USDT'
        ></van-cell>
        <van-cell
          title="金额"
          title-class='color-666'
          value='100 VIC'
        ></van-cell>
        <van-cell
          title="估价"
          title-class='color-666'
          value='100 USDT'
        ></van-cell>
        <van-cell
          title="方式"
          title-class='color-666'
          value='银行转账'
        ></van-cell>
      </van-cell-group>
      <div class="btn-wrap">
        <button
          class="btn btn-block btn-large btn-dark btn-radius"
          v-text="btnLabel"
        ></button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      btnLabel: "确定买入"
    };
  }
};
</script>
<style lang="scss" scoped>
.btn-wrap {
  padding: 0 15px;
  margin-top: 30px;
}
</style>