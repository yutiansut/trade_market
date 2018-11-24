<template>
    <div :style="bg" class="content p-rel">
        <login-modal class="resize"
            titleText="重置登录密码">
            <el-form label-position='top' @submit.native.prevent>
                <el-form-item label='手机号'>
                    <el-input
                      name='cellphone'
                      placeholder='请输入账号'
                      v-model="formData.cellphone"
                      maxlength='11'
                      @blur="validate(formData.cellphone,'cellphone')">
                    </el-input>
                </el-form-item>
                <el-form-item label='手机验证码'>
                    <div class="mobile-code-wrap p-rel">
                        <el-input
                          name='mobileCode'
                          placeholder='请输入手机验证码'
                          v-model="formData.mobileCode"
                          :disabled='myMobileCode?false:true'
                          @blur="validate(formData.mobileCode,'mobileCode')">
                        </el-input>
                        <div
                          class="mobile-code abs-v-center color-danger"
                          v-text="codeText"
                          @click='getMobileCode'>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label='登录密码'>
                    <el-input
                      name='password'
                      type='password'
                      placeholder='请输入密码'
                      v-model="formData.password"
                      @blur="validate(formData.password,'password')">
                    </el-input>
                </el-form-item>
                <el-form-item label='图形验证码'>
                    <div class="code-wrap flex flex-between">
                        <el-input
                          name='verCode'
                          placeholder='请输入验证码'
                          v-model="formData.verCode"
                          @blur="validate(formData.verCode,'verCode')">
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
                    <button @click="submitForm"
                      class="btn-block btn-large btn-danger btn-active">提交
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
      formData: {
        cellphone: "",
        mobileCode: "",
        password: "",
        verCode: ""
      },
      myMobileCode: "",
      canGetCode: true,
      verCodeStr: "",
      getCodeTimes: 0,
      codeText: "获取验证码",
      verCodeNumArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
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
      if (!this.canGetCode || !this.Util.isPhone(this.formData.cellphone))
        return false;
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
            this.errMsg("密码必须包含字母");
          }
          break;
        case "mobileCode":
          if (val == "") {
            this.errMsg("手机验证码不能为空");
          } else if (val != this.myMobileCode) {
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
    submitForm() {
      for (let key in this.formData) {
        let item = this.formData[key];
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
    margin: 32px auto 50px auto;
  }
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
    cursor: pointer;
    right: 15px;
    &:hover {
      opacity: 0.8;
    }
    &.color-danger {
      color: $color-danger;
    }
  }
}
</style>