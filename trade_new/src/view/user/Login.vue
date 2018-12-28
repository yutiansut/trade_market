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
              v-model="checkLoginData.account"
              name='account'
              :placeholder='$t("label162")'
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
              <el-radio
                :disabled='bindCellphone?false:true'
                label="1"
              >{{$t('mobileCode')||'手机验证码'}}</el-radio>
              <el-radio
                label='0'
                :disabled='bindGoogleAuth?false:true'
              >
                {{$t('googleCode')||'谷歌验证码'}}
              </el-radio>
              <el-radio
                label='2'
                :disabled='bindEmail?false:true'
              >
                {{$t('label161')||'邮箱验证码'}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item>
            <el-input
              v-show="loginData.type=='1'"
              v-model='loginData.codeAccount'
              :placeholder='$t("mobilePlaceholder")'
            >
            </el-input>
            <el-input
              v-show="loginData.type=='2'"
              v-model='loginData.codeAccount'
              :placeholder='$t("emailPlaceholder")'
            >
            </el-input>
          </el-form-item> -->
          <div class="mobile-code-wrap p-rel">
            <el-input
              v-show="loginData.type!=''&&loginData.type!='0'"
              v-model="loginData.code"
              name='mobileCode'
              :placeholder='loginData.type=="1"?$t("mobileCode"):$t("label161")'
              :disabled="myCode?false:true"
            >
            </el-input>
            <el-input
              v-show="loginData.type!=''&&loginData.type=='0'"
              v-model="loginData.code"
              name='googleCode'
              :placeholder='$t("fillGoogleCode")||"请输入谷歌验证码"'
            >
            </el-input>
            <div
              v-show="loginData.type!=''&&loginData.type!='0'"
              @click='sendCode'
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
        account: "",
        password: "",
        verCode: ""
      },
      canGetCode: true,
      loginData: {
        type: "", //0 是google验证，1手机验证,2邮箱
        code: ""
      },
      myTel: "",
      myEmail: "",
      myGoogle: "",
      bindGoogleAuth: false,
      bindEmail: false,
      bindCellphone: false,
      checkLogin: false,
      getCodeTimes: 0,
      codeTexti18n: "getMsgCode",
      second: "",
      myCode: "",
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
    sendCode() {
      if (!this.canGetCode) return false;
      this.countDown();
      if (this.loginData.type == "2") {
        this.request(this.api.sendemailcode, {
          email: this.myEmail,
          showLoading: true
        }).then(res => {
          if (res.code == "0") {
            this.myCode = true;
            this.successMsg(res.msg);
          } else {
            this.errMsg(res.msg || "获取验证码失败");
          }
        });
      } else {
        this.request(this.api.sendcodeuser, {
          tel: this.myTel,
          showLoading: true
        }).then(res => {
          if (res.code == "0") {
            this.myCode = true;
            this.successMsg(res.msg);
          } else {
            this.errMsg(res.msg || "获取验证码失败");
          }
        });
      }
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
        case "account":
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
      if (this.loginData.code == "") {
        this.errMsg("请填写完整信息");
        return;
      }
      let account = "";
      if (this.loginData.type == "0") {
        account = this.myGoogle;
      } else if (this.loginData.type == "1") {
        account = this.myTel;
      } else if (this.loginData.type == "2") {
        account = this.myEmail;
      }
      this.request(this.api.login, {
        type: this.loginData.type,
        code: this.loginData.code,
        account: account,
        showLoading: true
      }).then(res => {
        if (res && res.code != "0") {
          this.errMsg(res.msg || "登录失败");
          return false;
        }
        this.successMsg(res.msg);
        this.userModel.isLogin = true;
        this.storage.set("isLogin", true);
        this.storage.set("token", res.data.token);
        this.navigateTo("/");
        if (res.data.userinfo && res.data.userinfo[0]) {
          this.userModel.cellphone = res.data.userinfo[0].tel;
          this.userModel.email = res.data.userinfo[0].email;
          this.storage.set("cellphone", res.data.userinfo[0].tel || "");
          this.storage.set("email", res.data.userinfo[0].email || "");
        }
      });
    },
    // 登录第一步
    loginStep() {
      if (!this.canSubmit) return;
      this.request(this.api.checklogin, {
        account: this.checkLoginData.account,
        password: this.checkLoginData.password,
        showLoading: true
      }).then(res => {
        if (res && res.code == "30") {
          this.errMsg(res.msg || "登录失败");
          return false;
        }
        this.bindGoogleAuth = res.data.isgoogle;
        this.bindCellphone = res.data.istel;
        this.bindEmail = res.data.isemail;
        this.myTel = res.data.tel || "";
        this.myEmail = res.data.email || "";
        this.myGoogle = res.data.google || "";
        this.checkLogin = true;
      });
    },
    //验证方式切换 切换时初始化验证码发送定时器
    onTypeChage() {
      this.timer && clearInterval(this.timer);
      this.codeTexti18n = "getMsgCode";
      this.loginData.code = "";
      this.second = "";
      this.canGetCode = true;
      this.myCode = false;
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