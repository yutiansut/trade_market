<template>
  <div class="status-bar flex">
    <slot name='barItem'></slot>
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
.status-bar {
  height: 100%;
}
.icon-flag {
  height: 15px;
}
.lang-switch {
  margin-left: 30px;
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
    &:first-child {
      border-top: none;
    }
    img {
      height: 15px;
      margin-right: 8px;
    }
  }
}
</style>