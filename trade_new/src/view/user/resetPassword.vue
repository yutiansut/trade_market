<template>
  <div
    :style="bg"
    class="content p-rel"
  >
    <login-modal
      class="resize"
      titleText="重置登录密码"
    >
      <el-form
        label-position='top'
        @submit.native.prevent
      >
        <el-form-item :label="$t('label163')">
          <el-radio-group v-model="veriType">
            <el-radio label="0">{{$t('mobileCode')}}</el-radio>
            <el-radio label='1'>
              {{$t('label161')}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 输入邮箱或者手机 -->
        <el-form-item
          v-show='veriType=="0"'
          :label='$t("cellphone")'
        >
          <el-input
            :placeholder='$t("mobilePlaceholder")'
            v-model="formData.account"
            maxlength='11'
            @blur="validate(formData.account,'account')"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          v-show='veriType=="1"'
          :label='$t("email")'
        >
          <el-input
            :placeholder='$t("emailPlaceholder")'
            v-model="formData.account"
            maxlength='11'
            @blur="validate(formData.account,'account')"
          >
          </el-input>
        </el-form-item>
        <!-- 输入验证码 -->
        <el-form-item :label='veriType=="0"?$t("mobileCode"):$t("label161")'>
          <div class="mobile-code-wrap p-rel">
            <el-input
              v-model="formData.code"
              name='code'
              :placeholder='veriType=="0"?$t("mobileCodePlaceholder"):$t("emailCodePlaceholder")'
              :disabled="myCode?false:true"
            >
            </el-input>
            <div
              class="mobile-code abs-v-center color-danger"
              @click='getcode'
            >{{$t(this.codeTexti18n)}}{{second}}
            </div>
          </div>
        </el-form-item>
        <el-form-item label='登录密码'>
          <el-input
            name='password'
            type='password'
            placeholder='请输入密码'
            v-model="formData.password"
            @blur="validate(formData.password,'password')"
          >
          </el-input>
        </el-form-item>
        <el-form-item label='图形验证码'>
          <div class="code-wrap flex flex-between">
            <el-input
              name='verCode'
              placeholder='请输入验证码'
              v-model="formData.verCode"
              @blur="validate(formData.verCode,'verCode')"
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
            @click="submitForm"
            class="btn-block btn-large btn-danger btn-active"
          >提交
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
      veriType: "0",
      formData: {
        account: "",
        code: "",
        password: "",
        verCode: ""
      },
      second: "",
      mycode: false,
      canGetCode: true,
      verCodeStr: "",
      getCodeTimes: 0,
      codeText: "获取验证码",
      codeTexti18n: "getMsgCode",
      verCodeNumArr: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      canSubmit: false
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
          this.getCodeTimes > 0 && (this.codeTexti18n = "tryAgain");
        }
      });
    },
    getcode() {
      if (!this.canGetCode) return false;
      this.countDown();
      let codeType = this.veriType == 0 ? "2" : "3";
      this.request(this.api.code, {
        account: this.formData.account,
        type: codeType,
        showLoading: true
      }).then(res => {
        if (res.code == "0") {
          this.myCode = true;
          this.successMsg(res.msg || "发送成功");
        } else {
          this.errMsg(res.msg || "发送失败");
        }
      });
    },
    validate(val, name) {
      if (val == "") {
        this.errMsg("请填写完整信息");
        return false;
      }
      this.canSubmit = true;
      switch (name) {
        case "account":
          if (!this.Util.isPhone(val) && !this.Util.isEmail(val)) {
            this.errMsg("label156");
            this.canSubmit = false;
          }
          break;
        case "password":
          if (!this.Util.isPassword(val)) {
            this.errMsg("密码必须包含字母");
            this.canSubmit = false;
          }
          break;
        case "code":
          if (val != this.mycode) {
            this.errMsg("手机验证码不正确");
            this.canSubmit = false;
          }
          break;
        case "verCode":
          if (val != this.verCodeStr) {
            this.errMsg("图形验证码不正确");
            this.canSubmit = false;
          }
          break;
      }
    },
    submitForm() {
      this.request(this.api.forgetpwd, {
        type: this.veriType,
        account: this.formData.account,
        code: this.formData.code,
        password: this.formData.password
      }).then(res => {
        if (res.code == "0") {
          this.successMsg(res.msg);
          this.navigateTo("/user/login");
        }
      });
    }
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