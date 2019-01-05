<template>
  <div class="status-bar flex flex-v-center">
    <slot name='barItem'></slot>
    <!-- user面板 -->
    <template v-if="!Store.state.userModel.isLogin">
      <button class="btn-login btn-small btn-round">登录</button>
      <button class="btn-primary btn-small btn-round">注册</button>
    </template>
    <template v-else>
      <div class="user-dropdown flex flex-v-center p-rel">
        <div class="user-info flex flex-v-center h-30 color-gray flex-between">
          <i class="iconfont icon-yonghu"></i>&nbsp;&nbsp;
          <span>***166@qq.com</span>&nbsp;&nbsp;
          <i class="iconfont el-icon-caret-bottom"></i>
        </div>
        <ol class="dropdown-item p-abs">
          <li>
            <router-link to=''>账户设置</router-link>
          </li>
          <li>
            <router-link to='/invite'>邀请好友</router-link>
          </li>
          <li>
            <router-link to=''>退出登录</router-link>
          </li>
        </ol>
      </div>
    </template>
    <!-- 选择语言 -->
    <div
      @click="dropDown"
      class="lang-switch flex p-rel flex-v-center"
    >
      <img
        class="icon-flag"
        :src="dropDownItem[active].icon"
      >
      <div
        v-show="show"
        class="drop-down p-abs"
      >
        <div
          v-for="(item,i) in dropDownItem"
          @click.stop="onSelect(i,item.value)"
          :key='item.label'
          class="drop-down-item flex flex-between flex-v-center"
        >
          <img
            v-if="item.icon"
            :src="item.icon"
          >
          <span
            v-if="item.label"
            v-text="$t(item.label)"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "status-bar",
  data() {
    return {
      show: false,
      active: 0,
      dropDownItem: [
        {
          icon: this.assetCfg.imgs.lang_flag_cn,
          value: "zh-CN",
          label: "label9"
        },
        {
          icon: this.assetCfg.imgs.lang_flag_en,
          value: "en-US",
          label: "label10"
        }
      ]
    };
  },
  mounted() {
    let lang = this.storage.get("DefaultLang");
    this.dropDownItem.map((item, i) => {
      if (item.value == lang) {
        this.active = i;
      }
    });
  },
  methods: {
    dropDown() {
      this.show = !this.show;
    },
    onSelect(i, val) {
      let defaultLang = this.storage.get("DefaultLang");
      if (val == defaultLang) return false;
      let loading = this.$loading({
        text: this.$t("label11"),
        background: "rgba(0, 0, 0, 0.4)"
      });
      setTimeout(() => {
        this.active = i;
        this.$i18n.locale = val;
        this.show = false;
        this.storage.set("DefaultLang", val);
        loading.close();
      }, 800);
    }
  }
};
</script>
<style lang="scss" scoped>
$mg-size: 30px;
.status-bar {
  height: 100%;
}
.icon-flag {
  height: 15px;
}
.lang-switch {
  margin-left: $mg-size;
  height: 100%;
}
.drop-down {
  cursor: pointer;
  background-color: $bg-default;
  white-space: nowrap;
  top: 50px;
  right: 0;
  z-index: 999;
  .drop-down-item {
    padding: 8px;
    color: #333;
    &:hover {
      background-color: $bg-dark;
      color: #fff;
    }
    img {
      height: 15px;
      margin-right: 8px;
    }
  }
}
.user-dropdown {
  height: 100%;
  cursor: pointer;
  &:hover {
    .dropdown-item {
      display: block;
    }
  }
  .user-info {
    margin-left: $mg-size;
    border-radius: 30px;
    border: 1px solid #bdbec2;
    box-sizing: border-box;
    padding: 0 10px;
  }
  .dropdown-item {
    display: none;
    right: 0;
    top: 50px;
    background: #fff;
    border-radius: 2px;
    z-index: 999;
    overflow: hidden;
    li {
      padding: 0 30px;
      line-height: 40px;
      &:hover {
        background-color: $bg-dark;
        color: #fff;
      }
    }
  }
}
button {
  margin-left: $mg-size;
}
.btn-login {
  color: #fff;
  border-color: #555969;
}
</style>