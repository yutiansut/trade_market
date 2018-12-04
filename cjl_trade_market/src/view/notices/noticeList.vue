<template>
    <div>
        <div class="title txt-center">系统公告</div>
        <snap-shot v-for="item in articleList"
            v-bind="item" 
            :key='item.id'
            :content='item.con'
            :path='"/notice/detail/"+item.id'>
            <div class="statistic">
                <span>{{$t("view")||"阅读"}}：<em v-text="item.num"></em></span>
                <span>{{$t("updateTime")||"更新时间"}}：<em v-text="item.writedate"></em></span>
            </div>
        </snap-shot>
    </div>
</template>
<script>
import newsModel from "@/model/newsModel.js";
let { newsList } = newsModel;
export default {
  data() {
    return {
      articleList: newsList
    };
  },
  mounted() {
    !newsList && this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.request(this.api.notices).then(res => {
        console.log(`公告列表:${JSON.stringify(res)}`);
        if (res && res.code != "0") return this.getDataFaild(res.msg);
        res.data &&
          res.data.list &&
          (this.articleList = newsModel.newsList = res.data.list);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.statistic {
  color: #999;
  font-size: 12px;
  span {
    margin-right: 25px;
  }
}
.title {
  font-size: 24px;
}
</style>

