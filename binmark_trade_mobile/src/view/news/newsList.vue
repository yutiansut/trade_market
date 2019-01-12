<template>
  <div class="app-body overflow-y">
    <news-list
      v-for="(item,i) in Store.state.newsList"
      :key='item.id||i'
      :news-title='item.title'
      :content='item.content||""'
      :date='item.date'
      :link-to='"/news/detail/"+item.id'
    ></news-list>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
import newsList from "@/components/other/newsList";
export default {
  components: { newsList },
  data() {
    return {};
  }
};
</script>
