<template>
    <div class="notice-bar">
        <span class="p-rel text-wrap" v-for="(item,i) in noticeItem" :key='i'>
            <router-link  :to='item.link+item.id' v-text="item.label"></router-link>
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
          label: "公告1",
          link: "/notice/detail/"
        },
        {
          id: "2",
          label: "公告1",
          link: "/notice/detail/"
        }
      ]
    };
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

