<template>
  <span class="bar-item flex flex-v-center">
    <router-link
      class="flex flex-v-center"
      :to='link||""'
    >
      <i
        class="iconfont"
        :class="iconClass"
      ></i>
      <em v-text="$t(label)"></em>
    </router-link>
  </span>
</template>
<script>
export default {
  name: "bar-item",
  props: {
    label: String,
    iconClass: String,
    link: String
  }
};
</script>
<style lang="scss" scoped>
.bar-item {
  height: 100%;
  color: #bdbec2;
  padding-left: 30px;
  i {
    margin-right: 4px;
  }
}
</style>
