<template>
  <div class="main wh-full">

  </div>
</template>
<style lang="scss" scoped>
</style>

<script>
let { mapState } = Vuex;
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapState({
      googlestate: state => state.bindModel.googlestate
    })
  },
  mounted() {
    this.Store.dispatch("triggerUpdate", { googlestate: 1 });
    console.log(this.googlestate);
  }
};
</script>


