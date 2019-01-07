<template>
    <div class="main-container">
        <h1 class="txt-center">企业优势</h1>
        <div class="show-content-free">
          <advantage-intro></advantage-intro>
        </div>
    </div>
</template>
<script>
import AdvantageIntro from "@/components/home/AdvantageIntro";
export default {
  components: { AdvantageIntro }
};
</script>

<style lang="scss" scoped>
.main-container {
  width: $content-width;
  margin: 0 auto;
  h1 {
    margin-top: 40px;
  }
}
</style>