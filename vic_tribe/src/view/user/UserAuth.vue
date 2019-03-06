<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full">
      <van-cell-group>
        <van-field
          v-model="trueName"
          label="真实姓名"
          placeholder='输入真实姓名'
        />
        <van-field
          v-model="customerCard"
          label="身份证号"
          placeholder='输入身份证号'
        />
        <van-field
          v-model="bankName"
          label="开户银行"
          placeholder='输入开户银行名称'
        />
        <van-field
          v-model="bankCard"
          label="银行卡号"
          placeholder='输入银行卡号'
        />
      </van-cell-group>
      <button
        @click='saveChange'
        :disabled="disabled"
        class="btn-block btn-radius btn-active btn-dark btn-large"
      >保存修改</button>
    </div>
  </div>
</template>
<script>
import { pushAuth } from "@/vuexStore/customerController.js";

export default {
  data() {
    return {
      trueName: "",
      customerCard: "",
      bankName: "",
      bankCard: ""
    };
  },
  computed: {
    disabled() {
      if (
        !this.trueName ||
        !this.customerCard ||
        !this.bankName ||
        !this.bankCard
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    validate() {
      let code = 0,
        msg = "";
      if (!this.Validate.isIdCard(this.customerCard)) {
        code = 1;
        msg = "身份证号码格式不正确";
      } else if (!this.Validate.isBankNo(this.bankCard)) {
        code = 1;
        msg = "银行卡号格式不正确";
      }
      console.log(this.bankCard);
      return {
        msg,
        code
      };
    },
    saveChange() {
      let { code, msg } = this.validate();
      if (code != 0) {
        this.$toast(msg);
        return;
      }
      pushAuth(
        this.trueName,
        this.customerCard,
        this.bankCard,
        this.bankName
      ).then(res => {
        if (res) this.$router.go(-1);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.app-body {
  padding: 0 1rem;
}
.van-cell-group {
  margin: 1rem -1rem 3.5rem -1rem;
}
</style>