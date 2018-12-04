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
  margin-top: 15px;
  padding-bottom: 20px;
  border-bottom: $default-border;
  &:hover .title {
    color: $main-bg-color;
  }
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    border-bottom: none;
  }
}
.content {
  margin: 22px 0;
  color: #666;
}
</style>
