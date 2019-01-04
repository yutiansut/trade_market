<template>
  <div v-show="show" class="pop-up flex flex-v-center flex-h-center">
    <div :style="{width:width}" class="dialog">
      <div :style="{background:headerBg}" class="dialog-header p-rel">
        <img v-if='showHeaderImg' class="header-img abs-vh-center" :src="headerImg" alt="">
        <div v-if='showHeaderTitle' class="title-text" v-text="headerTitle"></div>
        <i @click.stop="closeHandle" class="el-icon-close"></i>
      </div>
      <div class="dialog-body">
        <div class="title font-bold font-16" v-text="dialogTitle"></div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "dialog-box",
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    showHeaderImg: {
      type: Boolean,
      default: true
    },
    showHeaderTitle: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: "560px"
    },
    headerTitle: {
      type: String,
      default: "标题"
    },
    headerBg: {
      type: String,
      default: null
    },
    headerImg: {
      type: String,
      default: require("@/assets/images/footer/bottom_logo.png")
    },
    dialogTitle: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    closeHandle() {
      this.show = false;
      this.$emit("onDialogClose");
    }
  },
  mounted() {
    this.show = this.showDialog;
  },
  watch: {
    showDialog: function() {
      this.show = this.showDialog;
    }
  }
};
</script>
<style lang="scss" scoped>
.pop-up {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $mask-bg-rgba;
  z-index: 999;
}
.dialog {
  background: #fff;
  overflow: auto;
  max-height: 85%;
  border-radius: 2px;
  .dialog-header {
    @include textVcenter(80px);
    background-color: #b72127;
    .title-text {
      border-top-right-radius: 2px;
      border-top-left-radius: 2px;
      text-align: center;
      color: #fff;
      font-size: 26px;
    }
    i {
      position: absolute;
      right: 15px;
      top: 15px;
      color: #fff;
      font-size: $font-ex-large;
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
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

