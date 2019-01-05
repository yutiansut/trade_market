<template>
  <div class="p-rel">
    <swiper
      ref='mySwiper'
      :options='swiperOption'
    >
      <swiper-slide
        v-for="(item,i) in swiperData"
        :key='i'
      >
        <div class="news flex flex-v-center">
          <div class="news-info w-full">
            <span
              class="font-12"
              :class="'news-type-'+item.type"
              v-text="item.typeLabel"
            ></span>
            <div
              class="title font-18"
              v-text="item.title||''"
            ></div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div
      @click="prev"
      class="btn-prev flex flex-v-center p-abs abs-v-center"
    >
      <span class="font-28 el-icon-caret-left"></span>
    </div>
    <div
      @click="next"
      class="btn-next flex flex-v-center p-abs abs-v-center"
    >
      <span class="font-28 el-icon-caret-right"></span>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "swiper-ad",
  props: {
    swiperData: {
      type: Array,
      default: []
    },
    swiperOption: {
      type: Object,
      default: {
        slidesPerView: 3,
        spaceBetween: 25
      }
    },
    showNav: {
      type: Boolean,
      default: true
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    prev() {
      this.swiper.slidePrev();
    },
    next() {
      this.swiper.slideNext();
    }
  }
};
</script>
<style lang="scss" scoped>
.news {
  box-sizing: border-box;
  padding: 16px;
  background: #404456;
  color: #fff;
  transition: all 0.4s;
  border-radius: 2px;
  min-height: 106px;
  overflow: hidden;
  cursor: pointer;
  .title {
    margin-top: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:hover {
    color: #333;
    background: #fff;
  }
}
.news-type-1 {
  color: $color-danger;
}
.news-type-2 {
  color: #fea11d;
}
.news-type-3 {
  color: $color-success;
}
div[class^="btn"] {
  color: #404456;
  height: 100%;
  z-index: 9999;
  cursor: pointer;
  &:hover {
    color: #eee;
  }
}
.btn-prev {
  left: -30px;
}
.btn-next {
  right: -30px;
}
</style>