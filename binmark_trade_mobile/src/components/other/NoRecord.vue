<template>
  <div class="no-record txt-center">
    <img :src="assetConfig.imgs.no_record">
  </div>
</template>
<script>
export default {
  name: "no-record"
};
</script>
<style lang="scss" scoped>
.no-record {
  padding: 1.5rem;
  img {
    width: 30%;
  }
}
</style>