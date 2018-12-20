<template>
    <dialog-box
        :showDialog="showModal"
        width='560px'
        :showHeaderImg="false"
        :headerTitle='$t("googleAuth")||title'
        :showHeaderTitle='true'
        @onDialogClose='closeModal'>
        <div class="content">
            <div class="panel">
                <span class="font-16">1.{{$t('download')||"下载安装"}}</span>
                <div class="down-load flex flex-between">
                    <a :style="{backgroundImage:'url('+downLoad_1+')'}" href=""></a>
                    <a :style="{backgroundImage:'url('+downLoad_2+')'}" href=""></a>
                    <a :style="{backgroundImage:'url('+downLoad_3+')'}" href=""></a>
                </div>
            </div>
            <div style="margin-top:15px;" class="panel">
                <span class="font-16">2.{{$t("scanCode")||"扫描二维码"}}</span>
                <el-row :gutter='10'>
                    <el-col :span='6'>
                        <div class="qr-code p-rel">
                          <vue-qr
                            class="img"
                            :text="qrUrl"
                            :margin="0"
                            :size="106">
                          </vue-qr>
                        </div>
                    </el-col>
                    <el-col :span='18'>
                      <template v-if="$i18n.locale=='zh-CN'">
                        <p class="color-666">请确保你已备份密钥。
                          如果你的手机丢失、被盗或密钥被删除，你将需要此密钥找回你的谷歌二次验证。
                          否则重置你的谷歌二次验证需要提交工单，
                          可能需要很长时间来处理。
                        </p>
                        <p class="color-666 color-danger">提示：如果您无法扫描二维码，请手动输入账户名、密钥来添加谷歌身份认证账户。</p>
                      </template>
                      <template v-if="$i18n.locale=='en-US'">
                        <p style="text-align:justify;" class="color-666">Make sure that you have backup of the Key. 
                          The Key is used to get your google authenitication code when your cellphone is missing or stolen, or Key is deleted.
                          Otherwise,you need to submit a work order to reset the secondary google auth, which may take a very long time to deal with.
                        </p>
                        <p class="color-666 color-danger">Note:If you cannot scan the code, please input your account and key to add google auth account</p>
                      </template>
                    </el-col>
                </el-row>
            </div>
            <el-form label-position='top' @submit.native.prevent>
                <el-form-item :label='$t("key")||"秘钥"'>
                    <div class="input-inner">
                        <el-input name='googleKey' v-model="googleKey"></el-input>
                        <button class="btn-danger btn-large btn-block fr"
                          v-clipboard:copy="googleKey"
                          v-clipboard:success="onCopy"
                          v-text="$t('copy')||'复制'">
                        </button>
                    </div>
                </el-form-item>
                <div style="margin-bottom:5px" class="font-16">3.{{$t('finishBinding')||"完成绑定"}}</div>
                <el-form-item :label='$t("fillPwd")||"填写登录密码"'>
                    <el-input name='password' :placeholder='$t("fillPwd")||"填写登录密码"' v-model="password"></el-input>
                </el-form-item>
                <el-form-item :label='$t("fillGoogleCode")||"填写谷歌验证码"'>
                    <el-input name='googleCode' :placeholder='$t("fillGoogleCode")||"填写谷歌验证码"' v-model="googleCode"></el-input>
                </el-form-item>
                <button
                  @click="submitForm"
                  class="confirm-btn btn-block btn-large btn-danger btn-active"
                  v-text="$t('submit')||'确认'">
                </button>
            </el-form>
        </div>
    </dialog-box>
</template>
<script>
import VueQr from "vue-qr";

export default {
  components: { VueQr },
  props: {
    title: { type: String, default: "谷歌验证" },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showModal: this.show,
      qrUrl: "",
      password: "",
      googleCode: "",
      downLoad_1: require("@/assets/images/user/download_1.jpg"),
      downLoad_2: require("@/assets/images/user/download_2.jpg"),
      downLoad_3: require("@/assets/images/user/download_3.jpg")
    };
  },
  computed: {
    googleKey() {
      return this.qrUrl.substr(this.qrUrl.indexOf("=") + 1);
    }
  },
  created() {
    this.getGoogleKey();
  },
  watch: {
    show: function() {
      this.showModal = this.show;
    }
  },
  methods: {
    submitForm() {
      if (
        this.googleKey == "" ||
        this.password == "" ||
        this.googleCode == ""
      ) {
        this.errMsg("请填写完整信息");
        return false;
      }
      this.request(this.api.addgoogle, {
        googlekey: this.googleKey,
        password: this.password,
        googlecode: this.googleCode,
        showLoading: true
      }).then(res => {
        if (res.code == "0") {
          this.successMsg(res.msg || "操作成功");
          this.showModal = false;
          this.$emit("onGoogleBind");
        } else {
          this.errMsg(res.msg);
        }
      });
    },
    onCopy() {
      this.successMsg("label136");
    },
    closeModal() {
      this.showModal = false;
      this.$emit("closeModal");
    },
    getGoogleKey() {
      this.request(this.api.getgooglekey).then(res => {
        if (res.code == "0") {
          this.qrUrl = res.data.result;
        } else {
          this.errMsg(res.msg || "获取数据失败");
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.panel {
  .el-row {
    margin-top: 15px;
  }
  .el-col {
    p {
      line-height: 1.5;
      &:last-child {
        margin-top: 4px;
      }
    }
  }
}
.el-form-item {
  margin-bottom: 20px;
  .input-inner {
    overflow: hidden;
    .el-input {
      float: left;
      width: 360px;
    }
    button {
      width: 85px;
    }
  }
}
.confirm-btn {
  margin: 30px 0 20px 0;
}
.down-load {
  margin-top: 14px;
  a {
    display: inline-block;
    height: 40px;
    border: 1px solid #b72022;
    width: 30%;
    background-repeat: no-repeat;
    background-position: center;
  }
}
.qr-code {
  display: block;
  padding-top: 100%;
  .img {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>

