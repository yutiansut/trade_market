<template>
    <div :style="bg" class="content p-rel">
        <login-modal class="resize" :titleText='$t("login")||"登录"'>
            <el-form label-position='top' @submit.native.prevent>
              <!-- 登录第一步 -->
              <template v-if="!checkLogin">
                <el-form-item :label='$t("cellphone")||"手机号"'>
                  <el-input v-model="checkLoginData.cellphone"
                      name='cellphone'
                      :placeholder='$t("mobilePlaceholder")||"请输入手机号"'
                      @blur="validate(checkLoginData.cellphone,'cellphone')">
                  </el-input>
                </el-form-item>
                <el-form-item :label='$t("password")||"密码"'>
                    <el-input
                      v-model="checkLoginData.password"
                      name='password'
                      type='password'
                      :placeholder='$t("pwdPlaceholder")||"请输入密码"'
                      @blur="validate(checkLoginData.password,'password')">
                    </el-input>
                </el-form-item>
                <el-form-item :label='$t("imgCode")||"验证码"'>
                    <div class="code-wrap flex flex-between">
                        <el-input
                          v-model="checkLoginData.verCode"
                          name='verCode'
                          :placeholder='$t("imgCodePlaceholder")||"请输入验证码"'
                          @blur="validate(checkLoginData.verCode,'verCode')">
                        </el-input>
                        <div @click="createCode(verCodeNumArr,4)" class="code">
                          <ver-code
                            :contentHeight='38'
                            :identifyCode='verCodeStr'>
                          </ver-code>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item>
                  <button
                    @click="loginStep"
                    class="btn-block btn-large btn-danger btn-active"
                    v-text="$t('nextStep')||'下一步'">
                  </button>
                </el-form-item>
                <div class="flex flex-between">
                    <router-link to='/user/resetpwd'>{{$t('forgetPwd')||"忘记密码"}}?</router-link>
                    <router-link class="go-reg" to='/user/register' v-text='$t("registerNow")||"立即注册"'></router-link>
                </div>
              </template>
              <!-- 登录验证 -->
              <template v-else>
                <el-form-item :label="$t('loginAuth')||'登录验证'">
                  <el-radio-group v-model="loginData.type">
                    <el-radio label="mobile">{{$t('mobileCode')||'手机验证码'}}</el-radio>
                    <el-radio disabled='disabled' label="google">{{$t('googleCode')||'谷歌验证码'}}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <div class="mobile-code-wrap p-rel">
                  <el-input
                    v-model="loginData.mobileCode"
                    name='mobileCode'
                    :placeholder='$t("mobileCodePlaceholder")||"请输入手机验证码"'
                    :disabled="myMobileCode?false:true"
                    @blur="validate(loginData.mobileCode,'mobileCode')">
                  </el-input>
                  <div @click='getMobileCode'
                    class="mobile-code abs-v-center color-danger">{{$t(this.codeTexti18n)}}{{second}}
                  </div>
                </div>
                <el-form-item>
                  <button
                    @click="loginHandle"
                    class="btn-block btn-large btn-danger btn-active"
                    v-text="$t('login')||'登录'">
                  </button>
                </el-form-item>
              </template>
            </el-form>
        </login-modal>
    </div>
</template>
<script>
import loginModal from "@/components/Login/LoginModal.vue";
import verCode from "@/components/other/verCode";
import { Toast } from "vant";
export default {
  components: { loginModal, verCode },
  data() {
    const bg = require("@/assets/images/user/bg.jpg");
    return {
      bg: `background-image:url(${bg})`,
      checkLoginData: {
        cellphone: "",
        password: "",
        verCode: ""
      },
      loginData: {
        type: "mobile",
        mobileCode: "",
        googleCode: ""
      },
      checkLogin: false,
      codeTexti18n: "getMsgCode",
      second: "",
      myMobileCode: "",
      currentRoute: "",
      oldUrl: "",
      verCodeNumArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      verCodeStr: ""
    };
  },
  mounted() {
    this.createCode(this.verCodeNumArr, 4);
  },
  methods: {
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
      if (!this.canGetCode || !this.Util.isPhone(this.checkLoginData.cellphone))
        return false;
      this.timer = this.Util.timerCounter({
        onStart: t => {
          this.canGetCode = false;
          this.getCodeTimes += 1;
          this.second = `${t}s`;
          this.codeTexti18n = "countDown";
        },
        onCounting: t => {
          this.second = `(${t}s)`;
          this.codeText = "countDown";
        },
        onComplete: () => {
          this.canGetCode = true;
          this.getCodeTimes > 0 && (this.codeTexti18n = "tryAgain");
        }
      });
    },
    loginHandle() {},
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
          val != this.loginData.mobileCode && this.errMsg("手机验证码不正确");
          break;
        case "verCode":
          val != this.verCodeStr && this.errMsg("图形验证码不正确");
          break;
      }
    },
    beforeRouteEnter(to, from, next) {
      this.oldUrl = from.path;
      this.currentRoute = to.path;
    },
    loginStep() {
      for (let key in this.checkLoginData) {
        let item = this.checkLoginData[key];
        if (item == "") {
          this.errMsg("请填写完整信息");
          return;
        }
      }
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
    margin: 32px auto 0 auto;
  }
}
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
  button {
    margin-top: 1px;
  }
  .code {
    width: 95px;
    border: $default-border;
    margin-left: 15px;
  }
}
.mobile-code-wrap {
  margin-bottom: 20px;
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
</style>