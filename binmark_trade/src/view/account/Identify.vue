<template>
  <div class="content">
    <div
      class="title font-18 font-bold"
      v-text="$t('idCert')||'身份认证'"
    ></div>
    <div class="text-panel">
      <template v-if="$i18n.locale=='zh-CN'">
        <dl>
          <dt class="font-bold">照片要求</dt>
          <dd>1. 照片文件大小不能超过4M！文件格式须为jpg或者png！</dd>
          <dd>2. 请确保照片无水印，无污渍，身份信息清晰，头像完整，非文字反向照片！照片请勿进行PS处理！</dd>
          <dd>3. 手持身份证照片：需要您本人<span class="color-warning">一只手持您的身份证</span>
            ，另一只手持一张有您<span class="color-warning">手写的xx网账号ID的白纸。</span>
            确保身份证和白纸在您的胸前，不遮挡您的脸部，并且身份证和白纸上的信息清晰可见！</dd>
        </dl>
        <div style="margin-top:30px;">手持白纸请手写以下内容，内容不符者不予通过。<span class="color-warning">
            “本人知晓虚拟币投资风险巨大，自愿参与，自担风险，保证身份信息不提供给他人，
            不使用binmark账号进行非法行为，如有违反，本人愿意承担法律风险。”以下图片仅作为示例，
            请提交您本人的身份材料照片。照片勿进行PS处理！
          </span>
        </div>
      </template>
      <template v-if="$i18n.locale=='en-US'">
        <dl>
          <dt class="font-bold">Requirment:</dt>
          <dd>1. 4Mb JPG,PNG formated photo file </dd>
          <dd>2. Make sure the photo is clean,clear and watermark free,and do not beautify them</dd>
          <dd>3. You must <span class="color-danger">hold your ID card in one hand</span> and
            <span class="color-danger">a paper that your account Id written on</span> on the other.
            Make sure that the ID card and the paper must be in front of your chest,
            and infomation on it must be clear, and don not cover your face
          </dd>
        </dl>
        <div style="margin-top:30px;">The content on the paper on your hand should contain the followings:
          <span class="color-warning">"I am very clear about the risk in the investment, and I join in it on my own wish and on my own risk.
            I guarantee that I will keep the ID information confidential and keep it secret to other people",
          </span>,any other content will be considered invalid. Please upload your own ID photo and required documents.
        </div>
      </template>
    </div>
    <el-row :gutter='15'>
      <el-col :span="8">
        <span v-text="$t('idFront')||'拍摄身份证人像面'"></span>
        <div
          element-loading-background="rgba(0, 0, 0, 0.4)"
          v-loading='showLoading_1'
          class="p-rel upload-zone"
        >
          <input
            class="upload-input abs-vh-center"
            type="file"
            @change="uploadId('1',$event)"
            value=""
            accept="image/png,image/gif,image/jpeg"
          />
          <button
            v-show="!hideUploadBtn_1"
            class="btn-inline abs-vh-center btn-large btn-danger"
            v-text="$t('uploadPhoto')||'上传照片'"
          >
          </button>
          <img
            :style="defaultImg_1"
            class="image-preview"
            :src="formData.faceIdPhoto"
            alt=""
          >
        </div>
      </el-col>
      <el-col :span="8">
        <span v-text="$t('idBack')||'拍摄身份证国徽面'"></span>
        <div
          element-loading-background="rgba(0, 0, 0, 0.4)"
          v-loading='showLoading_2'
          class="p-rel upload-zone"
        >
          <input
            class="upload-input abs-vh-center"
            type="file"
            accept="image/png,image/gif,image/jpeg"
            @change="uploadId('2',$event)"
            value=""
          />
          <button
            v-show="!hideUploadBtn_2"
            class="btn-inline abs-vh-center btn-large btn-danger"
            v-text="$t('uploadPhoto')||'上传照片'"
          >
          </button>
          <img
            :style="defaultImg_2"
            class="image-preview"
            :src="formData.backIdPhoto"
            alt=""
          >
        </div>
      </el-col>
      <el-col :span="8">
        <span v-text="$t('halfBodyPhoto')||'拍摄手持身份证件'"></span>
        <div
          element-loading-background="rgba(0, 0, 0, 0.4)"
          v-loading='showLoading_3'
          class="p-rel upload-zone"
        >
          <input
            class="upload-input abs-vh-center"
            type="file"
            accept="image/png,image/gif,image/jpeg"
            @change="uploadId('3',$event)"
            value=""
          />
          <button
            v-show="!hideUploadBtn_3"
            class="btn-inline abs-vh-center btn-large btn-danger"
            v-text="$t('uploadPhoto')||'上传照片'"
          >
          </button>
          <img
            :style="defaultImg_3"
            class="image-preview"
            :src="formData.fullPhoto"
            alt=""
          >
        </div>
      </el-col>
    </el-row>
    <span class="color-warning">
      <template v-if="$i18n.locale=='zh-CN'">
        请严格按照要求上传材料照片，否则会造成您的认证通不过审核，耽误您的宝贵时间！
      </template>
      <template v-if="$i18n.locale=='en-US'">
        Please upload photos of the materials in strict accordance with the requirements, otherwise your certification will not pass the audit, delay your valuable time!
      </template>
    </span>
    <div
      style="margin-top:38px;"
      class="title font-18 font-bold"
      v-text="$t('fillIdInfo')||'填写您的身份信息'"
    >
    </div>
    <el-form
      @submit.native.prevent
      label-position='top'
    >
      <el-form-item :label='$t("fullname")||"您的姓名"'>
        <el-input
          name='name'
          type='name'
          v-model="formData.name"
          :placeholder='$t("fullname")||"请输入您的姓名"'
        >
        </el-input>
      </el-form-item>
      <el-form-item :label='$t("fullNameAgain")||"再次输入您的姓名"'>
        <el-input
          name='confirmName'
          type='text'
          v-model="formData.confirmName"
          :placeholder='$t("fullNameAgain")||"请在次输入您的姓名"'
        >
        </el-input>
      </el-form-item>
      <el-form-item :label='$t("idType")||"你的证件类型"'>
        <el-input
          disabled='disabled'
          name='cardType'
          type='text'
          :value='$t("label169")'
          :placeholder='$t("idType")||"请输入证件类型"'
        >
        </el-input>
      </el-form-item>
      <el-form-item :label='$t("idNumber")||"您的证件号码"'>
        <el-input
          name='cardNo'
          type='text'
          v-model="formData.cardnumber"
          :placeholder='$t("idNumber")||"请输入证件号码"'
        >
        </el-input>
      </el-form-item>
      <button
        @click="submitForm"
        class="btn-block btn-large btn-danger btn-active"
        v-text="$t('confirmedSubmit')||'确认提交'"
      >
      </button>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    const bg_1 = require("@/assets/images/idauth/id_1.png");
    const bg_2 = require("@/assets/images/idauth/id_2.png");
    const bg_3 = require("@/assets/images/idauth/id_3.png");
    return {
      defaultImg_1: `background-image:url(${bg_1})`,
      defaultImg_2: `background-image:url(${bg_2})`,
      defaultImg_3: `background-image:url(${bg_3})`,
      bindState: "",
      formData: {
        name: "",
        faceIdPhoto: "",
        backIdPhoto: "",
        fullPhoto: "",
        confirmName: "",
        cardnumber: ""
      },
      hideUploadBtn_1: false,
      hideUploadBtn_2: false,
      hideUploadBtn_3: false,
      showLoading_1: false,
      showLoading_2: false,
      showLoading_3: false
    };
  },
  mounted() {
    this.getState();
  },
  methods: {
    uploadId(id, e) {
      e.preventDefault();
      let file = e.target.files[0];
      let { name, size, type } = file;
      let formData = new FormData();
      let options = {
        headers: {
          "Content-Type": "MultipartFile/form-data"
        },
        method: "post"
      };
      if (!/\.(jpg|png)$/.test(name)) {
        this.$message.error("图片格式需为jpg或者png");
        return;
      }
      if (size > 4 * Math.pow(1024)) {
        this.$message.error(
          `图片大小不可超过4M,当前图片大小${size / Math.pow(1024, 2)}M`
        );
        return;
      }
      formData.append("imgurl", file);
      options.data = formData;
      switch (id) {
        case "1": // 传输正面
          options.url = `${this.api.baseURL}/zm`;
          this.showLoading_1 = true;
          this.hideUploadBtn_1 = true;
          axios(options).then(res => {
            this.showLoading_1 = false;
            if (res.data.code == "0") {
              this.successMsg(res.msg || "上传成功");
              this.formData.faceIdPhoto = res.data.data.result;
            }
          });
          break;
        case "2": // 传输背面
          options.url = `${this.api.baseURL}/fm`;
          this.showLoading_2 = true;
          this.hideUploadBtn_2 = true;
          axios(options).then(res => {
            this.showLoading_2 = false;
            if (res.data.code == "0") {
              this.successMsg(res.msg || "上传成功");
              this.formData.backIdPhoto = res.data.data.result;
            }
          });
          break;
        case "3": // 传输手持证件照
          options.url = `${this.api.baseURL}/sc`;
          this.showLoading_3 = true;
          this.hideUploadBtn_3 = true;
          axios(options).then(res => {
            this.showLoading_3 = false;
            if (res.data.code == "0") {
              this.successMsg(res.msg || "上传成功");
              this.formData.fullPhoto = res.data.data.result;
            }
          });
          break;
      }
    },
    getState() {
      this.request(this.api.saftyState).then(res => {
        if (res && res.code == "0") {
          this.bindState = res.data.list[0];
          if (this.bindState.idcardstate >= 2) {
            this.$alert(this.$t("label152"), this.$t("label140"), {
              showClose: false,
              confirmButtonText: "返回首页"
            }).then(() => {
              this.navigateTo("/");
            });
          }
        } else {
          this.errMsg(res.msg);
        }
      });
    },
    verifyId() {
      this.request(this.api.realynanme, {
        cardzm: this.formData.faceIdPhoto,
        cardfm: this.formData.backIdPhoto,
        cardsc: this.formData.fullPhoto,
        name: this.formData.name,
        cardnumber: this.formData.cardnumber,
        showLoading: true
      }).then(res => {
        if (res.code == "0") {
          this.successMsg(res.msg || "操作成功");
          this.bindState.idcardstate = "1";
          this.navigateTo("/");
        } else {
          this.errMsg(res.msg || "操作失败");
        }
      });
    },
    submitForm() {
      for (let key in this.formData) {
        if (this.formData[key] == "") {
          this.errMsg("请填写完整信息");
          return;
        }
      }
      if (this.formData.name != this.formData.confirmName) {
        this.errMsg("两次输入姓名不匹配");
        return false;
      }
      if (!this.Util.isIdCard(this.formData.cardnumber)) {
        this.errMsg("label147");
        return false;
      }
      if (this.bindState.idcardstate == "1") {
        this.$alert(this.$t("label148"));
        return false;
      }
      this.verifyId();
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  border-bottom: $default-border;
  padding-bottom: 12px;
}

.image-preview {
  width: 100%;
  height: 260px;
  background-repeat: no-repeat;
}
.text-panel {
  dl {
    margin-top: 20px;
    line-height: 1.8;
  }
}
.el-row {
  margin-bottom: 20px;
  .el-col {
    margin-top: 42px;
  }
  .upload-zone {
    margin-top: 20px;
    button {
      width: 100px;
    }
  }
  .upload-input {
    opacity: 0;
    z-index: 999;
    height: 40px;
    cursor: pointer;
  }
}
.el-form {
  margin: 20px auto 0 auto;
  width: 740px;
}
span.color-warning {
  color: #b72026;
}
</style>
