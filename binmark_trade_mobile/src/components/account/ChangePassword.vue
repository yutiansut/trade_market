<template>
  <div>
    <form>
      <van-tabs
        type='card'
        v-model="myType"
      >
        <van-tab title="手机验证"></van-tab>
        <van-tab title="邮箱验证"></van-tab>
      </van-tabs>
      <div class="form-group">
        <div
          class="label color-666 font-14"
          v-text="type==0?'手机验证码':'邮箱验证码'"
        ></div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            v-model="code"
            autocomplete="off"
            class="h-35"
            type="text"
            :placeholder="type==0?'请输入手机验证码':'请输入邮箱验证码'"
          >
          <span class="message-code riple">获取验证码</span>
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">新密码</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            v-model="password"
            autocomplete="off"
            class="h-35"
            type="password"
            placeholder="请输入新密码"
          >
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">图形验证码</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            v-model="imgCode"
            autocomplete="off"
            class="h-35"
            type="text"
            placeholder="图形验证码"
          >
          <span>图形验证码</span>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "change-password",
  props: ["type"],
  data() {
    return {
      myType: 0,
      password: "",
      imgCode: "",
      code: ""
    };
  },
  watch: {
    myType(val) {
      this.$emit("onDataChange", { myType: val });
    },
    password(val) {
      this.$emit("onDataChange", { password: val });
    },
    imgCode(val) {
      this.$emit("onDataChange", { imgCode: val });
    },
    code(val) {
      this.$emit("onDataChange", { code: val });
    }
  }
};
</script>
<style lang="scss" scoped>
.form-group {
  margin-top: 1rem;
}

.message-code {
  color: #3388ff;
  border-radius: 45px;
}
</style>
