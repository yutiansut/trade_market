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
                <el-form-item :label='$t("cellphone")||mobileLabel'>
                    <el-input name='mobile'
                      v-model="formData.cellphone"
                      :placeholder='$t("mobilePlaceholder")||"请输入手机号"'>
                    </el-input>
                </el-form-item>
                <el-form-item :label='$t("mobileCode")||"手机验证码"'>
                    <div class="mobile-code-wrap p-rel">
                        <el-input name='mobileCode'
                          v-model="formData.mobileCode"
                          :placeholder='$t("mobileCodePlaceholder")||"请输入手机验证码"'>
                        </el-input>
                        <div @click="getMobileCode" class="mobile-code abs-v-center color-danger" v-text="codeText"></div>                        
                    </div>
                </el-form-item>
                <el-form-item :label='$t("loginPwd")||passwordLabel'>
                    <el-input name='password' type='password'
                      v-model="formData.password"
                      :placeholder='$t("pwdPlaceholder")||"请输入密码"'>
                    </el-input>
                </el-form-item>
                <el-form-item :label='$t("imgCode")||"图形验证码"'>
                    <div class="code-wrap flex flex-between">
                        <el-input name='code'
                          v-model="formData.imgCode"
                          :placeholder='$t("imgCodePlaceholder")||"请输入图形验证码"'>
                        </el-input>
                        <div @click="createCode(verCodeNumArr,4)" class="code">
                          <ver-code
                            :contentHeight='38'
                            :identifyCode='verCodeStr'>
                          </ver-code>
                        </div>
                    </div>
                </el-form-item>
                <button style="margin-top: 1px;" class="btn-block btn-large btn-danger btn-active" v-text="$t('submit')||'提交'"></button>
            </el-form>
        </div>
    </dialog-box>
</template>
<script>
import verCode from "@/components/other/verCode";
export default {
  components: { verCode },
  props: {
    title: String,
    show: {
      type: Boolean,
      default: false
    },
    mobileLabel: {
      type: String,
      default: "手机号码"
    },
    passwordLabel: {
      type: String,
      default: "登录密码"
    }
  },
  data() {
    return {
      showModal: this.show,
      getCodeTimes: 0,
      canGetCode: true,
      codeText: null,
      timer: null,
      verCodeNumArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      verCodeStr: "",
      formData: {
        cellphone: "",
        mobileCode: "",
        password: "",
        imgCode: ""
      }
    };
  },
  created() {
    this.initData();
  },
  watch: {
    show: function() {
      this.showModal = this.show;
      this.createCode(this.verCodeNumArr, 4);
    }
  },
  methods: {
    initData() {
      this.getCodeTimes = 0;
      this.canGetCode = true;
      this.codeText = this.$t("getMsgCode") || "获取验证码";
      this.timer = null;
      this.formData = {
        cellphone: "",
        mobileCode: "",
        imgCode: ""
      };
    },
    formSubmit() {},
    getMobileCode() {
      if (!this.canGetCode) return false;
      this.timer = this.Util.timerCounter({
        onStart: t => {
          this.canGetCode = false;
          this.getCodeTimes += 1;
          this.codeText = `${this.$t("countDown") || "倒计时"}（${t}）s`;
        },
        onCounting: t => {
          this.codeText = `${this.$t("countDown") || "倒计时"}（${t}）s`;
        },
        onComplete: () => {
          this.canGetCode = true;
          this.getCodeTimes > 0 &&
            (this.codeText = $t("tryAgain") || "重新获取");
        }
      });
    },
    createCode(arr, len) {
      let str = "";
      for (let i = 0; i < len; i++) {
        str += this.verCodeNumArr[
          this.Util.randomNum(0, this.verCodeNumArr.length)
        ];
      }
      this.verCodeStr = str;
    },
    closeModal() {
      this.showModal = false;
      this.$emit("closeModal");
      clearInterval(this.timer);
      this.initData();
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
  .code-wrap {
    height: 40px;
    box-sizing: border-box;
    line-height: normal;
  }
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
