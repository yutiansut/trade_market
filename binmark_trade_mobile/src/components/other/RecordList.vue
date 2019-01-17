<template>
  <div class="list-item van-hairline--bottom">
    <div class="flex flex-between">
      <span
        class="font-16 font-bold"
        v-text="listData.coinid"
      ></span>
      <span
        class="font-16 font-bold"
        v-text="listData.prise"
      ></span>
    </div>
    <div class="font-14 flex flex-v-center flex-between">
      <span class="label">提现地址</span>
      <span
        class="address txt-rt"
        v-text="listData.address"
      ></span>
    </div>
    <div class="font-14 flex flex-v-center flex-between">
      <span class="status color-success">提现已完成</span>
      <span
        class="date"
        v-text="listData.writedate"
      ></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    itemData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      listData: {}
    };
  },
  mounted() {
    this.listData = this.itemData;
  },
  watch: {
    itemData(val) {
      this.listData = val;
    }
  },
  name: "record-list"
};
</script>
<style lang="scss" scoped>
.list-item {
  padding: 1.25rem 0 1rem 0;
  > div:not(:first-child) {
    margin-top: 2rem;
  }
  .label,
  .date {
    color: #ccc;
  }
  .label,
  .address {
    white-space: nowrap;
  }
  .label {
    flex: 1;
  }
  .address {
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 1rem;
    flex: 2;
  }
}
</style>