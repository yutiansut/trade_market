<template>
    <div :style="bg" class="content p-rel">
        <login-modal class="resize">
            <el-form label-position='top' @submit.native.prevent>
              <el-form-item label='手机号'>
                <el-input v-model="loginData.account"
                  name='account'
                  placeholder='请输入手机号'
                  @blur="validate(loginData.account,'account')">
                </el-input>
                </el-form-item>
                <el-form-item label='密码'>
                    <el-input
                      v-model="loginData.password"
                      name='password'
                      type='password'
                      placeholder='请输入密码'
                      @blur="validate(loginData.password,'password')">
                    </el-input>
                </el-form-item>
                <el-form-item label='验证码'>
                    <div class="code-wrap flex flex-between">
                        <el-input
                          v-model="loginData.verCode"
                          name='verCode'
                          placeholder='请输入验证码'
                          @blur="validate(loginData.verCode,'verCode')">
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
                    <button @click="formSubmit" class="btn-block btn-large btn-danger btn-active">登录</button>
                </el-form-item>
                <div class="flex flex-between">
                    <router-link to='/user/resetpwd'>忘记密码?</router-link>
                    <router-link class="go-reg" to='/user/register'>立即注册</router-link>
                </div>
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
      loginData: {
        account: "",
        password: "",
        verCode: ""
      },
      canSubmit: false,
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
    validate(val, name) {
      switch (name) {
        case "account":
          if (val == "") {
            this.errMsg("手机号不能为空");
          } else if (!this.Util.isPhone(val)) {
            this.errMsg("手机号码格式不正确");
          }
          break;
        case "password":
          if (val == "") {
            this.errMsg("密码不能为空");
          } else if (!this.Util.isPassword(val)) {
            this.errMsg("密码必须是以英文字母开头的6-12位字符");
          }
          break;
        case "verCode":
          if (val == "") {
            this.errMsg("图片验证码不能为空");
          } else if (val != this.verCodeStr) {
            this.errMsg("图形验证码不正确");
          }
          break;
      }
      this.canSubmit = true;
    },
    beforeRouteEnter(to, from, next) {
      this.oldUrl = from.path;
      this.currentRoute = to.path;
    },
    formSubmit() {
      for (let key in this.loginData) {
        let item = this.loginData[key];
        if (item == "") {
          this.errMsg("请填写完整信息");
          return;
        }
      }
      if (!this.canSubmit) return false;
      this.request(this.api.login, { ...this.loginData }).then(res => {
        if (!res.code) {
          let token = res.token;
          token && this.storage.set("token", token);
          this.userModel.isLogin = true;
          if (this.oldUrl == this.currentRoute) {
            this.navigateTo("/");
          } else {
            this.navigateTo(`${this.oldUrl}`);
          }
        } else {
          Toast({
            message: res.msg
          });
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
</style>