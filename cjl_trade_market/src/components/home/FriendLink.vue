<template>
    <div class="friend-link">
        <div class="heading">{{$t("friendLink")||"友情链接"}}
          <!-- <span>Friendship link</span> -->
        </div>
        <ul class="links">
            <li v-for="(item,i) in links" :key='i' class="fl" :class="i<=3?'mt-0':''">
                <router-link :to='item.link'><img :src="item.thumb" alt=""></router-link>
            </li>
        </ul>
    </div>
</template>
<style <style lang="scss" scoped>
.friend-link {
  padding: 0 72px;
  .heading {
    font-size: 34px;
    margin-bottom: 64px;
    span {
      color: #999;
      font-size: 14px;
      padding-left: 11px;
    }
  }
  .links {
    overflow: hidden;
    li {
      width: 25%;
      margin-top: 138px;
      &.mt-0 {
        margin-top: 0;
      }
    }
  }
}
</style>

<script>
export default {
  name: "friend-link",
  data() {
    return {
      links: [
        {
          link: "",
          thumb: require("@/assets/images/home/home_link_1.png")
        },
        {
          link: "",
          thumb: require("@/assets/images/home/home_link_2.png")
        },
        {
          link: "",
          thumb: require("@/assets/images/home/home_link_3.png")
        },
        {
          link: "",
          thumb: require("@/assets/images/home/home_link_4.png")
        },
        {
          link: "",
          thumb: require("@/assets/images/home/home_link_5.png")
        },
        {
          link: "",
          thumb: require("@/assets/images/home/home_link_6.png")
        },
        {
          link: "",
          thumb: require("@/assets/images/home/home_link_7.png")
        },
        {
          link: "",
          thumb: require("@/assets/images/home/home_link_8.png")
        },
        {
          link: "",
          thumb: require("@/assets/images/home/home_link_9.png")
        },
        {
          link: "",
          thumb: require("@/assets/images/home/home_link_10.png")
        },
        {
          link: "",
          thumb: require("@/assets/images/home/home_link_11.png")
        },
        {
          link: "",
          thumb: require("@/assets/images/home/home_link_12.png")
        }
      ]
    };
  },
  mounted() {
    this.request(this.api.friendlink).then(res => {
      
    });
  }
};
</script>

