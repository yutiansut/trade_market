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
import newsModel from "@/model/newsModel.js";
let { newsList } = newsModel;
export default {
  data() {
    return {
      articleDetail: null
    };
  },
  mounted() {
    let id = this.$route.params.id;
    if (newsList) {
      newsList.map(item => {
        if (item.id == id) {
          this.articleDetail = item;
        }
      });
      return;
    }
    this.getDetail(id);
    this.addReadNum(id);
  },
  methods: {
    getDetail(id) {
      this.request(this.api.notice, { id: id }).then(res => {
        console.log(`公告列表:${JSON.stringify(res)}`);
        if (res && res.code != "0") return this.getDataFaild(res.msg);
        res.data &&
          res.data.result &&
          (this.articleDetail = res.data.result[0]);
      });
    },
    addReadNum(id) {
      this.request(this.api.addreadnum, { id: id }).then(res => {
        console.log(`公告阅读数增加:${JSON.stringify(res)}`);
        if (res && res.code != "0") return this.getDataFaild(res.msg);
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
