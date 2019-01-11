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
            :class="'icon-'+i"
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
    background-size: 100% auto;
    background-repeat: no-repeat;
  }
  .icon-1 {
    background-position: 0 -2.2rem;
  }
  .icon-2 {
    background-position: 0 -4.5rem;
  }
  .icon-3 {
    background-position: 0 -6.6rem;
  }
  span {
    display: block;
    margin-top: 0.1em;
    &.active {
      color: #333;
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
            normal: "",
            active: ""
          },
          link: "/home"
        }
      ]
    };
  },
  computed: {
    showFooter() {
      return this.$store.state.showFooter;
    },
    active() {
      return this.$store.state.footerItemIndex;
    }
  },
  mounted() {
    this.tabConfig.map((item, i) => {
      if (this.$route.path == item.link) {
        this.$store.commit("setFooterItem", i);
        return;
      }
    });
  },
  methods: {
    onChange(i) {
      this.$store.commit("setFooterItem", i);
    }
  },
  watch: {
    $route(to, from) {
      this.tabConfig.map((item, i) => {
        if (to.path == item.link) {
          this.$store.commit("setFooterItem", i);
          return;
        }
      });
    }
  }
};
</script>
