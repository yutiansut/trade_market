<template>
    <dialog-box
        :showDialog="showModal"
        width='500px'
        :showHeaderImg="false"
        :headerTitle='$t("bindEmail")||title'
        :showHeaderTitle='true'
        @onDialogClose='closeModal'>
        <div class="content">
            <el-form label-position='top'
              @submit.native.prevent
              :model='formData'>
                <el-form-item :label='$t("email")||"邮箱"'>
                  <el-input v-model="formData.email" name='email'
                    @blur="validate(formData.email,'email')"
                    :placeholder='$t("emailPlaceholder")||"请输入邮箱"'>
                  </el-input>
                </el-form-item>
                <!-- <el-form-item :label='$t("emailCode")||"邮箱验证码"'>
                  <el-input v-model="formData.emailCode" name='emailCode'
                    @blur="validate(formData.emailCode,'emailCode')"
                    :placeholder='$t("emailCodePlaceholder")||"请输入邮箱验证码"'>
                  </el-input>
                </el-form-item> -->
                <el-form-item :label='$t("cellphone")||mobileLabel'>
                  <el-input name='mobile'
                    @blur="validate(formData.cellphone,'cellphone')"
                    v-model="formData.cellphone"
                    :placeholder='$t("mobilePlaceholder")||"请输入手机号"'>
                  </el-input>
                </el-form-item>
                <el-form-item :label='$t("mobileCode")||"手机验证码"'>
                    <div class="mobile-code-wrap p-rel">
                      <el-input v-model="formData.mobileCode" name='mobileCode'
                        @blur="validate(formData.mobileCode,'mobileCode')"
                        :placeholder='$t("mobileCodePlaceholder")||"请输入手机验证码"'>
                      </el-input>
                      <div @click='getMobileCode'
                        class="mobile-code abs-v-center color-danger"
                        v-text="codeText">
                      </div>
                    </div>
                </el-form-item>
                <el-form-item :label='$t("imgCode")||"图形验证码"'>
                    <div class="code-wrap flex flex-between">
                        <el-input v-model="formData.imgCode" name='imgCode'
                          @blur="validate(formData.imgCode,'imgCode')"
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
                <button style="margin-top: 1px;"
                  @click="formSubmit"
                  class="btn-block btn-large btn-danger btn-active"
                  v-text="$t('submit')||'提交'">
                </button>
            </el-form>
        </div>
    </dialog-box>
</template>
<script>
import verCode from "@/components/other/verCode";
export default {
  components: { verCode },
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
      codeText: null,
      timer: null,
      emailCode: "",
      verCodeNumArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      verCodeStr: "",
      formData: null,
      myMobileCode: ""
    };
  },
  watch: {
    show: function() {
      this.showModal = this.show;
    }
  },
  mounted() {
    this.createCode(this.verCodeNumArr, 4);
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getCodeTimes = 0;
      this.canGetCode = true;
      this.codeText = this.$t("getMsgCode") || "获取验证码";
      this.timer = null;
      this.myMobileCode = "";
      this.myEmailCode = "";
      this.formData = {
        cellphone: "",
        email: "",
        mobileCode: "",
        imgCode: ""
      };
    },
    bindEmail(data) {
      this.request(this.api.bindemail, {
        email: data.email || "",
        code: data.code || "",
        emailcode: data.emailcode || ""
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
    formSubmit() {
      for (let key in this.formData) {
        let item = this.formData[key];
        if (item == "") {
          this.errMsg("请填写完整信息");
          return;
        }
      }
      this.request(this.api.bindemail, {
        code: this.formData.mobileCode,
        email: this.formData.email,
        emailcode: this.formData.emailCode
      }).then(res => {
        if (res.code == "0") {
          this.successMsg(res.msg || "绑定成功");
          this.init();
          this.showModal = false;
          this.$emit("emailBind");
        } else {
          this.errMsg(res.msg);
        }
      });
    },
    validate(val, name) {
      if (val == "") return;
      switch (name) {
        case "email":
          !this.Util.isEmail(val) && this.errMsg("邮箱格式不正确");
          break;
        case "emailCode":
          val != this.myEmailCode && this.errMsg("邮箱验证码不正确");
          break;
        case "verCode":
          val != this.verCodeStr && this.errMsg("图形验证码不正确");
          break;
      }
    },
    closeModal() {
      this.showModal = false;
      this.$emit("closeModal");
      clearInterval(this.timer);
      this.init();
    },
    getMobileCode() {
      if (!this.canGetCode || !this.Util.isPhone(this.formData.cellphone))
        return false;
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
      this.request(this.api.sendcodetoken, {
        tel: this.formData.cellphone
      }).then(res => {
        if (res.data.code == "0") {
          this.successMsg(res.msg);
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
  .code-wrap {
    height: 40px;
    box-sizing: border-box;
    line-height: normal;
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
