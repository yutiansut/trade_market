<template>
  <div class="footer van-hairline--top">
    <van-tabbar
      v-if="showFooter"
      :fixed='false'
      @change='onChange'
      v-model="active"
    >
      <van-tabbar-item
        v-for="(item,i) in tabConfig"
        :key="i"
        :to='item.link'
      >
        <div class="item flex flex-h-center flex-v-center">
          <div
            class="icon"
            :style="{backgroundImage:'url('+(active==i?item.icon.active:item.icon.normal)+')'}"
          ></div>
          <!-- <div
          v-show="active!=i"
          class="icon"
          :style="{backgroundImage:'url('+item.icon.normal+')'}"
        ></div> -->
          <span
            :class="active==i?'active':'color-999'"
            v-text="item.label"
          ></span>
        </div>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<style lang="scss" scoped>
.item {
  flex-direction: column;
  margin-top: -0.3rem;
  .icon {
    width: 2.2rem;
    height: 2.2rem;
    background-size: 80% auto;
    background-repeat: no-repeat;
    background-position: center;
  }
  span {
    display: block;
    margin-top: 0.1em;
    &.active {
      color: #d0a771;
    }
  }
}
</style>
<script>
export default {
  name: "my-footer",
  data() {
    return {
      tabConfig: [
        {
          label: "首页",
          icon: {
            normal: this.assetConfig.imgs.tab_1_default,
            active: this.assetConfig.imgs.tab_1_selected
          },
          link: "/home"
        },
        {
          label: "交易",
          icon: {
            normal: this.assetConfig.imgs.tab_2_default,
            active: this.assetConfig.imgs.tab_2_selected
          },
          link: "/trade/coin_trade"
        },
        {
          label: "C2C",
          icon: {
            normal: this.assetConfig.imgs.tab_3_default,
            active: this.assetConfig.imgs.tab_3_selected
          },
          link: "/trade/c2c_trade"
        },
        {
          label: "OTC",
          icon: {
            normal: this.assetConfig.imgs.tab_4_default,
            active: this.assetConfig.imgs.tab_4_selected
          },
          link: "/trade/otc_trade"
        },
        {
          label: "资产",
          icon: {
            normal: this.assetConfig.imgs.tab_5_default,
            active: this.assetConfig.imgs.tab_5_selected
          },
          link: "/asset"
        }
      ]
    };
  },
  computed: {
    showFooter() {
      return this.Store.state.showFooter;
    },
    active() {
      return this.Store.state.footerItemIndex;
    }
  },
  mounted() {
    this.tabConfig.map((item, i) => {
      if (this.$route.path == item.link) {
        this.Store.commit("setFooterItem", i);
        return;
      }
    });
  },
  methods: {
    onChange(i) {
      this.Store.commit("setFooterItem", i);
    }
  },
  watch: {
    $route(to, from) {
      this.tabConfig.map((item, i) => {
        if (to.path == item.link) {
          this.Store.commit("setFooterItem", i);
          return;
        }
      });
    }
  }
};
</script>
