<template>
  <div class="wh-full van-hairline--top">
    <van-cell
      :title="title||'请选择类型'"
      is-link
      @click='showAction'
    ></van-cell>
    <div class="panel">
      <div class="title font-14 font-bold">添加图片</div>
      <div
        :style="{backgroundImage:'url('+qurl+')'}"
        class="upload-file p-rel txt-center color-999 font-40"
      >
        <span v-show="!qurl">+</span>
        <input
          @change="onChange"
          class="file-input wh-full"
          type="file"
        >
      </div>
    </div>
    <div class="panel">
      <div class="title font-14 font-bold">添加文字</div>
      <van-field
        v-model="message"
        type="textarea"
        placeholder="请具体描述您的问题，这有助于我们更有效的帮助您！"
        rows="3"
        autosize
      />
    </div>
    <div class="btn-group">
      <button
        :disabled='disabled'
        @click="onSubmit"
        class="btn-block btn-large btn-primary riple"
      >提交</button>
    </div>
    <van-actionsheet
      v-model="show"
      :actions="qTypes"
      @select="onSelect"
    />
  </div>
</template>
<script>
import { Actionsheet } from "vant";
import axios from "axios";
import { SubmitWorkOrder } from "@/vuexStore/storeService.js";
export default {
  components: { Actionsheet },
  data() {
    return {
      show: false,
      title: "",
      message: "",
      qurl: "",
      qTypes: [
        {
          name: "充值"
        },
        {
          name: "提现"
        },
        {
          name: "OTC"
        },
        {
          name: "身份认证"
        },
        {
          name: "谷歌认证"
        },
        {
          name: "其他"
        }
      ]
    };
  },
  computed: {
    disabled() {
      if (!this.title || !this.message || !this.qurl) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    showAction() {
      this.show = true;
    },
    onSelect(item) {
      this.title = item.name;
      this.show = false;
    },
    onChange(e) {
      e.preventDefault();
      let file = e.target.files[0];
      let formData = new FormData();
      let options = {
        headers: {
          "Content-Type": "MultipartFile/form-data"
        },
        method: "post"
      };
      formData.append("imgurl", file);
      options.data = formData;
      options.url = `${this.api.baseURL}/${this.api.img.url}`;
      axios(options).then(res => {
        if (res.data.code == "0") {
          this.qurl = res.data.data.isFlag;
        }
      });
    },
    onSubmit() {
      SubmitWorkOrder(this.title, this.message, this.qurl).then(res => {
        this.navigateTo("/articles");
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.panel {
  padding: 1rem;
  background: #fff;
}
.van-field {
  margin-top: 1rem;
  background: #f5f5f5;
  padding: 1rem;
}
.upload-file {
  width: 8.25rem;
  height: 8.25rem;
  line-height: 8.25rem;
  margin-top: 1rem;
  background: #f6f6f6;
  background-repeat: no-repeat;
  background-size: contain;
}
.btn-group {
  margin-top: 2rem;
  padding: 1rem;
}
.file-input {
  position: absolute;
  left: 0;
  opacity: 0;
  z-index: 999;
}
</style>