<template>
  <van-row class="list-item">
    <router-link :to='linkTo||""'>
      <p
        class="title font-18 font-bold"
        v-text="newsTitle"
      ></p>
      <p
        class="body color-666"
        v-text="content"
      ></p>
      <p
        class="color-999 date font-13"
        v-text="date"
      ></p>
    </router-link>
  </van-row>
</template>
<script>
export default {
  name: "news-list",
  props: ["news-title", "content", "link-to", "date"],
  data() {
    return {
      defaultImg: `this.src="${require("@/assets/images/default.png")}"`
    };
  },
  methods: {
    imgOnErr() {}
  }
};
</script>
<style lang="scss" scoped>
.list-item {
  overflow: hidden;
  padding: 0 1rem;
  background: #fff;
  p:not(:first-child) {
    margin-top: 1.25rem;
    line-height: 1.8;
  }
  &:last-child {
    a {
      border-bottom: none;
    }
  }
  a {
    display: block;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
  }
}
</style>

