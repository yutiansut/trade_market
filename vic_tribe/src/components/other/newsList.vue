<template>
  <van-row class="list-item">
    <router-link :to='linkTo||""'>
      <van-col
        class="van-hairline--bottom"
        span='7'
      >
        <img
          class="thumb"
          :src="imgSrc"
          :onerror='defaultImg'
        >
      </van-col>
      <van-col
        class="van-hairline--bottom"
        offset='1'
        span='16'
      >
        <div
          class="title font-14 font-bold"
          v-text="newsTitle"
        ></div>
        <div class="footer p-abs">
          <van-tag v-text="newsTag"></van-tag>
        </div>
      </van-col>
    </router-link>
  </van-row>
</template>
<script>
export default {
  name: "news-list",
  props: ["img-src", "news-title", "news-tag", "link-to"],
  data() {
    return {
      defaultImg: `this.src="${require("@/assets/images/default.png")}"`
    };
  },
  methods: {
    imgOnErr() {
      console.log("1");
    }
  }
};
</script>
<style lang="scss" scoped>
.list-item {
  padding-bottom: 2.1rem;
  height: 27.6vw;
  .van-col {
    height: 100%;
    padding-bottom: 1.8rem;
  }
  .thumb {
    width: 100%;
    border: none;
    background: #f1f1f1;
    height: 100%;
  }
  .footer {
    bottom: 2.1rem;
  }
}
</style>

