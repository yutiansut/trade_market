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
                    <a href=""></a>
                    <a href=""></a>
                    <a href=""></a>
                </div>
            </div>
            <div style="margin-top:15px;" class="panel">
                <span class="font-16">2.{{$t("scanCode")||"扫描二维码"}}</span>
                <el-row :gutter='10'>
                    <el-col :span='6'>
                        <div class="qr-code p-rel"><img src="" alt=""></div>
                    </el-col>
                    <el-col :span='18'>
                      <p class="color-666">请确保你已备份密钥。如果你的手机丢失、被盗或密钥被删除，你将需要此密钥找回你的谷歌二次验证。 
否则重置你的谷歌二次验证需要提交工单，可能需要很长时间来处理。</p>
<p class="color-666 color-danger">提示：如果您无法扫描二维码，请手动输入账户名、密钥来添加谷歌身份认证账户。</p>
</el-col>
                </el-row>
            </div>
            <el-form label-position='top' @submit.native.prevent>
                <el-form-item :label='$t("key")||"秘钥"'>
                    <div class="input-inner">
                        <el-input name='googleKey' v-model="googleKey"></el-input>
                        <button class="btn-danger btn-large btn-block fr" v-text="$t('copy')||'复制'"></button>
                    </div>
                </el-form-item>
                <div style="margin-bottom:5px" class="font-16">3.{{$t('finishBinding')||"完成绑定"}}</div>
                <el-form-item :label='$t("fillPwd")||"填写登录密码"'>
                    <el-input name='password' :placeholder='$t("fillPwd")||"填写登录密码"' v-model="password"></el-input>
                </el-form-item>
                <el-form-item :label='$t("fillGoogleCode")||"填写谷歌验证码"'>
                    <el-input name='googleCode' :placeholder='$t("fillGoogleCode")||"填写谷歌验证码"' v-model="googleCode"></el-input>
                </el-form-item>
                <button class="confirm-btn btn-block btn-large btn-danger btn-active"
                  v-text="$t('submit')||'确认'">
                </button>
            </el-form>
        </div>
    </dialog-box>
</template>
<script>
export default {
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
      googleKey: "",
      password: "",
      googleCode: ""
    };
  },
  watch: {
    show: function() {
      this.showModal = this.show;
    }
  },
  methods: {
    formSubmit() {},
    closeModal() {
      this.showModal = false;
      this.$emit("closeModal");
    }
  }
};
</script>
<style lang="scss" scoped>
.panel {
  .el-row {
    margin-top: 15px;
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
      margin-left: 15px;
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
  }
}
.qr-code {
  display: block;
  padding-top: 100%;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>

