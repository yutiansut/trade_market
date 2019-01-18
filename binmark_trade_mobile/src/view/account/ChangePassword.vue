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
    onSubmit() {},
    childData(data) {
      Object.assign(this.formData, data);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding-top: 2rem;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
}
.btn-group {
  padding: 1rem;
}
</style>