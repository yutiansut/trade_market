<template>
    <div class="notice-bar">
        <span class="p-rel text-wrap" v-for="(item,i) in noticeItem" :key='i'>
            <router-link  :to='"/notice/detail/"+item.id' v-text="item.title"></router-link>
        </span>
    </div>
</template>
<script>
export default {
  name: "notice-bar",
  data() {
    return {
      noticeItem: [
        {
          id: "1",
          title: "公告1"
        },
        {
          id: "2",
          title: "公告1"
        }
      ]
    };
  },
  mounted() {
    //获取公告列表
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.request(this.api.notices).then(res => {
        console.log(`公告列表:${JSON.stringify(res)}`);
        if (res && res.code != "0") return this.getDataFaild(res.msg);
        res.data &&
          res.data.list &&
          (this.noticeItem = res.data.list.slice(0, 6));
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
  @include textVcenter(60px);
  text-align: center;
  .text-wrap {
    display: inline-block;
    padding: 0 20px;
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

