<template>
    <div class="container abs-v-center">
        <div class="win-title" v-text="$t('welcome')"></div>
        <div v-if="userData.isLogin">
            <div class="user-info">
                <h3 class="nick-name">138918984</h3>
                <div class="account">
                    <span><em v-text="$t('accountId')"></em> ：</span>
                    <span class="color-primary" v-text="userData.account"></span>
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
            <el-input
              @blur="validate(formData.account,'account')"
              v-model="formData.account"
              :placeholder="$t('cellphone')||'手机号'">
            </el-input>
            <el-input
              @blur="validate(formData.password,'password')"
              type='password'
              v-model="formData.password"
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
                    @blur="validate(formData.code,'code')"
                    type='tel'
                    v-model="formData.code"
                    :placeholder="$t('imgCode')||'验证码'">
                  </el-input>
                </div>
            </div>
            <button
              @click.prevent="submitForm"
              class="btn-block btn-large btn-active btn-danger"
              v-text="$t('login')||'登录'">
            </button>
            <div class="panel">
                <router-link to='/user/resetpwd' v-text="$t('forgetPwd')+'?'||'忘记密码？'"></router-link>
                <router-link to='/user/register' v-text="$t('onlineRegister'||'在线注册')"></router-link>
            </div>
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
      formData: {
        account: "",
        password: "",
        code: ""
      },
      verCodeStr: "",
      verCodeNumArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      userData: this.userModel
    };
  },
  mounted() {
    this.createCode(this.verCodeNumArr, 4);
  },
  methods: {
    submitForm() {
      for (let key in this.formData) {
        let item = this.formData[key];
        if (item == "") {
          this.errMsg("请填写完整信息");
          return;
        }
      }
      this.request(this.api.login, {
        ...this.formData
      }).then(res => {
        if (!res.code) {
          let token = res.token;
          token && this.storage.set("token", token);
          this.userModel.isLogin = true;
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
    validate(val, name) {
      if (val == "") return;
      switch (name) {
        case "account":
          !this.Util.isPhone(val) && this.errMsg("手机号码格式不正确");
          break;
        case "password":
          !this.Util.isPassword(val) &&
            this.errMsg("密码必须是以英文字母开头的6-12位字符");
          break;
        case "verCode":
          val != this.verCodeStr && this.errMsg("图形验证码不正确");
          break;
      }
    },
    hideAccount() {
      this.visiable = !this.visiable;
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
  min-height: 280px;
  background: $bg-white;
  box-shadow: 0 0 10px 1px #333;

  z-index: 99;
  .win-title {
    font-size: $font-middile;
    margin-bottom: 10px;
  }
  .el-input,
  .code-box {
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
    .account {
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
  .btn-group {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }
}
</style>

