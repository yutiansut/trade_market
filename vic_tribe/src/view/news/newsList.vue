<template>
  <div class="app-body overflow-y">
    <news-list
      v-for="(item,i) in $store.state.newsList"
      :key='item.id||i'
      :news-title='item.noticeTitle'
      :img-src='item.thumb'
      :news-tag='item.tag'
      :link-to='"/news/detail/"+item.id'
    ></news-list>
  </div>
</template>
<style lang="scss" scoped>
.app-body {
  background: #fff;
  padding: 1.9rem 15px 0 15px;
}
</style>
<script>
import newsList from "@/components/other/newsList";
export default {
  components: { newsList }
};
</script>
