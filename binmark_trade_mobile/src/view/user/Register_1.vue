<template>
  <form @submit.prevent='onSubmit'>
    <van-field
      v-model="account"
      placeholder="请输入用户名"
    />
    <van-field
      v-model="account"
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
        type="text"
        placeholder="手机验证码"
      >
      <span class="color-primary ">{{getCodeMsg}}</span>
    </div>
    <div
      v-show='type==1'
      class="input-wrap flex flex-between font-14 van-hairline--bottom"
    >
      <input
        type="text"
        placeholder="邮箱验证码"
      >
      <span class="color-primary ">{{getCodeMsg}}</span>
    </div>
    <div class="van-hairline--bottom"></div>
    <van-field
      v-model="recommender"
      placeholder="推荐人ID（选填）"
    />
    <button class="btn-submit btn-block btn-primary btn-large btn-default btn-active">下一步</button>
  </form>
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