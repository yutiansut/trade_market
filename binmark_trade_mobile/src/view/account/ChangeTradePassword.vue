<template>
  <div class="container h-full van-hairline--top">
    <change-password @onDataChange='childData'></change-password>
    <div class="btn-group">
      <button
        @click="onSubmit"
        class="btn-large btn-block riple btn-primary"
      >确定</button>
    </div>
  </div>
</template>
<script>
import changePassword from "@/components/account/ChangePassword";
import { updatepaypassword } from "@/vuexStore/storeService.js";
export default {
  components: {
    changePassword
  },
  data() {
    return {
      formData: {}
    };
  },
  methods: {
    validate() {
      if (!this.formData.code) {
        this.$toast({
          message: "验证码不能为空"
        });
        return false;
      }
      if (!this.Util.isPassword(this.formData.password)) {
        this.$toast({
          message: "密码必须以字母开头的6-12位字符"
        });
        return false;
      }
      if (!this.formData.imgCode) {
        this.$toast({
          message: "图形验证码不能为空"
        });
        return false;
      }
      if (this.formData.imgCode != this.formData.verCodeStr) {
        this.$toast({
          message: "图形验证码不正确"
        });
        return false;
      }
      return true;
    },
    onSubmit() {
      if (this.validate()) {
        updatepaypassword(this.formData);
      }
    },
    childData(data) {
      Object.assign(this.formData, data);
      this.formData.type == undefined && (this.formData.type = 0);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding-top: 2rem;
}
.btn-group {
  padding: 1rem;
}
</style>