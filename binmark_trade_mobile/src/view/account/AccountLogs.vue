<template>
  <div class="log-list van-hairline--top overflow-y h-full">
    <div
      v-for="(item,i) in logs"
      :key='i'
      class="log van-hairline--bottom"
    >
      <div class="flex flex-between">
        <span
          class="title font-15 font-bold"
          v-text="item.updatelog"
        ></span>
        <span
          class="color-666 font-14"
          v-text="item.wdate"
        ></span>
      </div>
      <!-- <div
        class="color-999 font-14"
        v-text="item.wdate"
      ></div> -->
    </div>
  </div>
</template>
<script>
import { safeLogs } from "@/vuexStore/storeService.js";
export default {
  data() {
    return {
      logs: []
    };
  },
  async mounted() {
    this.logs = await safeLogs();
  }
};
</script>
<style lang="scss" scoped>
.log-list {
  background: #fff;
}
.log {
  padding: 1.25rem 1rem;
  .title {
    // margin-bottom: 1rem;
    line-height: 2rem;
  }
}
</style>