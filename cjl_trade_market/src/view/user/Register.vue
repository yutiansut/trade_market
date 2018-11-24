<template>
    <div :style="bg" class="content p-rel">
        <login-modal class="resize" titleText='注册'>
            <el-form
              :model='registerData'
              label-position='top'
              @submit.native.prevent>
                <el-form-item label='手机号'>
                    <el-input
                      v-model.trim="registerData.cellphone"
                      name='cellphone'
                      placeholder='请输入手机号'
                      maxlength='11'
                      @blur="validate(registerData.cellphone,'cellphone')">
                    </el-input>
                </el-form-item>
                <el-form-item label='手机验证码'>
                    <div class="mobile-code-wrap p-rel">
                        <el-input
                          v-model="registerData.mobileCode"
                          name='mobileCode' placeholder='请输入手机验证码'
                          :disabled="myMobileCode?false:true"
                          @blur="validate(registerData.mobileCode,'mobileCode')">
                        </el-input>
                        <div v-text="codeText"
                          @click='getMobileCode'
                          class="mobile-code abs-v-center color-danger">获取验证码
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label='登录密码'>
                   <el-input
                    v-model="registerData.password"
                    name='password' type='password'
                    placeholder='请输入密码'
                    @blur="validate(registerData.password,'password')">
                  </el-input>
                </el-form-item>
                <el-form-item label='图形验证码'>
                    <div class="code-wrap flex flex-between">
                        <el-input
                          v-model="registerData.verCode" name='verCode'
                          placeholder='请输入图形验证码'
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
                <el-form-item label='邀请人（选填）'>
                   <el-input
                      v-model="registerData.recommender"
                      name='recommender'
                      placeholder='请输入邀请人账号'>
                    </el-input>
                </el-form-item>
                <div :class="isAgreed?'active':''" class="agree flex flex-between">
                    <div>
                        <i class="el-icon-circle-check"></i>
                        <span>我已阅读并同意</span>
                        <router-link to=''>《用户使用协议》</router-link>
                    </div>
                    <router-link class="back" to='/user/login'>返回登录</router-link>
                </div>
                <el-form-item>
                    <button @click="formSubmit" class="btn-block btn-large btn-danger btn-active">登录</button>
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
      myMobileCode: false,
      codeText: "获取验证码",
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
      switch (name) {
        case "cellphone":
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
        case "mobileCode":
          if (val == "") {
            this.errMsg("手机验证码不能为空");
          } else if (val != this.registerData.mobileCode) {
            this.errMsg("手机验证码不正确");
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
          this.myMobileCode = true;
          this.registerData.mobileCode = res.data.mobileCode;
        }
      });
      this.Util.timerCounter({
        onStart: t => {
          this.canGetCode = false;
          this.getCodeTimes += 1;
          this.codeText = `倒计时（${t}）s`;
        },
        onCounting: t => {
          this.codeText = `倒计时（${t}）s`;
        },
        onComplete: () => {
          this.canGetCode = true;
          this.getCodeTimes > 0 && (this.codeText = "重新获取");
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