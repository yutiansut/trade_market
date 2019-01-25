<template>
  <div class="container h-full van-hairline--top">
    <div class="form overflow-y">
      <div class="form-group">
        <div class="label color-666 font-14">户主</div>
        <div class="form-input font-15 van-hairline--bottom">
          <span
            class="font-bold color-666"
            v-text="bindstate.username"
          ></span>
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">卡号</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            v-model="bankcard"
            autocomplete="off"
            class="h-35"
            placeholder="请输入卡号"
          >
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">开户银行</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            v-model="bank1"
            autocomplete="off"
            class="h-35"
            placeholder="请输入开户银行"
          >
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">开户支行</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            v-model="bank2"
            autocomplete="off"
            class="h-35"
            placeholder="请输入开户支行"
          >
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">谷歌验证码</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            v-model="googlecode"
            autocomplete="off"
            class="h-35"
            placeholder="请输入谷歌验证码"
          >
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">交易密码</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            v-model="password"
            autocomplete="off"
            class="h-35"
            type="password"
            placeholder="请输入交易密码"
          >
        </div>
      </div>
    </div>
    <div class="btn-group">
      <button
        :disabled='disabled'
        @click="onSubmit"
        class="btn-large btn-block riple btn-primary"
      >确定</button>
    </div>
  </div>
</template>
<script>
import { bindBank, getsafe } from "@/vuexStore/storeService.js";
export default {
  data() {
    return {
      bindstate: {},
      bankcard: "12345678987654321",
      bank1: "12313",
      bank2: "46546",
      googlecode: "",
      password: ""
    };
  },
  computed: {
    disabled() {
      if (
        !this.bank1 ||
        !this.bank2 ||
        !this.googlecode ||
        !this.bankcard ||
        !this.password
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    getsafe().then(res => {
      this.bindstate = res;
    });
  },
  methods: {
    valide() {
      if (!this.Util.isBankNo(this.bankcard)) {
        this.$toast({
          message: "银行卡格式不正确"
        });
        return false;
      }
      return true;
    },
    onSubmit() {
      if (this.valide()) {
        bindBank({
          bankcard: this.bankcard,
          bank1: this.bank1,
          bank2: this.bank2,
          googlecode: this.googlecode,
          password: this.password
        }).then(res => {
          if (res) this.navigateTo("/account");
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.form-group {
  margin-top: 1rem;
}

.btn-group {
  padding: 1rem;
}
</style>