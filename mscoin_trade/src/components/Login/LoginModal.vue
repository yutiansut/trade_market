<template>
  <div
    :style="{width:width}"
    class="dialog"
  >
    <div
      :style="{'background':headerBg}"
      class="dialog-header p-rel"
    >
      <div
        :style="{'font-size':titleSize,'color':titleColor}"
        class="title"
        v-text="titleText"
      >
      </div>
    </div>
    <div class="dialog-body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: "500px"
    },
    titleText: String,
    headerBg: {
      type: String,
      default: null
    },
    titleSize: {
      type: String,
      default: "26px"
    },
    titleColor: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.dialog {
  background: #fff;
  .dialog-header {
    @include textVcenter(80px);
    background-color: $main-bg-color;
    .title {
      letter-spacing: 2px;
    }
  }
  .dialog-body {
    padding: 20px 50px 30px 50px;
  }
  .header-img {
    width: 130px;
  }
  .title {
    text-align: center;
  }
}
</style>


