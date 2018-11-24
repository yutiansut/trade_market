<template>
    <div class="faq-content">
        <img class="banner" :src="banner" alt="">
        <div class="container">
            <ul class="tab-bar">
                <li v-for="(item,i) in tabCfg" 
                    :key='item.id'
                    v-text='item.label'
                    :class='currentId==item.id?"active":""'
                    @click='onTabChange(item.id,i)'>
                </li>
            </ul>
            <ul class="q-list">
                <template v-for="(item,i) in currentItem">
                <li class="flex flex-between flex-v-center" 
                  :key='i'
                  @click='navigateTo("/help_center/faq_detail")'>
                  <span class="font-16" v-text="item.q"></span>
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
          id: "1",
          label: "新手指导"
        },
        {
          id: "2",
          label: "常见问题"
        },
        {
          id: "3",
          label: "C2C交易"
        }
      ],
      qList: [
        [{ q: "这是问题一" }, { q: "这里是问题二" }],
        [{ q: "这是问题二" }, { q: "这里是问题三" }],
        [{ q: "这是问题四" }, { q: "这里是问题五" }]
      ]
    };
  },
  mounted() {
    this.currentItem = this.qList[this.currentId - 1];
  },
  methods: {
    onTabChange(id, index) {
      this.currentId = id;
      this.currentItem = this.qList[index];
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
