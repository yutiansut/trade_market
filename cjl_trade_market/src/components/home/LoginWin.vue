<template>
    <div class="container abs-v-center">
        <div class="win-title" v-text="$t('welcome')"></div>
        <div v-if="userData.isLogin">
            <div class="user-info">
                <h3 class="nick-name" v-text="userData.cellphone"></h3>
                <div class="cellphone">
                    <span><em v-text="$t('accountId')"></em> ：</span>
                    <span class="color-primary"></span>
                </div>
                <div><em v-text="$t('totalEstimate')"></em>：</div>
                <div class="wealth">
                    <span v-show="visiable" class="color-primary" v-text="'￥'+(userData.balance||'0')"></span>
                    <span v-show='!visiable' class="color-primary">*** ***</span>
                    <i @click="hideAccount" class="iconfont" :class="visiable?'icon-eye':'icon-eyeclose'"></i>
                </div>
            </div>
            <div class="break-line"></div>
            <div class="btn-group">
                <button @click.stop='navigateTo("/property")'
                  class="btn-inline btn-hover btn-small btn-danger"
                  v-text="$t('recharge')">
                </button>
                <button @click.stop='navigateTo("/property")'
                  class="btn-inline btn-hover btn-small btn-danger"
                  v-text="$t('withdraw')">
                </button>
                <button @click.stop='navigateTo("/property")'
                  class="btn-inline btn-hover btn-small btn-danger"
                  v-text="$t('myFund')">
                </button>
            </div>
        </div>
        <div v-else>
          <!-- 登录第一步 -->
          <template v-if="!checkLogin">
            <el-input
              @blur="validate(checkLoginData.cellphone,'cellphone')"
              v-model="checkLoginData.cellphone"
              :placeholder="$t('cellphone')||'手机号'">
            </el-input>
            <el-input
              @blur="validate(checkLoginData.password,'password')"
              type='password'
              v-model="checkLoginData.password"
              maxlength='12'
              :placeholder="$t('password')||'密码'">
            </el-input>
            <div class="form-group">
                <div @click="createCode(verCodeNumArr,4)" class="code-box">
                  <ver-code
                    :identifyCode='verCodeStr'
                    :contentHeight='38'
                    :contentWidth='78'>
                  </ver-code>
                </div>
                <div class="code-input">
                  <el-input
                    @blur="validate(checkLoginData.code,'code')"
                    type='tel'
                    v-model="checkLoginData.code"
                    :placeholder="$t('imgCode')||'验证码'">
                  </el-input>
                </div>
            </div>
            <button
              @click.prevent="loginStep"
              class="btn-block btn-large btn-active btn-danger"
              v-text="$t('nextStep')||'下一步'">
            </button>
            <div class="panel">
                <router-link to='/user/resetpwd' v-text="$t('forgetPwd')+'?'||'忘记密码？'"></router-link>
                <router-link to='/user/register' v-text="$t('onlineRegister'||'在线注册')"></router-link>
            </div>
          </template>
          <!-- 登录验证 -->
          <template v-else>
            <el-radio-group v-model="loginData.type">
              <el-radio label="0">{{$t('mobileCode')||'短信验证码'}}</el-radio>
              <el-radio label='1' :disabled='bindGoogleAuth?false:true'>{{$t('googleCode')||'谷歌验证码'}}</el-radio>
            </el-radio-group>
            <div class="mobile-code-wrap p-rel">
              <el-input
                v-show="loginData.type==0"
                v-model="loginData.mobileCode"
                name='mobileCode'
                :placeholder='$t("mobileCodePlaceholder")||"请输入短信验证码"'
                :disabled="myMobileCode?false:true"
                @blur="validate(loginData.mobileCode,'mobileCode')">
              </el-input>
              <el-input
                v-show="loginData.type==1"
                v-model="loginData.googleCode"
                name='googleCode'
                :placeholder='$t("fillGoogleCode")||"请输入谷歌验证码"'
                :disabled="myGoogleCode?false:true"
                @blur="validate(loginData.googleCode,'googleCode')">
              </el-input>
              <div v-show="loginData.type==0"
                @click='getMobileCode'
                class="mobile-code abs-v-center color-danger">{{$t(this.codeTexti18n)}}{{second}}
              </div>
              <div v-show="loginData.type==1"
                @click='getGoogleCode'
                class="mobile-code abs-v-center color-danger">{{$t(this.codeTexti18n)}}{{second}}
              </div>
            </div>
            <button
              @click.prevent="loginHandle"
              class="btn-block btn-large btn-active btn-danger"
              v-text="$t('login')||'登录'">
            </button>
          </template>
        </div>
    </div>
</template>
<script>
import verCode from "@/components/other/verCode";
export default {
  components: {
    verCode
  },
  name: "login-win",
  data() {
    return {
      visiable: 1,
      checkLogin: false,
      checkLoginData: {
        cellphone: "15623454605",
        password: "",
        code: ""
      },
      loginData: {
        type: "0", //1 是google验证，0手机验证
        mobileCode: "",
        googleCode: ""
      },
      bindGoogleAuth: false,
      myGoogleCode: false,
      myMobileCode: false,
      codeTexti18n: "getMsgCode",
      second: "",
      canGetCode: true,
      verCodeStr: "",
      verCodeNumArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      userData: this.userModel
    };
  },
  mounted() {
    this.createCode(this.verCodeNumArr, 4);
  },
  methods: {
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
          this.codeText = "countDown";
        },
        onComplete: () => {
          this.canGetCode = true;
          this.getCodeTimes > 0 && (this.codeTexti18n = "tryAgain");
        }
      });
    },
    getGoogleCode() {},
    getMobileCode() {
      if (!this.canGetCode || !this.Util.isPhone(this.checkLoginData.cellphone))
        return false;
      this.countDown();
      this.request(this.api.sendcodeuser, {
        tel: this.checkLoginData.cellphone
      }).then(res => {
        if (res.code == "0") {
          this.myMobileCode = true;
        }
      });
    },
    // 第一步登录
    loginStep() {
      for (let key in this.checkLoginData) {
        let item = this.checkLoginData[key];
        if (item == "") {
          this.errMsg("请填写完整信息");
          return;
        }
      }
      this.request(this.api.checklogin, {
        tel: this.checkLoginData.cellphone,
        password: this.checkLoginData.password
      }).then(res => {
        if (res && res.code != 1) {
          res.code == 4 && (this.bindGoogleAuth = false);
          res.code == 0 && (this.bindGoogleAuth = true);
          this.checkLogin = true;
        } else {
          this.errMsg(res.msg || "账号或者密码错误");
        }
      });
    },
    // 登录验证
    loginHandle() {
      if (this.loginData.mobileCode == "" && this.loginData.googleCode == "") {
        this.errMsg("请填写完整信息");
        return;
      }
      this.request(this.api.login, {
        type: this.loginData.type,
        code: this.loginData.mobileCode || this.loginData.googleCode
      }).then(res => {
        if (res.code == "0") {
          this.successMsg(res.msg);
          this.userModel.cellphone = this.checkLoginData.cellphone;
          this.storage.set("token", res.data.token);
          this.storage.set("isLogin", true);
          this.storage.set("userInfo", this.userModel);
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
    // y验证
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
        case "myGoogleCode":
          val != this.myGoogleCode && this.errMsg("谷歌验证码不正确");
          break;
        case "verCode":
          val != this.verCodeStr && this.errMsg("图形验证码不正确");
          break;
      }
    },
    hideAccount() {
      this.visiable = !this.visiable;
    },
    //验证方式切换 切换时初始化验证码发送定时器
    onTypeChage() {
      this.timer && clearInterval(this.timer);
      this.codeTexti18n = "getMsgCode";
      this.loginData.mobileCode = "";
      this.loginData.googleCode = "";
      this.second = "";
      this.canGetCode = true;
    }
  }
};
</script>
<style lang="scss" scoped>
$mt: 9px;
.break-line {
  height: 1px;
  background: #e5e5e5;
  margin-top: 20px;
}
.container {
  width: 300px;
  height: 280px;
  right: 180px;
  padding: 20px;
  background: $bg-white;
  box-shadow: 0 0 10px 1px #333;
  z-index: 99;
  .win-title {
    font-size: $font-middile;
    margin-bottom: 10px;
  }
  .el-input,
  .code-box,
  .el-radio-group {
    margin-top: $mt;
  }
  .btn-block {
    margin-top: 19px;
  }
  .panel {
    margin-top: 11px;
  }
  .code-input {
    margin-right: 90px;
  }
  .code-box {
    @include float(right);
    width: 78px;
    height: 38px;
    border: $default-border;
    cursor: pointer;
  }
  .panel {
    display: flex;
    justify-content: space-between;
    a {
      font-weight: 500;
      color: #666666;
      &:hover {
        color: $main-bg-color;
      }
    }
  }
  .user-info {
    font-size: $font-default;
    .nick-name {
      margin-top: 22px;
    }
    .cellphone {
      margin: 27px 0 21px 0;
    }
    .wealth {
      margin-top: 14px;
      .iconfont {
        font-size: $font-ex-large;
        @include float(right);
        cursor: pointer;
      }
    }
  }
  .mobile-code-wrap {
    margin-top: $mt;
    .el-input {
      margin-top: 0;
    }
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
  .btn-group {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }
}
</style>

