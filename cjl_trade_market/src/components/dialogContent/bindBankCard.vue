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
                <el-form-item label='户主'>
                    <el-input name='owner' v-model="owner" placeholder='户主姓名'></el-input>
                </el-form-item>
                <el-form-item label='银行卡号'>
                    <el-input name='cardNum' v-model="cardNum" placeholder='请输入银行卡号'></el-input>
                </el-form-item>
                <el-form-item label='开户银行'>
                    <el-input name='depositBank' v-model="depositBank" placeholder='请输入开户银行'></el-input>
                </el-form-item>
                <el-form-item label='开户支行'>
                    <el-input name='bankBranches' v-model="bankBranches" placeholder='请输入开户支行'></el-input>
                </el-form-item>
                <button style="margin-top: 1px;" class="btn-block btn-large btn-danger btn-active">提交</button>
            </el-form>
        </div>
    </dialog-box>
</template>
<script>
export default {
  props: {
    title: { type: String, default: '绑定银行卡' },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showModal: this.show,
      owner: '',
      cardNum: '',
      depositBank: '',
      bankBranches: '',
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
