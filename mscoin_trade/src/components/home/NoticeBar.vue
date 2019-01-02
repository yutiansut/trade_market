<template>
    <div class="notice-bar">
        <span class="p-rel text-wrap" v-for="(item,i) in noticeItem" :key='i'>
            <router-link  :to='"/notice/detail/"+item.id' v-text="item.title"></router-link>
        </span>
    </div>
</template>
<script>
import newsModel from "@/model/newsModel.js";
let { newsList } = newsModel;
export default {
  name: "notice-bar",
  data() {
    return {
      noticeItem: null
    };
  },
  mounted() {
    //获取公告列表
    if (newsList) {
      this.noticeItem = newsList;
      return;
    }
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.request(this.api.notices).then(res => {
        console.log(`公告列表:${JSON.stringify(res)}`);
        if (res && res.code == "0") {
          res.data && res.data.list && (newsModel.newsList = res.data.list);
          this.noticeItem = newsModel.newsList.slice(0, 6);
          this.$emit("onNewsLoad", newsModel.newsList);
        } else {
          this.getDataFaild(res.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.notice-bar {
  @include minWidth;
  background: $bg-dark;
  font-size: $font-default;
  @include textVcenter(50px);
  text-align: center;
  .text-wrap {
    display: inline-block;
    padding: 0 15px;
    max-width: 20%;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #fff;
    &:first-child:before {
      content: "";
    }
    &:before {
      content: "/";
      position: absolute;
      left: -2px;
    }
    a {
      &:hover {
        cursor: pointer;
        color: $main-bg-color;
      }
    }
  }
}
</style>

