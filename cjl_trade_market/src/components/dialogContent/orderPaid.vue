/**卖出/买入已付款挂单 */
<template>
    <dialog-box
        :showDialog="showModal"
        :dialogTitle="title"
        @onDialogClose='closeModal'>
        <div class="content">
            <div class="form-group">
                <span class="label" v-text="ownerLabel||$t('owner')||'户主'"></span>
                <el-input disabled name='owner'
                    :value='owner'>
                </el-input>
            </div>
            <div class="form-group">
                <span class="label" v-text="bankCardNoLabel||$t('bankCardNo')||'银行卡号'"></span>
                <el-input disabled name='bankCardNo'
                    :value='bankCardNo'>
                </el-input>
            </div>
            <div class="form-group">
                <span class="label" v-text="depositBankLabel||$t('depositBank')||'开户银行'"></span>
                <el-input disabled name='depositBank'
                    :value='depositBank'>
                </el-input>
            </div>
            <div class="form-group">
                <span class="label" v-text="branchesLabel||$t('bankBranch')||'开户支行'"></span>
                <el-input disabled name='bankBranches'
                    :value='bankBranches'>
                </el-input>
            </div>
            <div class="form-group">
                <span class="label" v-text="transAmountLabel||$t('transferAmount')||'转账金额'"></span>
                <el-input disabled name='transferAmount'
                    :value='transferAmount'>
                </el-input>
            </div>
            <div class="form-group">
                <span class="label" v-text="noteLabel||$t('note')||'备注'"></span>
                <el-input disabled name='note'
                    :value='note'>
                </el-input>
            </div>
            <div class="btn-group">
                <button
                  @click='formSubmit'
                  class="btn-block btn-large btn-danger btn-active"
                  v-text="$t('submit')||'提交'">
                </button>
                <button class="btn-block btn-large btn-bordered btn-active" v-text="$t('cancel')||'取消'"></button>
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
      default: false
    },
    ownerLabel: String,
    bankCardNoLabel: String,
    depositBankLabel: String,
    branchesLabel: String,
    transAmountLabel: String,
    noteLabel: String
  },
  data() {
    return {
      showModal: this.show,
      owner: "",
      bankCardNo: "",
      depositBank: "",
      bankBranches: "",
      transferAmount: "",
      note: ""
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
    }
  }
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