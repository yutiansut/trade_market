<template>
  <div class="app-body wh-full">
    <div
      :style="{backgroundImage:'url('+bg+')'}"
      class="total p-rel flex flex-h-center flex-v-center"
    >
      <span class="font-16 font-bit-bold">累计收益（积分）</span>
      <span class="font-24 font-bit-bold">230</span>
    </div>
    <div class="income-record">
      <div class="table-head font-16">
        <div class="p-rel">收益记录</div>
      </div>
      <div class="table-body">
        <van-row class="flex flex-v-center">
          <van-col span='12'>
            <div class="label font-14">领取收益</div>
            <small class="color-666 font-14">2018-8-2</small>
          </van-col>
          <van-col
            span='12'
            class="font-18 txt-rt"
          >+0.25</van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bg: require("@/assets/images/other/syjl.png")
    };
  }
};
</script>

<style lang="scss" scoped>
.total {
  height: 27.1vh;
  background-repeat: no-repeat;
  background-size: cover;
  flex-direction: column;
  span {
    color: #fff;
    &:first-child {
      margin-bottom: 0.5rem;
    }
  }
}
.table-head {
  background: #f5f5f5;
  height: 4.15rem;
  line-height: 4.15rem;
  padding: 0 1.25rem;
  padding-left: 1rem;
  div {
    padding-left: 1rem;
    &:before {
      content: "";
      width: 0.3rem;
      top: 50%;
      transform: translateY(-50%);
      height: 18px;
      position: absolute;
      background: #333;
      left: 0;
    }
  }
}
.table-body {
  background: #fff;
  .van-row {
    padding: 0.8rem 1.25rem;
    border-bottom: 0.075rem solid #eee;
  }
  .label {
    margin-bottom: 0.45rem;
  }
}
</style>

