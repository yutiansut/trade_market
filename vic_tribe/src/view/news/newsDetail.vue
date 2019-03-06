<template>
  <div class="new-detail wh-full overflow-y">
    <div class="detail-head van-hairline--bottom">
      <div class="news-title font-16 font-bold">{{newsDetail.noticeTitle}}</div>
      <!-- <div class="date color-999 font-12">{{new Date()}}</div> -->
    </div>
    <div class="detail-body font-14">
      {{newsDetail.noticeContext}}
    </div>
  </div>
</template>
<style lang="scss" scoped>
.new-detail {
  padding: 0 15px;
  box-sizing: border-box;
  background: #fff;
}
.detail-head {
  margin-top: 15px;
  padding-bottom: 15px;
  .date {
    margin-top: 10px;
  }
}
.detail-body {
  margin-top: 15px;
  line-height: 1.8;
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
    let { id, pageNo, pageSize } = this.$route.query;
    selectNotice(2, pageNo, pageSize).then(res => {
      if (res) {
        let list = res.list.concat([]);
        this.newsDetail = getItemById(id, list);
        console.log(this.newsDetail);
      }
    });
  }
};
</script>
