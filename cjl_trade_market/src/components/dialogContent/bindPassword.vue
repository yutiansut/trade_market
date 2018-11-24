<template>
    <dialog-box
        :showDialog="showModal"
        width='500px'
        :showHeaderImg="false"
        :headerTitle='title'
        :showHeaderTitle='true'
        @onDialogClose='closeModal'>
        <div class="content">
            <el-form label-position='top' @submit.native.prevent>
                <el-form-item :label='mobileLabel'>
                    <el-input name='mobile' placeholder='请输入手机号'></el-input>
                </el-form-item>
                <el-form-item label='手机验证码'>
                    <div class="mobile-code-wrap p-rel">
                        <el-input name='mobileCode' placeholder='请输入手机验证码'></el-input>
                        <div class="mobile-code abs-v-center color-danger">获取验证码</div>
                    </div>
                </el-form-item>
                <el-form-item :label='passwordLabel'>
                    <el-input name='password' type='password' placeholder='请输入密码'></el-input>
                </el-form-item>
                <el-form-item label='图形验证码'>
                    <div class="code-wrap flex flex-between">
                        <el-input name='code' placeholder='请输入图形验证码'></el-input>
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
    title: String,
    show: {
      type: Boolean,
      default: false,
    },
    mobileLabel: {
      type: String,
      default: '手机号',
    },
    passwordLabel: {
      type: String,
      default: '登录密码',
    },
  },
  data() {
    return {
      showModal: this.show,
    };
  },
  watch: {
    show: function() {
      this.showModal = this.show;
    },
  },
  methods: {
    formSubmit() {},
    closeModal() {
      this.showModal = false;
      this.$emit('closeModal');
    },
  },
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
