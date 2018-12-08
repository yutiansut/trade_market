<template>
    <dialog-box
        :showDialog="showModal"
        width='500px'
        :showHeaderImg="false"
        :headerTitle='$t("bindBank")||title'
        :showHeaderTitle='true'
        @onDialogClose='closeModal'>
        <div class="content">
            <el-form label-position='top' @submit.native.prevent>
                <el-form-item :label='$t("owner")||"户主"'>
                    <el-input name='owner' :value='ownerName'
                      disabled
                      :placeholder='$t("ownerPlaceholder")||"户主姓名"'>
                    </el-input>
                </el-form-item>
                <el-form-item :label='$t("bankCardNo")||"银行卡号"'>
                    <el-input name='cardNum' v-model="cardNum"
                      @blur="validate(cardNum,'cardNum')"
                      :placeholder='$t("bankCardNoPlaceholder")||"请输入银行卡号"'>
                    </el-input>
                </el-form-item>
                <el-form-item :label='$t("depositBank")||"开户银行"'>
                    <el-input name='depositBank' v-model="depositBank"
                      :placeholder='$t("depositBankPlaceholder")||"请输入开户银行"'></el-input>
                </el-form-item>
                <el-form-item :label='$t("bankBranch")||"开户支行"'>
                    <el-input name='bankBranches' v-model="bankBranches"
                      :placeholder='$t("bankBranchPlaceholder")||"请输入开户支行"'></el-input>
                </el-form-item>
                <el-form-item :label='$t("googleCode")||"谷歌验证码"'>
                    <el-input name='googleCode' v-model="googleCode"
                      :placeholder='$t("googleCode")||"请输入谷歌验证码"'></el-input>
                </el-form-item>
                <button style="margin-top: 1px;"
                  @click="formSubmit"
                  class="btn-block btn-large btn-danger btn-active"
                  v-text="$t('submit')||'提交'"></button>
            </el-form>
        </div>
    </dialog-box>
</template>
<script>
export default {
  props: {
    title: { type: String, default: "绑定银行卡" },
    show: {
      type: Boolean,
      default: false
    },
    ownerName: ""
  },
  data() {
    return {
      showModal: this.show,
      cardNum: "",
      depositBank: "",
      bankBranches: "",
      googleCode: ""
    };
  },
  watch: {
    show: function() {
      this.showModal = this.show;
    }
  },
  methods: {
    validate(val, name) {
      if (val == "") return false;
      switch (name) {
        case "cardNum":
          !this.Util.isBankNo(val) && this.errMsg("银行卡号格式不正确");
          break;
      }
    },
    formSubmit() {
      if (
        this.owner == "" ||
        this.cardNum == "" ||
        this.depositBank == "" ||
        this.bankBranches == "" ||
        this.googleCode == ""
      ) {
        this.errMsg("请填写完整信息");
        return false;
      }
      if (!this.Util.isBankNo(this.cardNum)) {
        this.errMsg("银行卡格式不正确");
        return false;
      }
      this.request(this.api.addbank, {
        hz: this.owner,
        bankcard: this.cardNum,
        bank1: this.depositBank,
        bank2: this.bankBranches,
        googlecode: this.googleCode
      }).then(res => {
        if (res.code == "0") {
          this.successMsg(res.msg || "添加成功");
          this.closeModal();
        } else {
          this.errMsg(res.msg || "添加失败");
        }
      });
    },
    closeModal() {
      this.showModal = false;
      this.$emit("closeModal");
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
