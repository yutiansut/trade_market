<template>
  <div class="app-body overflow-y new-detail">
    <div
      class="title font-18 font-bold"
      v-text="newsDetail.title"
    ></div>
    <span
      class="color-999"
      v-text="newsDetail.writedate"
    ></span>
    <div
      class="news-content font-14"
      v-text="newsDetail.con"
    ></div>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
export default {
  data() {
    return {
      newId: "",
      newsDetail: {}
    };
  },
  mounted() {
    this.newId = this.$route.params.id;
    this.newsDetail = this.getNewsDetail(this.Store.state.newsList, this.newId);
  },
  methods: {
    getNewsDetail(obj, idValue, idKey = "id") {
      if (obj && idValue) {
        let item = null;
        for (let i = 0; i <= obj.length; i++) {
          item = obj[i];
          if (item[idKey] && item[idKey] == idValue) {
            return item;
          }
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$gap: 1.25rem;
.new-detail {
  padding: 0 $gap;
  .title {
    margin: $gap 0;
  }
  .news-content {
    margin-top: $gap;
    line-height: 1.8;
  }
}
</style>
