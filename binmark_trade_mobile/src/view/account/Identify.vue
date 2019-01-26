<template>
  <div class="identify van-hairline--top overflow-y h-full">
    <div class="upload-zone">
      <div class="label font-bold font-15 txt-center">拍摄身份证人像面</div>
      <div
        :style="{backgroundImage:'url('+assetConfig.imgs.user_icon_2_1+')'}"
        class="cardsc p-rel"
      >
        <img
          v-show="cardzm"
          class="abs-vh-center photo"
          :src="cardzm"
        >
        <img
          v-show="!hideUploadBtn_1"
          class="upLoad-btn abs-vh-center thumb-50"
          :src="assetConfig.imgs.user_icon_2_btn"
        >
        <input
          class="upload-input abs-vh-center wh-full"
          type="file"
          accept="image/png,image/gif,image/jpeg"
          @change="uploadId('0',$event)"
          value=""
        />
      </div>
    </div>
    <div class="upload-zone ">
      <div class="label font-bold font-15 txt-center">拍摄身份证国徽面</div>
      <div
        :style="{backgroundImage:'url('+assetConfig.imgs.user_icon_2_2+')'}"
        class="cardsc p-rel"
      >
        <img
          v-show="cardfm"
          class="abs-vh-center photo"
          :src="cardfm"
        >
        <img
          v-show="!hideUploadBtn_2"
          class="upLoad-btn abs-vh-center thumb-50"
          :src="assetConfig.imgs.user_icon_2_btn"
        >
        <input
          class="upload-input abs-vh-center wh-full"
          type="file"
          accept="image/png,image/gif,image/jpeg"
          @change="uploadId('1',$event)"
          value=""
        />
      </div>
    </div>
    <div class="upload-zone">
      <div class="label font-bold font-15 txt-center">拍摄手持身份证照</div>
      <div
        :style="{backgroundImage:'url('+assetConfig.imgs.user_icon_2_3+')'}"
        class="cardsc p-rel"
      >
        <img
          v-show="cardsc"
          class="abs-vh-center photo"
          :src="cardsc"
        >
        <img
          v-show="!hideUploadBtn_3"
          class="upLoad-btn abs-vh-center thumb-50"
          :src="assetConfig.imgs.user_icon_2_btn"
        >
        <input
          class="upload-input abs-vh-center wh-full"
          type="file"
          accept="image/png,image/gif,image/jpeg"
          @change="uploadId('2',$event)"
          value=""
        />
      </div>
    </div>
    <div class="form">
      <div class="form-title font-18 font-bold">填写身份信息</div>
      <div class="form-group">
        <div class="label color-666 font-14">您的姓名</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            v-model="name"
            autocomplete="off"
            class="h-35"
            placeholder="请输入您的姓名"
          >
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">姓名确认</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            v-model="rename"
            autocomplete="off"
            class="h-35"
            placeholder="请输入您的姓名"
          >
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">证件类型</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            disabled
            autocomplete="off"
            class="h-35"
            value="身份证"
          >
        </div>
      </div>
      <div class="form-group">
        <div class="label color-666 font-14">证件号码</div>
        <div class="form-input font-15 van-hairline--bottom">
          <input
            v-model="cardnumber"
            autocomplete="off"
            class="h-35"
            placeholder="请输入您的证件号码"
          >
        </div>
      </div>
    </div>
    <button
      @click="onSubmit"
      class="btn-block btn-primary btn-large riple"
    >确定</button>
  </div>
</template>
<script>
import { getsafe } from "@/vuexStore/storeService.js";
import { Dialog } from "vant";
import axios from "axios";
import { realname } from "../../vuexStore/userService";
export default {
  components: { Dialog },
  data() {
    return {
      phototemp: "",
      cardzm: "",
      cardfm: "",
      cardsc: "",
      name: "",
      rename: "",
      hideUploadBtn_1: false,
      hideUploadBtn_2: false,
      hideUploadBtn_3: false,
      cardnumber: "",
      bindstate: {}
    };
  },
  mounted() {
    getsafe().then(res => {
      this.bindstate = res;
      if (res.cardnumberstate >= 2) {
        Dialog.confirm({
          message: "您已实名认证，无需再次认证",
          confirmButtonText: "返回安全中心",
          showCancelButton: false
        }).then(res => {
          this.navigateTo("/account");
        });
      }
    });
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
        this.$toast("图片格式需为jpg或者png");
        return;
      }
      if (size > 4 * Math.pow(1024)) {
        this.$toast(
          `图片大小不可超过4M,当前图片大小${size / Math.pow(1024, 2)}M`
        );
        return;
      }
      formData.append("imgurl", file);
      options.data = formData;
      switch (id) {
        case "0": // 传输正面
          options.url = `${this.api.baseURL}/zm`;
          this.hideUploadBtn_1 = true;
          axios(options).then(res => {
            if (res.data.code == "0") {
              this.$toast("上传成功");
              this.cardzm = res.data.data.result;
            }
          });
          break;
        case "1": // 传输背面
          options.url = `${this.api.baseURL}/fm`;
          this.hideUploadBtn_2 = true;
          axios(options).then(res => {
            if (res.data.code == "0") {
              this.$toast("上传成功");
              this.cardfm = res.data.data.result;
            }
          });
          break;
        case "2": // 传输手持证件照
          options.url = `${this.api.baseURL}/sc`;
          this.hideUploadBtn_3 = true;
          axios(options).then(res => {
            if (res.data.code == "0") {
              this.$toast("上传成功");
              this.cardsc = res.data.data.result;
            }
          });
          break;
      }
    },
    validate() {
      if (!this.cardzm) {
        this.$toast({
          message: "请上传身份证正面",
          position: "bottom"
        });
        return false;
      }
      if (!this.cardfm) {
        this.$toast({
          message: "请上传身份证国徽面",
          position: "bottom"
        });
        return false;
      }
      if (!this.cardsc) {
        this.$toast({
          message: "请上传手持身份证照",
          position: "bottom"
        });
        return false;
      }
      if (!this.name) {
        this.$toast({
          message: "姓名不能为空",
          position: "bottom"
        });
        return false;
      }
      if (this.rename != this.name) {
        this.$toast({
          message: "两次输入姓名不一致",
          position: "bottom"
        });
        return false;
      }
      if (!this.cardnumber) {
        this.$toast({
          message: "身份证号码不能为空",
          position: "bottom"
        });
        return false;
      }
      if (!this.Util.isIdCard(this.cardnumber)) {
        this.$toast({
          message: "身份证号码不合法",
          position: "bottom"
        });
      }
      return true;
    },
    onSubmit() {
      if (this.validate()) {
        realname({
          cardzm: this.cardzm,
          cardfm: this.cardfm,
          cardsc: this.cardsc,
          name: this.name,
          cardnumber: this.cardnumber
        }).then(res => {
          if (res) {
            this.navigateTo("/account");
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.identify {
  background: #fff;
}
.upload-zone {
  margin-top: 2.25rem;
  .photo {
    width: 100%;
    height: 100%;
  }
  .cardsc {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    width: 18.75rem;
    height: 11.25rem;
    margin: 1rem auto 0 auto;
    border-radius: 4px;
  }
  .upload-input {
    z-index: 999;
    opacity: 0;
  }
}
.form-title {
  margin-top: 4rem;
  padding: 0 1rem;
}
input[disabled] {
  width: 100%;
  background: transparent;
  color: #999;
}
button {
  margin: 3.3rem auto 0.85rem auto;
  width: calc(100% - 2rem);
}
</style>