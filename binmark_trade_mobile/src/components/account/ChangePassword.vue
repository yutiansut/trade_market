<template>
  <div>
    <form @submit.prevent>
      <van-tabs
        type='card'
        v-model="type"
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
          <span
            @click="sendCode"
            class="message-code riple"
            v-text="codeText"
          ></span>
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">原密码</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            v-model="oldpassword"
            autocomplete="off"
            class="h-35"
            type="password"
            placeholder="请输入新密码"
          >
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
          <span
            @click="createCode(verCodeNumArr,4)"
            class="code-wrap"
          >
            <ver-code
              :contentHeight='35'
              :identifyCode='verCodeStr'
            >
            </ver-code>
          </span>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { verCodeMixin, imgCodeMixin } from "@/mixin/mixin.js";
import { sendCode } from "../../vuexStore/storeService.js";
import verCode from "@/components/other/verCode";
export default {
  name: "change-password",
  components: { verCode },
  props: ["type"],
  mixins: [verCodeMixin, imgCodeMixin],
  data() {
    return {
      type: 0,
      password: "",
      imgCode: "",
      oldpassword: ""
    };
  },
  mounted() {
    this.createCode(this.verCodeNumArr, 4);
  },
  methods: {
    sendCode() {
      this.timeCountDown();
      sendCode(this.storage.get("token"), this.type == 0 ? "4" : "5");
    }
  },
  watch: {
    type(val) {
      this.$emit("onDataChange", { type: val });
    },
    password(val) {
      this.$emit("onDataChange", { password: val });
    },
    oldpassword(val) {
      this.$emit("onDataChange", { oldpassword: val });
    },
    imgCode(val) {
      this.$emit("onDataChange", { imgCode: val });
    },
    code(val) {
      this.$emit("onDataChange", { code: val });
    },
    verCodeStr(val) {
      this.$emit("onDataChange", { verCodeStr: val });
    }
  }
};
</script>
<style lang="scss" scoped>
.form-group {
  margin-top: 1rem;
}
.code-wrap {
  line-height: normal;
}
.message-code {
  color: $color-info;
  border-radius: 45px;
}
</style>
