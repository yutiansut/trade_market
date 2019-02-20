<template>
  <form @submit.prevent>
    <van-field
      autocomplete='off'
      v-model="account"
      placeholder="请输入用户名"
    />
    <van-field
      autocomplete='off'
      v-model="accountcode"
      :placeholder="type==0?'请输入手机号':'请输入邮箱'"
    >
      <van-button
        size='small'
        slot="button"
        class="p-rel"
        @click.self='onTypeChange'
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
        v-model="code"
        type="text"
        placeholder="手机验证码"
      >
      <span
        @click="sendCode"
        class="color-primary "
      >{{codeText}}</span>
    </div>
    <div
      v-show='type==1'
      class="input-wrap flex flex-between font-14 van-hairline--bottom"
    >
      <input
        v-model="code"
        type="text"
        placeholder="邮箱验证码"
      >
      <span
        @click="sendCode"
        class="color-primary "
      >{{codeText}}</span>
    </div>
    <div class="van-hairline--bottom"></div>
    <van-field
      v-model="parent"
      placeholder="推荐码（选填）"
    />
    <button
      @click="onSubmit"
      :disabled='disabled'
      class="btn-submit btn-block btn-primary btn-large btn-default riple"
    >下一步</button>
  </form>
</template>
<script>
import { verCodeMixin } from "../../mixin/mixin.js";
import { sendCode } from "../../vuexStore/storeService.js";
import { getQueryParams } from "../../assets/js/commonFunc.js";
export default {
  mixins: [verCodeMixin],
  data() {
    return {
      account: "",
      accountcode: "",
      parent: "",
      type: 0
    };
  },
  mounted() {
    let paramsObj = getQueryParams();
    paramsObj.sharecode && (this.parent = paramsObj.sharecode);
  },
  computed: {
    disabled() {
      if (!this.account || !this.accountcode || !this.code) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    validate() {
      if (!this.Util.isUserName(this.account)) {
        this.$toast({
          message: "用户名必须由6-12位字母及数字组成",
          position: "bottom"
        });
        return false;
      }
      if (
        !this.Util.isPhone(this.accountcode) &&
        !this.Util.isEmail(this.accountcode)
      ) {
        this.$toast({
          message: "邮箱或者手机号格式不正确",
          position: "bottom"
        });
        return false;
      }
      return true;
    },
    onSubmit() {
      if (this.validate()) {
        this.navigateTo("/userentry/register_2", {
          code: this.code,
          account: this.account,
          accountcode: this.accountcode,
          type: this.type,
          parent: this.parent
        });
      }
    },
    sendCode() {
      if (
        !this.Util.isPhone(this.accountcode) &&
        !this.Util.isEmail(this.accountcode)
      ) {
        this.$toast({
          message: "邮箱或者手机号格式不正确",
          position: "bottom"
        });
        return false;
      }
      this.timeCountDown();
      sendCode(this.accountcode, this.type).then(data => {
        this.$toast({
          message: data.msg,
          position: "bottom"
        });
      });
    },
    onTypeChange() {
      this.type = this.type == 0 ? 1 : 0;
      this.accountcode = "";
    }
  }
};
</script>