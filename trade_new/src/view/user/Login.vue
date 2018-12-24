<template>
  <div
    :style="bg"
    class="content p-rel"
  >
    <login-modal
      class="resize"
      :titleText='$t("login")||"登录"'
    >
      <el-form
        label-position='top'
        @submit.native.prevent
      >
        <!-- 登录第一步 -->
        <template v-if="!checkLogin">
          <el-form-item :label='$t("label154")'>
            <el-input
              v-model="checkLoginData.username"
              name='username'
              :placeholder='$t("label162")'
              @blur="validate(checkLoginData.username,'username')"
            >
            </el-input>
          </el-form-item>
          <el-form-item :label='$t("password")||"密码"'>
            <el-input
              v-model="checkLoginData.password"
              name='password'
              type='password'
              :placeholder='$t("pwdPlaceholder")||"请输入密码"'
              @blur="validate(checkLoginData.password,'password')"
            >
            </el-input>
          </el-form-item>
          <el-form-item :label='$t("imgCode")||"验证码"'>
            <div class="code-wrap flex flex-between">
              <el-input
                v-model="checkLoginData.verCode"
                name='verCode'
                :placeholder='$t("imgCodePlaceholder")||"请输入验证码"'
                @blur="validate(checkLoginData.verCode,'verCode')"
              >
              </el-input>
              <div
                @click="createCode(verCodeNumArr,4)"
                class="code"
              >
                <ver-code
                  :contentHeight='38'
                  :identifyCode='verCodeStr'
                >
                </ver-code>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <button
              @click="loginStep"
              class="btn-block btn-large btn-danger btn-active"
              v-text="$t('nextStep')||'下一步'"
            >
            </button>
          </el-form-item>
          <div class="flex flex-between">
            <router-link to='/user/resetpwd'>{{$t('forgetPwd')||"忘记密码"}}?</router-link>
            <router-link
              class="go-reg"
              to='/user/register'
              v-text='$t("registerNow")||"立即注册"'
            ></router-link>
          </div>
        </template>
        <!-- 登录验证 -->
        <template v-else>
          <el-form-item :label="$t('loginAuth')||'登录验证'">
            <el-radio-group v-model="loginData.type">
              <el-radio label="2">{{$t('mobileCode')||'手机验证码'}}</el-radio>
              <el-radio
                label='1'
                :disabled='bindGoogleAuth?false:true'
              >
                {{$t('googleCode')||'谷歌验证码'}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="mobile-code-wrap p-rel">
            <el-input
              v-show="loginData.type==2"
              v-model="loginData.mobileCode"
              name='mobileCode'
              :placeholder='$t("mobileCodePlaceholder")||"请输入短信验证码"'
              :disabled="myMobileCode?false:true"
            >
            </el-input>
            <el-input
              v-show="loginData.type==1"
              v-model="loginData.googleCode"
              name='googleCode'
              :placeholder='$t("fillGoogleCode")||"请输入谷歌验证码"'
            >
            </el-input>
            <div
              v-show="loginData.type==2"
              @click='getMobileCode'
              class="mobile-code abs-v-center color-danger"
            >{{$t(this.codeTexti18n)}}{{second}}
            </div>
          </div>
          <el-form-item>
            <button
              @click="loginHandle"
              class="btn-block btn-large btn-danger btn-active"
              v-text="$t('login')||'登录'"
            >
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
        username: "",
        cellphone: "",
        password: "",
        verCode: ""
      },
      canGetCode: true,
      loginData: {
        type: "2", //1 是google验证，0手机验证
        mobileCode: "",
        googleCode: ""
      },
      bindGoogleAuth: false,
      checkLogin: false,
      getCodeTimes: 0,
      codeTexti18n: "getMsgCode",
      myGoogleCode: "",
      second: "",
      myMobileCode: "",
      verCodeNumArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      verCodeStr: "",
      oldPath: "",
      canSubmit: false
    };
  },
  mounted() {
    this.createCode(this.verCodeNumArr, 4);
  },

  methods: {
    // 生成图片验证码
    createCode(arr, len) {
      let str = "";
      for (let i = 0; i < len; i++) {
        str += this.verCodeNumArr[
          this.Util.randomNum(0, this.verCodeNumArr.length)
        ];
      }
      this.verCodeStr = str;
    },
    // 获取手机验证码
    getMobileCode() {
      if (!this.canGetCode || !this.Util.isPhone(this.checkLoginData.cellphone))
        return false;
      this.countDown();
      this.request(this.api.sendcodeuser, {
        tel: this.checkLoginData.cellphone,
        showLoading: true
      }).then(res => {
        if (res.code == "0") {
          this.myMobileCode = true;
        } else {
          this.errMsg(res.msg || "获取验证码失败");
        }
      });
    },
    // 倒计时函数
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
          if (this.getCodeTimes > 0) {
            this.codeTexti18n = "tryAgain";
            this.second = "";
          }
        }
      });
    },
    // 表单验证
    validate(val, name) {
      if (val == "") return;
      this.canSubmit = true;
      switch (name) {
        case "username":
          if (!this.Util.isUserName(val)) {
            this.errMsg("label159");
            this.canSubmit = false;
          }
          break;
        case "cellphone":
          if (!this.Util.isPhone(val) && !this.Util.isEmail(val)) {
            this.errMsg("label156");
            this.canSubmit = false;
          }
          break;
        case "password":
          if (!this.Util.isPassword(val)) {
            this.errMsg("label124");
            this.canSubmit = false;
          }
          break;
        case "verCode":
          if (val != this.verCodeStr) {
            this.errMsg("label126");
            this.canSubmit = false;
          }
          break;
      }
    },
    // 登录验证
    loginHandle() {
      if (this.loginData.mobileCode == "" && this.loginData.googleCode == "") {
        this.errMsg("请填写完整信息");
        return;
      }
      this.request(this.api.login, {
        type: this.loginData.type,
        tel: this.checkLoginData.cellphone,
        code: this.loginData.mobileCode || this.loginData.googleCode,
        showLoading: true
      }).then(res => {
        if (res && res.code != "0") {
          this.errMsg(res.msg || "登录失败");
          return false;
        }
        this.successMsg(res.msg);
        this.userModel.cellphone = this.checkLoginData.cellphone;
        this.userModel.isLogin = true;
        this.storage.set("isLogin", true);
        this.storage.set("token", res.data.token);
        this.storage.set("cellphone", this.checkLoginData.cellphone);
        this.navigateTo("/");
      });
    },
    // 登录第一步
    loginStep() {
      for (let key in this.checkLoginData) {
        let item = this.checkLoginData[key];
        if (item == "") {
          this.errMsg("请填写完整信息");
          return;
        }
      }
      if (!this.canSubmit) return;
      this.request(this.api.checklogin, {
        tel: this.checkLoginData.cellphone,
        password: this.checkLoginData.password,
        showLoading: true
      }).then(res => {
        if (res.code == 0 || res.code == 10000) {
          res.code == 10000 && (this.bindGoogleAuth = false);
          res.code == 0 && (this.bindGoogleAuth = true);
          this.checkLogin = true;
        } else {
          this.errMsg(res.msg || "账号或者密码错误");
        }
      });
    },
    //验证方式切换 切换时初始化验证码发送定时器
    onTypeChage() {
      this.timer && clearInterval(this.timer);
      this.codeTexti18n = "getMsgCode";
      this.loginData.mobileCode = "";
      this.loginData.googleCode = "";
      this.second = "";
      this.canGetCode = true;
      this.navigateTo("/");
    }
  },
  watch: {
    "loginData.type": "onTypeChage"
  }
};
</script>
<style lang="scss" scoped>
.content {
  padding: 1px;
  min-height: calc(100% - 294px);
  background-size: 105% auto;
  background-repeat: no-repeat;
  background-position: center 0;
  .resize {
    margin: 40px auto 0 auto;
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