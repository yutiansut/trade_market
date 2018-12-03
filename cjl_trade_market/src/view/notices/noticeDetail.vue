<template>
    <div class='content wh-full' v-if="articleDetail">
        <div class="title" v-text="articleDetail.title"></div>
        <div class="info">
            <span v-text="articleDetail.writedate"></span>
            <span v-if="articleDetail.num">{{$t("view")||"阅读"}}：{{articleDetail.num}}</span>
        </div>
        <div class="break-line"></div>
        <div class="article-content" v-html="articleDetail.con"></div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      articleDetail: null
    };
  },
  mounted() {
    let id = this.$route.params.id;
    this.getDetail(id);
  },
  methods: {
    getDetail(id) {
      this.request(this.api.notice, { id: id }).then(res => {
        console.log(`公告列表:${JSON.stringify(res)}`);
        res.data &&
          res.data.result &&
          (this.articleDetail = res.data.result[0]);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.break-line {
  @include breakLine;
}
.content {
  box-sizing: border-box;
  padding: 0 100px;
  .info {
    color: #999;
    margin: 25px 0 15px 0;
    text-align: center;
  }
  .title {
    font-size: $font-ex-large;
    text-align: center;
  }
}
.article-content {
  margin-top: 20px;
  line-height: 1.8;
}
</style>
