<template>
  <div class="index-banner p-rel">
    <el-carousel
      :interval="5000"
      :height='bannerHeight>0?(bannerHeight+"px"):(bannerMinHeight+"px")'
    >
      <el-carousel-item
        v-for="(item,index) in bannerList"
        :key="index"
      >
        <router-link :to='item.link'>
          <img
            class="banner-image"
            :src='item.bannerurl||item.url'
          >
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
      bannerHeight: 0,
      bannerMinHeight: 380,
      bannerList: []
    };
  },
  mounted() {
    window.onresize = () => {
      this.getBanner();
    };
    this.getBanner();
  },
  methods: {
    getBanner() {
      let img = null;
      this.request(this.api.banner).then(res => {
        if (res.code == "0" && res.data.list) {
          img = new Image();
          img.src = res.data.list[0].bannerurl;
          let width = window.innerWidth;
          width < 1440 && (width = 1440);
          img.onload = () => {
            let r = width / img.width;
            this.bannerHeight =
              img.height * r > this.bannerMinHeight
                ? img.height * r
                : this.bannerMinHeight;
          };
          this.bannerList = res.data.list;
        }
      });
    }
  }
};
</script>

