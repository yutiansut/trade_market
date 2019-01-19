<template>
  <div class="identify van-hairline--top overflow-y h-full">
    <div class="upload-zone">
      <div class="label font-bold font-15 txt-center">拍摄身份证人像面</div>
      <div
        :style="{backgroundImage:'url('+assetConfig.imgs.user_icon_2_1+')'}"
        class="photo p-rel"
      >
        <img
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
        class="photo p-rel"
      >
        <img
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
        class="photo p-rel"
      >
        <img
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
            autocomplete="off"
            class="h-35"
            placeholder="请输入您的证件号码"
          >
        </div>
      </div>
    </div>
    <button class="btn-block btn-primary btn-large riple">确定</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      photoUrl: ""
    };
  },
  methods: {
    uploadId(id, e) {}
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