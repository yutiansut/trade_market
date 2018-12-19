<template>
    <div class="index-banner p-rel">
        <el-carousel
          v-show="bannerList.length>0"
          :interval="5000"
          :height='bannerHeight'>
            <el-carousel-item v-for="(item,index) in bannerList" :key="index">
                <router-link :to='item.link'>
                    <img class="banner-image" :src='item.bannerurl||item.url'>
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
    height: 100%;
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
  data() {
    return {
      bannerHeight: "auto",
      bannerList: []
    };
  },
  mounted() {
    let img = null;
    window.onresize = () => {
      this.request(this.api.banner).then(res => {
        if (res.code == "0" && res.data.list) {
          img = new Image();
          img.src = res.data.list[0].bannerurl;
          let width = window.innerWidth;
          img.onload = () => {
            let r = width / img.width;
            this.bannerHeight = `${img.height * r}px`;
          };
          this.bannerList = res.data.list;
        }
      });
    };
    this.request(this.api.banner).then(res => {
      if (res.code == "0" && res.data.list) {
        img = new Image();
        img.src = res.data.list[0].bannerurl;
        let width = window.innerWidth;
        img.onload = () => {
          let r = width / img.width;
          this.bannerHeight = `${img.height * r}px`;
        };
        this.bannerList = res.data.list;
      }
    });
  }
};
</script>

