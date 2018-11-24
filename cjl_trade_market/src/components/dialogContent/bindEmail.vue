<template>
    <dialog-box
        :showDialog="showModal"
        width='500px'
        :showHeaderImg="false"
        :headerTitle='title'
        :showHeaderTitle='true'
        @onDialogClose='closeModal'>
        <div class="content">
            <el-form label-position='top'
              @submit.native.prevent
              :model='formData'>
                <el-form-item label='邮箱'>
                    <el-input v-model="formData.email" name='email' placeholder='请输入邮箱'></el-input>
                </el-form-item>
                <el-form-item label='邮箱验证码'>
                    <el-input v-model="formData.emailCode" name='emailCode' placeholder='请输入邮箱验证码'></el-input>
                </el-form-item>
                <el-form-item label='验证码'>
                    <div class="mobile-code-wrap p-rel">
                        <el-input v-model="formData.mobileCode" name='mobileCode' placeholder='请输入验证码'></el-input>
                        <div @click='getMobileCode' class="mobile-code abs-v-center color-danger"
                          v-text="codeText">
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label='图形验证码'>
                    <div class="code-wrap flex flex-between">
                        <el-input v-model="formData.code" name='code' placeholder='请输入图形验证码'></el-input>
                        <div class="code"></div>
                    </div>
                </el-form-item>
                <button style="margin-top: 1px;" class="btn-block btn-large btn-danger btn-active">提交</button>
            </el-form>
        </div>
    </dialog-box>
</template>
<script>
export default {
  props: {
    title: { type: String, default: "绑定邮箱" },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showModal: this.show,
      getCodeTimes: 0,
      canGetCode: true,
      codeText: "获取验证码",
      formData: {
        email: "",
        emailCode: "",
        mobileCode: "",
        imgCode: ""
      }
    };
  },
  watch: {
    show: function() {
      this.showModal = this.show;
    }
  },
  methods: {
    formSubmit() {},
    closeModal() {
      this.showModal = false;
      this.$emit("closeModal");
    },
    getMobileCode() {
      if (!this.canGetCode) return false;
      this.Util.timerCounter({
        onStart: t => {
          this.canGetCode = false;
          this.getCodeTimes += 1;
          this.codeText = `倒计时（${t}）s`;
        },
        onCounting: t => {
          this.codeText = `倒计时（${t}）s`;
        },
        onComplete: () => {
          this.canGetCode = true;
          this.getCodeTimes > 0 && (this.codeText = "重新获取");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.go-reg {
  color: #b72026;
}

.el-form-item {
  margin-bottom: 20px;
  .code {
    width: 95px;
    border: $default-border;
    margin-left: 15px;
  }
  .mobile-code {
    width: 120px;
    text-align: right;
    right: 15px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    &.color-danger {
      color: $color-danger;
    }
  }
}
</style>
