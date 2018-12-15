<template>
    <div class="content">
        <div class="title font-18 font-bold" v-text="$t('label111')"></div>
        <el-form
            label-position='top'
            label-width='120px'>
            <el-form-item
                class="form"
                :label="$t('label112')">
                <el-select
                    v-model="formData.type"
                    :placeholder="$t('label114')">
                    <el-option :value="$t('recharge')"></el-option>
                    <el-option :value="$t('withdraw')"></el-option>
                    <el-option value="OTC"></el-option>
                    <el-option value="C2C"></el-option>
                    <el-option :value="$t('identify')"></el-option>
                    <el-option :value="$t('googleAuth')"></el-option>
                    <el-option :value="$t('label113')"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item
                :label="$t('label117')">
                <div :style="{backgroundImage:'url('+dialogImageUrl+')'}" class="upload-box fl p-rel">
                    <i class="el-icon-plus p-abs abs-vh-center"></i>
                    <input @change="upLoadFunc" class="wh-full" type="file">
                </div>
                <span class="upload-tip">图片要求：文件大小不能超过4M!文件格式必须为jpg或者png!请确保图像清晰，无水印，无污渍</span>
            </el-form-item>
            <el-form-item style="width:50%;" :label="$t('label115')" prop="desc">
                <textarea v-model="formData.desc"></textarea>
            </el-form-item>
            <el-button @click="submitForm" type="warning">{{$t('submit')}}</el-button>
        </el-form>
        <div style="margin-top:20px;" class="title font-bold font-14" v-text="$t('label116')"></div>
        <div class="workorder-record">
            <div class="tip color-danger">{{$t('label118')}}</div>
            <div class="record-content">
                <div class="tab-item font-16">
                    <a href="javasccript:" v-text="$t('label116')"></a>
                </div>
                <div class="replay">
                    <div v-for="(item,i) in history" :key="i">
                        <div class="question">
                            <div class="title fl" v-text="item.title"></div>
                            <div class="type fr color-danger" v-text="item.type"></div>
                        </div>
                        <div class="answer color-success">
                            回复：<span v-text="item.reply"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      formData: {
        type: "",
        desc: ""
      },
      options: [
        {
          label: "",
          value: ""
        }
      ],
      dialogImageUrl: "",
      history: []
    };
  },
  mounted() {
    this.request(this.api.gethisorder).then(res => {
      if (res.code == "0") {
        this.history = res.data.list;
      } else {
        this.errMsg(res.msg);
      }
    });
  },
  methods: {
    submitForm() {
      if (
        this.formData.type == "" ||
        this.formData.desc == "" ||
        this.dialogImageUrl == ""
      ) {
        this.errMsg("请填写完整信息");
        return false;
      }
      this.request(this.api.addorder, {
        type: this.formData.type,
        title: this.formData.desc,
        url: this.dialogImageUrl,
        showLoading: true
      }).then(res => {
        if (res.code == "0") {
          this.successMsg(res.msg);
        } else {
          this.errMsg(res.msg);
        }
      });
    },
    upLoadFunc(e) {
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
      options.url = `${this.api.baseURL}/${this.api.img.url}`;
      axios(options).then(res => {
        if (res.data.code == "0") {
          this.successMsg(res.msg || "上传成功");
          this.dialogImageUrl = res.data.data.isFlag;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.question {
  overflow: hidden;
  .type {
    margin-left: 30px;
  }
}
.upload-tip {
  display: inline-block;
  margin-left: 15px;
  width: 150px;
  line-height: 1.5;
  text-align: justify;
}
.upload-box {
  width: 200px;
  height: 200px;
  border-radius: 4px;
  border: 1px dashed #ddd;
  background-repeat: no-repeat;
  background-size: contain;
  i {
    font-size: 34px;
    color: #999;
  }
  input {
    opacity: 0;
    cursor: pointer;
  }
}
.tip {
  margin-top: 10px;
  line-height: 40px;
  border-bottom: 1px solid #dcdfe6;
}
.replay > div {
  padding: 5px 0;
  border-top: 1px solid #dddddd;
  &:first-child {
    border-top: none;
  }
}
.container {
  width: 77%;
  padding: 30px 0;
  margin: 0 auto;
}
.el-form-item {
  margin-top: 15px;
}
.tab-item {
  line-height: 45px;
  border-bottom: 1px solid #dcdfe6;
}
textarea {
  width: 100%;
  min-height: 150px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  padding: 8px;
  line-height: normal;
  &:focus {
    border-color: $color-danger;
  }
}
.form {
  margin-top: 30px;
}
</style>
