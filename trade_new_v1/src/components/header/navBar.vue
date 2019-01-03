<template>
  <div class="nav flex flex-between">
    <img
      class="logo"
      :src="logo||''"
    >
    <ul
      v-if="navItem"
      class="nav-item flex flex-v-center flex-between"
    >
      <li
        v-for="(item,i) in navItem"
        :key='i'
        class="nav-1st-lv flex flex-v-center p-rel"
      >
        <router-link :to='item.link||""'>
          <span v-text="$t(item.label)"></span>
          <i
            v-if='item.subItem'
            class="iconfont icon-xiala"
          ></i>
        </router-link>
        <ol
          v-if="item.subItem"
          class="sub-item lf-0 rt-0 p-abs"
        >
          <li
            v-for="(subItem,i) in item.subItem"
            :key='i'
          >
            <router-link :to='subItem.link'>
              <span v-text="$t(subItem.label)"></span>
            </router-link>
          </li>
        </ol>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "nav-bar",
  props: {
    logo: String,
    navItem: {
      type: null,
      default: [
        {
          label: "label2",
          link: "",
          subItem: [
            {
              label: "label14",
              link: ""
            },
            {
              label: "label15",
              link: ""
            }
          ]
        },
        {
          label: "label3",
          link: ""
        },
        {
          label: "label12",
          link: ""
        },
        {
          label: "label13",
          link: ""
        }
      ]
    }
  },
  data() {
    return {
      myNavItem: null
    };
  },
  mounted() {
    if (this.navItem) {
      this.myNavItem = this.navItem;
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  color: #bdbec2;
  > a {
    display: block;
  }
  .logo {
    width: 100px;
  }
  .nav-item {
    height: 100%;
  }
  .nav-1st-lv {
    padding: 0 25px;
    height: 100%;
    transition: all 0.3s;
    &:hover {
      color: #fff;
      .sub-item {
        display: block;
      }
    }
  }
  .sub-item {
    display: none;
    background-color: $bg-default;
    top: 50px;
    color: #333;
    z-index: 999;
    li {
      padding: 0 10px;
      @include textVcenter(40px);
      transition: all 0.3s;
      &:hover {
        background-color: $bg-dark;
        color: #fff;
      }
    }
  }
}
</style>
