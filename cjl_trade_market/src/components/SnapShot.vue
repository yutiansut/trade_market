// 咨询快照
<template>
    <div class="snap-item">
      <router-link :to='path?path:""'>
        <div class="title font-bit-bold font-18" v-text="title"></div>
        <div class="content" v-text="content"></div>
        <slot></slot>
      </router-link>
    </div>
</template>
<script>
export default {
  props: {
    title: String,
    content: String,
    path: String
  },
  name: "snap-shot",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.snap-item {
  &:hover .title {
    color: $main-bg-color;
  }
}
.content {
  margin: 22px 0;
  color: #666;
}
</style>
