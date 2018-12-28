<template>
  <div class="container abs-v-center">
    <div
      class="win-title"
      v-text="$t('welcome')"
    ></div>
    <div v-if="userData.isLogin">
      <div class="user-info">
        <h3
          class="nick-name"
          v-text="userData.member"
        ></h3>
        <!-- <div class="cellphone">
          <span><em v-text="$t('accountId')"></em> ：{{userData.account}}</span>
          <span class="color-primary"></span>
        </div> -->
        <div><em v-text="$t('totalEstimate')"></em>：</div>
        <div class="wealth">
          <span
            v-show="visiable"
            class="color-primary"
            v-text="'￥'+(userData.balance||'0')"
          ></span>
          <span
            v-show='!visiable'
            class="color-primary"
          >*** ***</span>
          <i
            @click="hideAccount"
            class="iconfont"
            :class="visiable?'icon-eye':'icon-eyeclose'"
          ></i>
        </div>
      </div>
      <div class="break-line"></div>
      <div class="btn-group">
        <button
          @click.stop='navigateTo("/property")'
          class="btn-inline btn-hover btn-small btn-danger"
          v-text="$t('recharge')"
        >
        </button>
        <button
          @click.stop='navigateTo("/property")'
          class="btn-inline btn-hover btn-small btn-danger"
          v-text="$t('withdraw')"
        >
        </button>
        <button
          @click.stop='navigateTo("/property")'
          class="btn-inline btn-hover btn-small btn-danger"
          v-text="$t('myFund')"
        >
        </button>
      </div>
    </div>
    <div v-else>
      <!-- 登录第一步 -->
      <template v-if="!checkLogin">
        <el-input
          @blur="validate(checkLoginData.account,'account')"
          v-model="checkLoginData.account"
          :placeholder="$t('label162')||'请输入用户名'"
        >
        </el-input>
        <el-input
          @blur="validate(checkLoginData.password,'password')"
          type='password'
          v-model="checkLoginData.password"
          maxlength='12'
          :placeholder="$t('password')||'密码'"
        >
        </el-input>
        <div class="form-group">
          <div
            @click="createCode(verCodeNumArr,4)"
            class="code-box"
          >
            <ver-code
              :identifyCode='verCodeStr'
              :contentHeight='38'
              :contentWidth='78'
            >
            </ver-code>
          </div>
          <div class="code-input">
            <el-input
              @blur="validate(checkLoginData.code,'code')"
              type='tel'
              v-model="checkLoginData.code"
              :placeholder="$t('imgCode')||'验证码'"
            >
            </el-input>
          </div>
        </div>
        <button
          @click.prevent="loginStep"
          class="btn-block btn-large btn-active btn-danger"
          v-text="$t('nextStep')||'下一步'"
        >
        </button>
        <div class="panel">
          <router-link
            to='/user/resetpwd'
            v-text="$t('forgetPwd')+'?'||'忘记密码？'"
          ></router-link>
          <router-link
            to='/user/register'
            v-text="$t('onlineRegister'||'在线注册')"
          ></router-link>
        </div>
      </template>
      <!-- 登录验证 -->
      <template v-else>
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
        <!-- <el-input
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
        </el-input> -->
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
        <button
          @click.prevent="loginHandle"
          class="btn-block btn-large btn-active btn-danger"
          v-text="$t('login')||'登录'"
        >
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
        account: "",
        password: "",
        code: ""
      },
      loginData: {
        type: "", //0 是google验证，1手机验证,2邮箱验证
        code: ""
      },
      bindGoogleAuth: false,
      bindCellphone: false,
      bindEmail: false,
      myCode: false,
      myTel: "",
      myEmail: "",
      myGoogle: "",
      codeTexti18n: "getMsgCode",
      second: "",
      canGetCode: true,
      verCodeStr: "",
      verCodeNumArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      userData: this.userModel,
      canSubmit: false
    };
  },
  mounted() {
    this.createCode(this.verCodeNumArr, 4);
    if (this.storage.get("isLogin")) {
      this.getUserInfo();
    }
    this.$bus.on("onLogout", () => {
      this.initData();
    });
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      this.request(this.api.userinfo).then(res => {
        console.log(`个人信息:${JSON.stringify(res)}`);
        if (res.code == "0" && res.data) {
          this.userData = Object.assign({}, this.userData, {
            balance: res.data.amount * 1,
            tel: res.data.userinfo[0] && res.data.userinfo[0].tel,
            email: res.data.userinfo[0] && res.data.userinfo[0].email,
            member: res.data.userinfo[0] && res.data.userinfo[0].member
          });
        } else {
          this.errMsg(res.msg);
        }
      });
    },
    initData() {
      this.userData.isLogin = false;
      this.userModel.isLogin = false;
      this.canGetCode = true;
      this.checkLogin = false;
      this.loginData = {
        type: "2",
        code: ""
      };
      this.checkLoginData = {
        account: "",
        password: "",
        code: ""
      };
      this.codeTexti18n = "getMsgCode";
      this.timer && clearInterval(this.timer);
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
          this.codeText = "countDown";
        },
        onComplete: () => {
          this.canGetCode = true;
          this.getCodeTimes > 0 && (this.codeTexti18n = "tryAgain");
        }
      });
    },
    sendCode() {
      if (!this.canGetCode) return false;
      this.countDown();
      if (this.loginData.type == "2") {
        // 获取邮箱验证码
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
        // 获取手机验证码
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
    // 第一步登录
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
        this.bindGoogleAuth = res.data.isGoogle;
        this.bindCellphone = res.data.isCellphone;
        this.bindEmail = res.data.isEmail;
        this.bindGoogleAuth = res.data.isgoogle;
        this.bindCellphone = res.data.istel;
        this.myTel = res.data.tel || "";
        this.myEmail = res.data.email || "";
        this.myGoogle = res.data.google || "";
        this.bindEmail = res.data.isemail;
        this.checkLogin = true;
      });
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
        this.storage.set("isLogin", true);
        this.storage.set("token", res.data.token);
        if (res.data.userinfo && res.data.userinfo[0]) {
          this.userData.cellphone = res.data.userinfo[0].tel || "";
          this.userData.email = res.data.userinfo[0].email || "";
          this.userData.member = res.data.userinfo[0].member;
          this.storage.set("cellphone", this.userData.cellphone);
          this.storage.set("email", this.userData.email);
        }
        this.userData.isLogin = true;
        this.getUserInfo();
        this.userModel = this.userData;
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
        case "code":
          if (val != this.verCodeStr) {
            this.errMsg("label126");
            this.canSubmit = false;
          }
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
      this.loginData.code = "";
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
  min-height: 208px;
  max-height: 304px;
  border-radius: 2px;
  box-sizing: border-box;
  right: 320px;
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
  .el-radio {
    margin-left: 0;
    margin-top: 10px;
    &:first-child {
      margin-right: 10px;
    }
  }
}
</style>

