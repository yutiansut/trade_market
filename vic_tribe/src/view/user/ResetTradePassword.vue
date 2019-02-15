<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full">
      <div class="tips font-12 color-666">*&nbsp;新用户默认支付密码为：123456</div>
      <van-cell-group>
        <van-field
          placeholder='请输入新密码'
          label='新密码'
        ></van-field>
        <van-field
          placeholder='请再次输入新密码'
          label='重复新密码'
        ></van-field>
        <van-field
          placeholder='请输入验证码'
          label='验证码'
        >
          <span slot="button">获取验证码</span>
        </van-field>
      </van-cell-group>
      <button class="btn-block btn-radius btn-active btn-dark btn-large">完成</button>
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
.tips {
  @include textVcenter(3rem);
}
.app-body {
  padding: 0 1rem;
}
.van-cell-group {
  margin: 0 -1rem 3.5rem -1rem;
}
</style>