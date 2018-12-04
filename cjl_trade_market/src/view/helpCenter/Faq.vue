<template>
    <div class="faq-content">
        <img class="banner" :src="banner" alt="">
        <div class="container">
            <ul class="tab-bar">
                <li v-for="(item,i) in tabCfg" 
                    :key='item.id'
                    v-text='$t(item.i18nKey)||item.title'
                    :class='currentId==item.id?"active":""'
                    @click='onTabChange(item.id,i)'>
                </li>
            </ul>
            <ul class="q-list">
                <template v-for="(item,i) in qList">
                  <li class="flex flex-between flex-v-center" 
                    :key='i'
                    @click='navigateTo("/help_center/faq_detail",{i18nKey:currentTab.i18nKey,type:currentId,qid:item.id})'>
                    <span class="font-16" v-text="item.title"></span>
                    <i class="el-icon-arrow-right font-16"></i>
                  </li>
                </template>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      banner: require("@/assets/images/help/bangzhu_banner.png"),
      currentId: 1,
      currentItem: null,
      tabCfg: [
        {
          i18nKey: "faq",
          id: "1",
          label: "常见问题"
        }
      ],
      currentTab: null,
      qList: null
    };
  },
  mounted() {
    this.currentTab = this.tabCfg[0];
    this.getQuestionList(this.currentId);
  },
  methods: {
    onTabChange(id, index) {
      this.currentId = id;
      this.currentTab = this.tabCfg[index];
    },
    getQuestionList(type) {
      let qList = this.storage.get("qList");
      if (qList) {
        this.qList = qList;
      } else {
        this.request(this.api.getquest, { type: type }).then(res => {
          console.log(`问题列表:${JSON.stringify(res)}`);
          if (res && res.code != "0") return this.getDataFaild(res.msg);
          res.data && res.data.list && (this.qList = res.data.list);
          this.storage.set("qList", this.qList);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 76%;
  margin: 20px auto 0 auto;
  .tab-bar {
    @include textVcenter(60px);
    border-top: $default-border;
    border-left: $default-border;
    li {
      position: relative;
      top: -1px;
      height: 100%;
      box-sizing: border-box;
      float: left;
      background: #fafafa;
      padding: 0 27px;
      border: $default-border;
      border-left: none;
      &.active {
        border-bottom: none;
        border-top: 2px solid $color-danger;
        background: #fff;
      }
    }
  }
  .q-list {
    @include textVcenter(60px);
    li {
      border-bottom: $default-border;
      padding: 0 10px;
      &:hover {
        cursor: pointer;
        background: #fafafa;
      }
      span {
        font-weight: 600;
      }
    }
  }
}
</style>
