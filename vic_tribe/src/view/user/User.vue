<template>
  <div class="overflow-y app-body">
    <div
      :style="{backgroundImage:'url('+topBg+')'}"
      class="user"
    >
      <div class="header-title txt-center h-45 font-16">{{$store.state.headerTitle}}</div>
      <div class="user-info">
        <div class="portrait thumb-50">
          <img
            :src="portrait"
            alt=""
          >
        </div>
        <div class="info-detail txt-center font-16">
          <div class="name">张先生</div>
          <div class="user-id">ID:15156</div>
        </div>
      </div>
    </div>
    <van-row class="menu">
      <van-col
        v-for="(item,i) in menuConfig"
        :key='i'
        span='6'
      >
        <img
          class="icon"
          :src="item.icon"
          :alt="item.label"
        >
        <span
          class="font-16 color-666"
          v-text="item.label"
        ></span>
      </van-col>
    </van-row>
    <div class="nav">
      <van-cell-group>
        <van-cell
          v-for="(item,i) in navConfig"
          :key='i'
          :icon='item.icon'
          is-link
          :to='item.link'
        >
          <template
            size='large'
            slot="title"
          >
            <span
              class="title font-15"
              v-text="item.title"
            ></span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      topBg: require("../../assets/images/user/bj.png"),
      portrait: require("../../assets/images/user/portrait.png"),
      menuConfig: [
        {
          label: "邀请好友",
          icon: require("../../assets/images/user/grzx-icon1.png"),
          link: ""
        },
        {
          label: "我的圈友",
          icon: require("../../assets/images/user/grzx-icon2.png"),
          link: ""
        },
        {
          label: "商家服务",
          icon: require("../../assets/images/user/grzx-icon3.png"),
          link: ""
        },
        {
          label: "我的任务",
          icon: require("../../assets/images/user/grzx-icon4.png"),
          link: ""
        }
      ],
      navConfig: [
        {
          title: "个人钱包",
          icon: require("../../assets/images/user/grqb.png"),
          link: ""
        },
        {
          title: "我的账单",
          icon: require("../../assets/images/user/wfzd.png"),
          link: "/record/bill_record"
        },
        {
          title: "个人信息",
          icon: require("../../assets/images/user/grzx-icon9.png"),
          link: "/user/info"
        },
        {
          title: "账户设置",
          icon: require("../../assets/images/user/zhsz.png"),
          link: ""
        },
        {
          title: "我的小蜜",
          icon: require("../../assets/images/user/grzx-icon14.png"),
          link: ""
        },
        {
          title: "关于我们",
          icon: require("../../assets/images/user/grzx-icon15.png"),
          link: ""
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.user {
  height: 28.86%;
  background-color: #18191e;
  background-size: cover;
  background-repeat: no-repeat;
  color: #fff;
}
.header-title {
  line-height: 45px;
}
.user-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.portrait {
  margin-top: 0.5rem;
  border-radius: 50%;
  img {
    width: 100%;
  }
}
.menu {
  background: #fff;
  .van-col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.8rem 0;
  }
  .icon {
    width: 2.25rem;
    margin-bottom: 0.5rem;
  }
}
.info-detail {
  margin-top: 1rem;
  line-height: 1.5;
}
.nav {
  margin-top: 1.25rem;
}
</style>

