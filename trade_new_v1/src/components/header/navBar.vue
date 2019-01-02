<template>
  <div class="nav flex flex-between">
    <img
      class="logo"
      src=""
      alt=""
    >
    <ul class="nav-item flex flex-v-center flex-between">
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
  data() {
    return {
      navItem: [
        {
          label: "label2",
          link: "",
          subItem: [
            {
              label: "子列表",
              link: ""
            },
            {
              label: "子列表1",
              link: ""
            }
          ]
        },
        {
          label: "label3",
          link: ""
        },
        {
          label: "label4",
          link: ""
        },
        {
          label: "label5",
          link: ""
        },
        {
          label: "label6",
          link: ""
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.nav {
  color: #bdbec2;
  a {
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
      .sub-item {
        display: block;
      }
    }
  }
  .sub-item {
    display: none;
    background-color: $bg-dark;
    top: 50px;
    > li {
      padding: 0 10px;
      @include textVcenter(30px);
    }
  }
}
</style>
