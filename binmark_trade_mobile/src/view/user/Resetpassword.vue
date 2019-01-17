<template>
  <div class="resetpassword">
    <div class="page-head font-26">重置密码</div>
    <form
      @submit.prevent='onSubmit'
      class="reset-form"
    >
      <van-field
        type='password'
        v-model="account"
        autocomplete="off"
        placeholder="请输入新密码"
      />
      <van-field
        type='password'
        autocomplete="off"
        v-model="password"
        placeholder="请再次输入密码"
      />
      <van-field
        v-model="account"
        autocomplete="off"
        :placeholder="type==0?'请输入手机号':'请输入邮箱'"
      >
        <van-button
          size='small'
          slot="button"
          class="p-rel"
          @click='onTypeChange'
        >
          <img
            class="fl p-abs abs-v-center icon-arrow"
            :src="assetConfig.imgs.arrow_exchange"
          >
          <span
            class="color-primary font-12"
            v-text="type==0?'手机注册':'邮箱注册'"
          ></span>
        </van-button>
      </van-field>
      <div
        v-show='type==0'
        class="input-wrap flex flex-between font-14"
      >
        <input
          autocomplete="off"
          type="text"
          placeholder="手机验证码"
        >
        <span class="color-primary ">{{getCodeMsg}}</span>
      </div>
      <div
        v-show='type==1'
        class="input-wrap flex flex-between font-14"
      >
        <input
          autocomplete="off"
          type="text"
          placeholder="邮箱验证码"
        >
        <span class="color-primary ">{{getCodeMsg}}</span>
      </div>
      <div class="van-hairline--bottom"></div>
      <button
        :disabled='disabled'
        class="btn-submit btn-block btn-primary btn-large btn-default riple"
      >重置</button>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: 0,
      getCodeMsg: "发送验证码"
    };
  },
  methods: {
    onSubmit() {},
    onTypeChange() {
      this.type = this.type == 0 ? 1 : 0;
    }
  }
};
</script>
<style lang="scss" scoped>
.reset-form {
  margin-top: 4.5rem;
  .input-wrap {
    margin-top: 1.5rem;
    line-height: 4rem;
  }
  .van-cell {
    margin-top: 1.5rem;
  }
  .btn-submit {
    margin-top: 4rem;
  }
  .van-button {
    padding-left: 2.5rem;
    border-color: $color-primary;
  }
  .icon-arrow {
    width: 1.2rem;
    left: 0.5rem;
  }
}
</style>
