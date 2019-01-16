<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body van-hairline--top h-full">
      <dl class="statement overflow-y h-full">
        <dt class="font-18 font-bold">交易须知</dt>
        <dd>1、转让后获得相应的CNY</dd>
        <dd>2、转让获得的CNY可以提现至您指定的账户内，最低提现金额为100。</dd>
        <dd>3、转让是直接扣除您在本平台的相应代币的数量。</dd>
        <dd>4、本平台仅提供收购各类币种，转让后无法取消操作。</dd>
      </dl>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.statement {
  padding: 1rem;
  background: #fff;
  dt {
    line-height: 2.5;
  }
  dd {
    font-size: 1.25rem;
    line-height: 2;
  }
}
</style>