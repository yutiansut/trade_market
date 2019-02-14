<template>
  <div class="app-body overflow-y">
    <van-row gutter='20'>
      <van-col
        v-for="(item,i) in apps"
        :key='i'
        class="bg-#fff p-rel"
        span='8'
      >
        <div class="content">
          <img
            v-if="item.icon"
            class="icon"
            :src="item.icon"
            :alt="item.label"
          >
          <div
            class="icon-more"
            v-else
          >敬请期待</div>
          <span
            v-text="item.label"
            class="label font-16"
          ></span>
        </div>
      </van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      apps: [
        {
          label: "购物商城",
          icon: require("../../assets/images/appicon/sc.png"),
          link: ""
        },
        {
          label: "热门商圈",
          icon: require("../../assets/images/appicon/sq.png"),
          link: ""
        },
        {
          label: "话费充值",
          icon: require("../../assets/images/appicon/hfcz.png"),
          link: ""
        },
        {
          label: "水电充值",
          icon: require("../../assets/images/appicon/sdcz.png"),
          link: ""
        },
        {
          label: "飞机票",
          icon: require("../../assets/images/appicon/fjp.png"),
          link: ""
        },
        {
          label: "火车票",
          icon: require("../../assets/images/appicon/hcp.png"),
          link: ""
        },
        {
          label: "油卡充值",
          icon: require("../../assets/images/appicon/ykcz.png"),
          link: ""
        },
        {
          label: "网约车",
          icon: require("../../assets/images/appicon/wyc.png"),
          link: ""
        },
        {
          label: "社交",
          icon: require("../../assets/images/appicon/sj.png"),
          link: ""
        },
        {
          label: "热门游戏",
          icon: require("../../assets/images/appicon/yx.png"),
          link: ""
        },
        {
          label: "更多应用",
          icon: "",
          link: ""
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.app-body {
  padding: 1.25rem;
  padding-top: 0;
  .van-col {
    margin-top: 1.5rem;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.5rem;
    background: #fff;
    width: 100%;
    overflow: hidden;
  }
  .label {
    width: 100%;
    color: #fff;
    display: block;
    background: #2c3640;
    text-align: center;
    padding: 0.25rem 0;
    line-height: normal;
  }
  .icon {
    width: 3rem;
    margin: 2rem;
  }
  .icon-more {
    margin: 2rem;
    height: 3rem;
    line-height: 3rem;
    font-size: 1.5rem;
  }
}
</style>
