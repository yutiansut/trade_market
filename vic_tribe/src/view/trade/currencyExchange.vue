<template>
  <div class="wh-full app-main">
    <my-header
      @onHeaderRtClick="navigateTo('/record')"
      right-text="转换记录"
    ></my-header>
    <div class="app-body overflow-y">
      <form
        action=""
        @submit.prevent='onSubmit'
      >
        <van-cell-group>
          <van-field
            label='可用余额'
            placeholder="可用余额"
          />
          <van-field
            label='余额数量'
            placeholder="请输入余额数量"
          />
          <van-field
            label='兑换数量'
            placeholder="请输入兑换数量"
          />
          <van-field
            autocomplete='false'
            label='支付密码'
            placeholder="请输入支付密码"
            type='password'
          />
        </van-cell-group>
        <p class="color-666 tips font-12">*新用户默认支付密码为：123456，请在账户设置中更改</p>
        <button class="btn-block btn-large btn-dark btn-active btn-radius">确认兑换</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onSubmit() {}
  }
};
</script>

<style lang="scss" scoped>
.tips {
  margin-top: 1.5rem;
  padding: 0 1rem;
}
form {
  margin-top: 1rem;
  button {
    margin-top: 3rem;
    margin-left: auto;
    margin-right: auto;
    width: calc(100% - 2rem);
  }
}
</style>