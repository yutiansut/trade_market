<template>
    <div class="index-banner p-rel">
        <el-carousel :interval="5000" :height='bannerHeight'>
            <el-carousel-item v-for="(item,index) in bannerList" :key="index">
                <router-link :to='item.link'>
                    <img class="banner-image" :src="item.bannerurl||item.url">
                </router-link>
            </el-carousel-item>
        </el-carousel>
        <login-win></login-win>
    </div>
</template>
<style lang="scss" scoped>
.index-banner {
  @include minWidth;
  .banner-image {
    border: none;
    width: 100%;
    height: 410px;
  }
}
</style>
<script>
import loginWin from "@/components/home/LoginWin";
export default {
  name: "index-banner",
  components: {
    loginWin
  },
  mounted() {
    this.request(this.api.banner).then(res => {
      if (!res.code) this.bannerList = res.data;
    });
  },
  data() {
    return {
      bannerHeight: "410px",
      bannerList: [
        {
          url: require("@/assets/images/home/home_page_bannrt_.png"),
          link: "abc"
        },
        {
          url: require("@/assets/images/home/home_page_bannrt_1.png"),
          link: "abc"
        }
      ]
    };
  }
};
</script>

