<template>
  <div class="main wh-full">
    <my-header>
      <nav-bar slot="navBar"></nav-bar>
      <status-bar slot="statusBar">
        <bar-item
          slot="barItem"
          icon-class="icon-zichan"
          label='label16'
        ></bar-item>
        <bar-item
          icon-class="icon-dingdan"
          slot="barItem"
          label='label17'
        ></bar-item>
      </status-bar>
    </my-header>
    <my-footer></my-footer>
  </div>
</template>
<style lang="scss" scoped>
</style>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {}
};
</script>


