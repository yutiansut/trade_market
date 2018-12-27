<template>
  <div class="app-body overflow-y">
    <van-row gutter='20'>
      <van-col
        class="bg-#fff p-rel"
        span='8'
      >
        <img
          src=""
          alt=""
        >
        <span class="label font-16">购物商城</span>
      </van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      apps: [
        {
          label: "购物商城",
          icon: "",
          link: ""
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.app-body {
  padding: 1.25rem;
  .van-col {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    border-radius: 0.5rem;
    .label {
      color: #fff;
      display: block;
      background: #2c3640;
      text-align: center;
      padding: 0.25rem 0;
      line-height: normal;
    }
  }
}
</style>
