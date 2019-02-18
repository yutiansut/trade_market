<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full">
      <div class="order-info">
        <van-cell
          title="数量"
          title-class='color-666'
          value='100 余额'
        ></van-cell>
        <van-cell
          title="金额"
          title-class='color-666'
          value='100 CNY'
        ></van-cell>
        <van-cell
          title="估价"
          title-class='color-666'
          value='4849 CNY'
        ></van-cell>
      </div>
      <div class="container">
        <div class="input-group">
          <span class="label font-14">交易密码</span>
          <van-field
            :border='false'
            placeholder='请输入交易密码'
          ></van-field>
          <div class="van-hairline--top"></div>
        </div>
        <button class="btn-block btn-large btn-dark btn-radius">确定下单</button>
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.order-info {
  background: #fff;
  margin-top: $gap;
}
.container {
  background: #fff;
  margin-top: $gap;
  padding: $gap;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  .label {
    color: #444;
  }
  .van-field {
    padding-left: 0;
    padding-right: 0;
    margin-top: 8px;
  }
}
</style>