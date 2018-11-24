<template>
    <div class="content">
        <div class="title font-18 font-bold">身份认证</div>
        <div class="text-panel">
            <dl>
                <dt>照片要求</dt>
                <dd>1. 照片文件大小不能超过4M！文件格式须为jpg或者png！</dd>
                <dd>2. 请确保照片无水印，无污渍，身份信息清晰，头像完整，非文字反向照片！照片请勿进行PS处理！</dd>
                <dd>3. 手持身份证照片：需要您本人<span class="color-warning">一只手持您的身份证</span>
                ，另一只手持一张有您<span class="color-warning">手写的xx网账号ID的白纸。</span>
                确保身份证和白纸在您的胸前，不遮挡您的脸部，并且身份证和白纸上的信息清晰可见！</dd>
            </dl>
            <div style="margin-top:30px;">手持白纸请手写以下内容，内容不符者不予通过。<span class="color-warning">“本人知晓虚拟币投资风险巨大，
                自愿参与，自担风险，保证身份信息不提供给他人，
                不使用gate账号进行非法行为，如有违反，本人愿意承担法律风险。”以下图片仅作为示例，
                请提交您本人的身份材料照片。照片勿进行PS处理！</span>
            </div>
        </div>
        <el-row :gutter='15'>
            <el-col :span="8">
                <span>拍摄身份证人像面</span>
                <div class="p-rel upload-zone">
                    <input class="upload-input abs-vh-center"
                      type="file"
                      @change="uploadId('1',$event)"
                      value=""
                      accept="image/png,image/gif,image/jpeg" />
                    <button class="btn-inline abs-vh-center btn-large btn-danger">上传照片</button>
                    <img :style="defaultImg_1" class="image-preview" src="" alt="">
                </div>
            </el-col>
            <el-col :span="8">
                <span>拍摄身份证国徽面</span>
                <div class="p-rel upload-zone">
                    <input class="upload-input abs-vh-center"
                      type="file"
                      accept="image/png,image/gif,image/jpeg"
                      @change="uploadId('2',$event)"
                      value=""/>
                    <button class="btn-inline abs-vh-center btn-large btn-danger">上传照片</button>
                    <img :style="defaultImg_2" class="image-preview" src="" alt="">
                </div>
            </el-col>
            <el-col :span="8">
                <span>拍摄手持身份证件</span>
                <div class="p-rel upload-zone">
                    <input class="upload-input abs-vh-center"
                      type="file"
                      accept="image/png,image/gif,image/jpeg"
                      @change="uploadId('3',$event)"
                      value=""/>
                    <button class="btn-inline abs-vh-center btn-large btn-danger">上传照片</button>
                    <img :style="defaultImg_3" class="image-preview" src="" alt="">
                </div>
            </el-col>
        </el-row>
        <span class="color-warning">请严格按照要求上传材料照片，否则会造成您的认证通不过审核，耽误您的宝贵时间！</span>
        <div style="margin-top:38px;" class="title font-18 font-bold">填写您的身份信息</div>
        <el-form label-position='top'>
          <el-form-item label='您的姓名'>
            <el-input name='name' type='name' placeholder='请输入您的姓名'></el-input>
          </el-form-item>
          <el-form-item label='再次输入您的姓名'>
            <el-input name='confirmName' type='text' placeholder='请输入您的姓名'></el-input>
          </el-form-item>
          <el-form-item label='你的证件类型'>
            <el-input name='cardType' type='text' placeholder='请输入证件类型'></el-input>
          </el-form-item>
          <el-form-item label='您的证件号码'>
            <el-input name='cardNo' type='text' placeholder='请输入您的您的证件号码'></el-input>
          </el-form-item>
          <button class="btn-block btn-large btn-danger btn-active">确认提交</button>
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
      faceIdPhoto: "",
      backIdPhoto: "",
      fullPhoto: "",
      defaultImg_1: `background-image:url(${bg_1})`,
      defaultImg_2: `background-image:url(${bg_2})`,
      defaultImg_3: `background-image:url(${bg_3})`,
      name: "",
      confirmName: ""
    };
  },
  methods: {
    uploadId(id, e) {
      e.preventDefault();
      let file = e.target.files[0];
      let { name, size, type } = file;
      let formData = new FormData();
      let options = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
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
      switch (id) {
        case 1: // 传输正面
          formData.append("file", file);

          break;
        case 2: // 传输背面
          break;
        case 3: // 传输手持证件照
          break;
      }
      options.url = "";
      options.data = formData;
      axios(options).then(res => console.log(res));
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
