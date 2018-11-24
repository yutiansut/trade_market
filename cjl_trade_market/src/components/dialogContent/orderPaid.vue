/**卖出/买入已付款挂单 */
<template>
    <dialog-box
        :showDialog="showModal"
        :dialogTitle="title"
        @onDialogClose='closeModal'>
        <div class="content">
            <div class="form-group">
                <span class="label" v-text="ownerLabel"></span>
                <el-input disabled name='owner'
                    :value='owner'>
                </el-input>
            </div>
            <div class="form-group">
                <span class="label" v-text="bankCardNoLabel"></span>
                <el-input disabled name='bankCardNo'
                    :value='bankCardNo'>
                </el-input>
            </div>
            <div class="form-group">
                <span class="label" v-text="depositBankLabel"></span>
                <el-input disabled name='depositBank'
                    :value='depositBank'>
                </el-input>
            </div>
            <div class="form-group">
                <span class="label" v-text="branchesLabel"></span>
                <el-input disabled name='bankBranches'
                    :value='bankBranches'>
                </el-input>
            </div>
            <div class="form-group">
                <span class="label" v-text="transAmountLabel"></span>
                <el-input disabled name='transferAmount'
                    :value='transferAmount'>
                </el-input>
            </div>
            <div class="form-group">
                <span class="label" v-text="noteLabel"></span>
                <el-input disabled name='note'
                    :value='note'>
                </el-input>
            </div>
            <div class="btn-group">
                <button @click='formSubmit' class="btn-block btn-large btn-danger btn-active">提交</button>
                <button class="btn-block btn-large btn-bordered btn-active">取消</button>
            </div>
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
    ownerLabel: {
      type: String,
      default: '户主',
    },
    bankCardNoLabel: {
      type: String,
      default: '银行卡号',
    },
    depositBankLabel: {
      type: String,
      default: '开户银行',
    },
    branchesLabel: {
      type: String,
      default: '开户支行',
    },
    transAmountLabel: {
      type: String,
      default: '转账金额',
    },
    noteLabel: {
      type: String,
      default: '备注',
    },
  },
  data() {
    return {
      showModal: this.show,
      owner: '',
      bankCardNo: '',
      depositBank: '',
      bankBranches: '',
      transferAmount: '',
      note: '',
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
.form-group {
  margin-top: 15px;
  .label {
    display: inline-block;
    margin-bottom: 10px;
  }
  .slot-text {
    @include textVcenter;
  }
}
.btn-group {
  margin-top: 30px;
  .btn-bordered {
    margin-top: 15px;
  }
}
</style>