<template>
  <div>
    <img
      :src="banner"
      alt=""
    >
    <div class="main">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">{{$t('home')||"首页"}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/help_center/faq' }">{{$t('faqCenter')||"问题中心"}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t(breadNavItem.i18nKey)||breadNavItem.label}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-container>
        <el-aside width="360px">
          <ul class="list">
            <li
              v-for="item in qList"
              :key='item.id'
              v-text="item.title"
              :class="qid==item.id?'active':''"
            >
            </li>
          </ul>
        </el-aside>
        <el-main>
          <h1 v-text="qItem ?qItem.title:''"></h1>
          <p v-text="qItem?qItem.reply:''"></p>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
import questionModel from "@/model/questionModel";
let { faqList } = questionModel;
export default {
  data() {
    return {
      banner: require("@/assets/images/help/bangzhu_banner.png"),
      qList: null,
      qItem: null,
      qid: null,
      breadNavItem: {}
    };
  },
  mounted() {
    let params = this.getParams();
    if (params) {
      this.breadNavItem = params;
      this.qid = params.qid;
    }
    this.getQlist();
  },
  methods: {
    getParams() {
      return Object.assign({}, this.$route.query);
    },
    getQlist() {
      if (faqList) {
        this.qList = faqList;
        this.getQItem(this.qList, this.qid);
      } else {
        this.request(this.api.getquest).then(res => {
          console.log(`问题列表:${JSON.stringify(res)}`);
          if (res && res.code != "0") return this.getDataFaild(res.msg);
          if (res.data && res.data.list) {
            this.qList = questionModel.faqList = res.data.list;
            this.getQItem(this.qList, this.qid);
          }
        });
      }
    },
    // 获取问题详情
    getQItem(arrList, id) {
      arrList.map(item => {
        if (item.id && item.id == id) {
          this.qItem = item;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.main {
  width: 77%;
  margin: 30px auto 0 auto;
  .el-container {
    margin-top: 27px;
  }
  .el-aside {
    border-right: none;
    padding: 0;
  }
  .list {
    li {
      @include textVcenter;
      padding-left: 10px;
      &:hover,
      &.active {
        background: $hover-bg-color;
        color: #fff;
      }
    }
  }
  .el-main {
    h1 {
      margin-bottom: 25px;
    }
    padding: 0 0 0 40px;
    p {
      line-height: 1.8;
    }
  }
  .warn {
    margin-top: 25px;
    color: $color-danger;
  }
}
</style>


