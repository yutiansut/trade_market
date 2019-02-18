<template>
  <div class="content">
    <div
      class="title font-16 font-bold"
      v-text="$t('label194')"
    ></div>
    <div class="table-wrap">
      <el-table
        v-loading='showLoading'
        max-height='500'
        :data='orderDetailData'
      >
        <el-table-column></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.table-wrap {
  border: $default-border;
  border-bottom: none;
}
.title {
  margin-bottom: 25px;
}
</style>
<script>
export default {
  data() {
    return {
      showLoading: false
    };
  },
  mounted() {},
  methods: {}
};
</script>
