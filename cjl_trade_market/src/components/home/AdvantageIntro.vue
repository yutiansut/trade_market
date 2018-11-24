<template>
    <div class="blank-box">
        <div v-for="(item,i) in article" :key='i' class="box-panel p-rel">
            <dl class="abs-v-center" :class="i%2==0?'lf-0':'rt-0'">
                <dt v-text="item.title"></dt>
                <dd v-text="item.content"></dd>
            </dl>
            <img :class="i%2==0?'fr':'fl'" :src="item.thumb" alt="">
        </div>
    </div>
</template>
<script>
export default {
  name: "advantage-intro",
  data() {
    return {
      article: [
        {
          title: "系统可靠",
          content:
            "银行级用户数据加密、动态身份验证，多级风险识别控制，保障交易安全",
          thumb: require("@/assets/images/home/home_adv_1.png")
        },
        {
          title: "资金安全",
          content:
            "钱包多层加密，离线存储于银行保险柜资金第三方托管，确保账户安全",
          thumb: require("@/assets/images/home/home_adv_2.png")
        },
        {
          title: "快捷方便",
          content:
            "充值及时、提现迅速，每秒万单位的高性能交易引擎，保证一切快捷方便",
          thumb: require("@/assets/images/home/home_adv_3.png")
        },
        {
          title: "用户体验",
          content: "我们与用户感同身受，我们不断追求创新，满足用户各种要求",
          thumb: require("@/assets/images/home/home_adv_4.png")
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.blank-box {
  padding: 0 72px;
  .box-panel {
    overflow: hidden;
    margin-top: 160px;
    dl {
      dt {
        font-size: 28px;
        font-weight: 600;
        color: $main-bg-color;
        margin-bottom: 26px;
      }
      dd {
        width: 360px;
        font-size: 18px;
        line-height: 1.8;
        font-weight: 500;
        color: #999;
      }
    }
    img {
      width: 350px;
      height: auto;
    }
  }
}
</style>
