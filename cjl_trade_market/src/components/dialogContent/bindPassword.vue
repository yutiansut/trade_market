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
                <!-- <el-form-item :label='$t("cellphone")||mobileLabel'>
                    <el-input name='mobile'
                      v-model="formData.cellphone"
                      :placeholder='$t("mobilePlaceholder")||"请输入手机号"'>
                    </el-input>
                </el-form-item> -->
                <el-form-item :label='$t("mobileCode")||"手机验证码"'>
                    <div class="mobile-code-wrap p-rel">
                        <el-input name='mobileCode'
                          v-model="formData.mobileCode"
                          :placeholder='$t("mobileCodePlaceholder")||"请输入手机验证码"'>
                        </el-input>
                        <div @click="getMobileCode" class="mobile-code abs-v-center color-danger">
                          {{$t(this.codeTexti18n)}}{{second}}
                        </div>                        
                    </div>
                </el-form-item>
                <el-form-item :label='$t("newPassword")||passwordLabel'>
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
                <button style="margin-top: 1px;"
                  @click="formSubmit(apiKey)"
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
    title: String,
    show: {
      type: Boolean,
      default: false
    },
    // 请求接口
    apiKey: "",
    mobileLabel: {
      type: String,
      default: "手机号码"
    },
    passwordLabel: {
      type: String,
      default: "新密码"
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
      myMobileCode: "",
      verCodeStr: "",
      second: "",
      codeTexti18n: "getMsgCode",
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
      this.codeTexti18n = "getMsgCode";
      this.second = "";
      this.timer = null;
      this.myMobileCode = false;
      this.formData = {
        mobileCode: "",
        password: "",
        imgCode: ""
      };
    },
    validate(val, name) {
      if (val == "") {
        this.errMsg("请填写完整信息");
      } else if (name == "password" && !this.Util.isPassword(val)) {
        this.errMsg("密码必须是以英文字母开头的6-12位字符");
      } else if (
        name == "imgCode" &&
        this.formData.imgCode != this.verCodeStr
      ) {
        this.errMsg("图形验证码不正确");
      } else {
        return true;
      }
    },
    formSubmit(api) {
      for (let key in this.formData) {
        let item = this.formData[key];
        if (!this.validate(item, key)) return;
      }
      this.request(this.api[api], {
        code: this.formData.mobileCode,
        password: this.formData.password
      }).then(res => {
        if (res.code == "0") {
          this.successMsg(res.msg);
          this.closeModal();
        } else {
          this.errMsg(res.msg);
        }
      });
    },
    countDown() {
      this.timer = this.Util.timerCounter({
        onStart: t => {
          this.canGetCode = false;
          this.getCodeTimes += 1;
          this.second = `${t}s`;
          this.codeTexti18n = "countDown";
        },
        onCounting: t => {
          this.second = `(${t}s)`;
          this.codeTexti18n = "countDown";
        },
        onComplete: () => {
          this.canGetCode = true;
          this.getCodeTimes > 0 && (this.codeTexti18n = "tryAgain");
        }
      });
    },
    getMobileCode() {
      if (!this.canGetCode) return false;
      this.countDown();
      this.request(this.api.sendcodetoken).then(res => {
        if (res.code == "0") {
          this.successMsg(res.msg || "发送成功");
        } else {
          this.errMsg(res.msg || "发送失败");
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
