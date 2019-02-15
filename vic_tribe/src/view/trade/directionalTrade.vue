<template>
  <div class="wh-full app-main">
    <my-header></my-header>
    <div class="app-body overflow-y">
      <van-tabs
        color='#333'
        v-model="active"
      >
        <van-tab title="定向交易">
          <form
            action=""
            @submit.prevent='onSubmit'
          >
            <van-cell-group>
              <van-field
                label='对方账号'
                placeholder="请输入对方账号"
              />
              <van-field
                label='转账数量'
                placeholder="请输入转账金额数量"
              />
              <van-field
                autocomplete='false'
                label='支付密码'
                placeholder="请输入支付密码"
                type='password'
              />
            </van-cell-group>
          </form>
          <p class="color-666 tips font-12">*新用户默认支付密码为：123456，请在账户设置中更改</p>
          <button class="btn-block btn-large btn-dark btn-active btn-radius">确认转账</button>
        </van-tab>
        <van-tab title="交易中"></van-tab>
        <van-tab title="已完成">
          <van-cell-group :border='false'>
            <van-cell
              title="2018-1-2"
              value="cjl123456"
              is-link
            />
            <van-cell
              title="2018-1-2"
              value="cjl123456"
              is-link
            />
          </van-cell-group>
        </van-tab>
      </van-tabs>
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
}
button.btn-block {
  margin-top: 3rem;
  margin-left: auto;
  margin-right: auto;
  width: calc(100% - 2rem);
}
.van-cell-group {
  margin-top: 1rem;
}
</style>
