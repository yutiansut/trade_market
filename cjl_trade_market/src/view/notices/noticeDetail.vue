<template>
    <div class='content wh-full'>
        <div class="title" v-text="articleDetail.title"></div>
        <div class="info">
            <span v-text="articleDetail.updated_at"></span>
            <span>阅读量：{{articleDetail.view}}</span></div> 
        <div class="break-line"></div>
        <div class="article-content">
            今年9月，中办、国办印发了《海南省机构改革方案》，这是全国首个获得中央批复同意的地方机构改革方案。此后，省一级的机构改革方案密集获批。
根据公开报道，截至目前，已有至少29省份的机构改革方案获中央批复同意，部分省份还透露了当地的党政机构设置数量。
例如，在此次机构改革后，宁夏的党政机构总数为55个；重庆的党政机构总数为64个，其中市委机构17个，市政府机构47个。
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      articleDetail: {
        title: "这里是标题",
        updated_at: "2018-8-9",
        view: "100"
      }
    };
  },
  mounted() {
    let id = this.$route.params.id;
  }
};
</script>
<style lang="scss" scoped>
.break-line {
  @include breakLine;
}
.content {
  box-sizing: border-box;
  padding: 0 100px;
  .info {
    color: #999;
    margin: 25px 0 15px 0;
    text-align: center;
  }
  .title {
    font-size: $font-ex-large;
    text-align: center;
  }
}
.article-content {
  margin-top: 20px;
  line-height: 1.8;
}
</style>
