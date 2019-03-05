<template>
  <div class="new-detail wh-full overflow-y">
    <div class="detail-head">
      <div class="news-title font-16 font-bold">测试标题</div>
      <div class="date color-999 font-12">{{new Date()}}</div>
    </div>
    <div class="detail-body">

    </div>
  </div>
</template>
<style lang="scss" scoped>
.new-detail {
  padding: 0 15px;
  box-sizing: border-box;
}
.detail-head {
  margin-top: 15px;
  .date {
    margin-top: 10px;
  }
}
.detail-body {
  margin-top: 25px;
}
</style>

<script>
import { getItemById } from "../../assets/js/Utils.js";
import { selectNotice } from "@/vuexStore/customerController.js";
export default {
  data() {
    return { newsDetail: {} };
  },
  mounted() {
    let { id } = this.$route.query;
    selectNotice(2).then(res => {
      if (res) {
        let list = Object.assign({}, res.list);
        this.newsDetail = getItemById(id, list);
      }
    });
  }
};
</script>
