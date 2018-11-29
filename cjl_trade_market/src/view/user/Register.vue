<template>
    <div :style="bg" class="content p-rel">
        <login-modal class="resize"
          :titleText='$t("register")||"注册"'>
            <el-form
              :model='registerData'
              label-position='top'
              @submit.native.prevent>
                <el-form-item :label='$t("cellphone")||"手机号"'>
                    <el-input
                      v-model.trim="registerData.cellphone"
                      name='cellphone'
                      :placeholder='$t("mobilePlaceholder")||"请输入手机号"'
                      maxlength='11'
                      @blur="validate(registerData.cellphone,'cellphone')">
                    </el-input>
                </el-form-item>
                <el-form-item :label='$t("mobileCode")||"手机验证码"'>
                    <div class="mobile-code-wrap p-rel">
                        <el-input
                          v-model="registerData.mobileCode"
                          name='mobileCode'
                          :placeholder='$t("mobileCodePlaceholder")||"请输入手机验证码"'
                          :disabled="myMobileCode?false:true"
                          @blur="validate(registerData.mobileCode,'mobileCode')">
                        </el-input>
                        <div v-text="codeText"
                          @click='getMobileCode'
                          class="mobile-code abs-v-center color-danger">
                        </div>
                    </div>
                </el-form-item>
                <el-form-item :label='$t("loginPwd")||"登录密码"'>
                   <el-input
                    v-model="registerData.password"
                    name='password' type='password'
                    :placeholder='$t("pwdPlaceholder")||"请输入密码"'
                    @blur="validate(registerData.password,'password')">
                  </el-input>
                </el-form-item>
                <el-form-item :label='$t("imgCode")||"图形验证码"'>
                    <div class="code-wrap flex flex-between">
                        <el-input
                          v-model="registerData.verCode" name='verCode'
                          :placeholder='$t("imgCodePlaceholder")||"请输入图形验证码"'
                          @blur="validate(registerData.verCode,'verCode')">
                        </el-input>
                        <div class="code" @click="createCode(verCodeNumArr,4)">
                          <ver-code
                            :contentHeight='38'
                            :identifyCode='verCodeStr'>
                          </ver-code>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item :label='$t("recommender")||"邀请人（选填）"'>
                   <el-input
                      v-model="registerData.recommender"
                      name='recommender'
                      :placeholder='$t("recommenderPlaceholder")||"请输入邀请人账号"'>
                    </el-input>
                </el-form-item>
                <div :class="isAgreed?'active':''" class="agree flex flex-between">
                    <div>
                        <i class="el-icon-circle-check"></i>
                        <template v-if="$i18n.locale=='zh-CN'">
                          <span>我已阅读并同意</span>
                          <router-link to=''>《用户使用协议》</router-link>
                        </template>
                        <template v-if="$i18n.locale=='en-US'">
                          <span>I've read and agreed with</span>
                          <router-link to=''>'User agreement'</router-link>
                        </template>
                    </div>
                    <router-link class="back"
                      to='/user/login'
                      v-text="$t('backToLogin')||'返回登录'">
                    </router-link>
                </div>
                <el-form-item>
                    <button
                      @click="formSubmit"
                      class="btn-block btn-large btn-danger btn-active"
                      v-text="$t('register')||'注册'">
                    </button>
                </el-form-item>
            </el-form>
        </login-modal>
    </div>
</template>
<script>
import loginModal from "@/components/Login/LoginModal.vue";
import verCode from "@/components/other/verCode";
export default {
  components: { loginModal, verCode },
  data() {
    const bg = require("@/assets/images/user/bg.jpg");
    return {
      bg: `background-image:url(${bg})`,
      registerData: {
        cellphone: "",
        password: "",
        mobileCode: "",
        verCode: "",
        recommender: ""
      },
      myMobileCode: "",
      codeText: this.$t("getMsgCode") || "获取验证码",
      canGetCode: true,
      isAgreed: true,
      verCodeStr: "",
      getCodeTimes: 0,
      verCodeNumArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  },
  mounted() {
    this.createCode(this.verCodeNumArr, 4);
  },
  methods: {
    validate(val, name) {
      if (val == "") return;
      switch (name) {
        case "cellphone":
          !this.Util.isPhone(val) && this.errMsg("手机号码格式不正确");
          break;
        case "password":
          !this.Util.isPassword(val) &&
            this.errMsg("密码必须是以英文字母开头的6-12位字符");
          break;
        case "mobileCode":
          val != this.myMobileCode && this.errMsg("手机验证码不正确");
          break;
        case "verCode":
          val != this.verCodeStr && this.errMsg("图形验证码不正确");
          break;
      }
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
    getMobileCode() {
      if (!this.canGetCode || !this.Util.isPhone(this.registerData.cellphone))
        return false;
      this.request(this.api.getMsgCode, {
        cellphone: this.registerData.cellphone
      }).then(res => {
        if (res.data.mobileCode) {
          this.myMobileCode = res.data.mobileCode;
        }
      });
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
    formSubmit() {
      for (let key in this.registerData) {
        let item = this.registerData[key];
        if (item == "" && key != "recommender") {
          this.errMsg("请填写完整信息");
          return;
        }
      }
      this.request(
        this.api.register,
        Object.assign({}, this.registerData)
      ).then(res => {
        if (!res.code) {
          this.$message.success("注册成功");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.content {
  padding: 1px;
  min-height: calc(100% - 360px);
  background-size: 105% auto;
  background-repeat: no-repeat;
  background-position: center 0;
  .resize {
    margin: 35px auto;
  }
  .agree {
    margin-top: -10px;
    margin-bottom: 20px;
    color: #999;
    &.active {
      color: $color-danger;
    }
    .back {
      color: $color-danger;
    }
    div:first-child {
      cursor: pointer;
    }
  }
}
.go-reg {
  color: #b72026;
}
.el-form-item {
  margin-bottom: 20px;
  button {
    margin-top: 1px;
  }
  .code {
    width: 95px;
    border: $default-border;
    margin-left: 15px;
    height: 40px;
    box-sizing: border-box;
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