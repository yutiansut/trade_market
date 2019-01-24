<template>
  <div class="questions">
    <van-tabs
      line-width="50"
      v-model="active"
    >
      <van-tab title="工单记录">
        <div class="list-container van-hairline--top">
          <div
            v-for="(item,i) in workOrderList"
            :key='i'
            class="list-item van-hairline--bottom"
          >
            <van-row>
              <van-col
                class="font-bold font-15"
                span='20'
              >{{item.title}}</van-col>
              <van-col
                class="type color-999 font-14 flex flex-v-center"
                span='4'
              >{{item.type}}</van-col>
            </van-row>
            <div class="reply font-14">
              <div
                v-if="item.reply"
                class="reply-content"
              >回复：{{item.reply}}</div>
              <div
                v-else
                class="color-success"
              >等待客服回复</div>
              <span
                @click="imgPreview(item.url)"
                class="color-danger riple"
              >查看图片&gt;</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="常见问题">
        <div class="van-hairline--top">
          <van-collapse v-model="currentQindex">
            <van-collapse-item
              v-for="(item,i) in qList"
              :key='i'
              :title="item.title"
              title-class='font-bold'
              :name="i"
            >
              <div class=" font-14">{{item.reply}}</div>
            </van-collapse-item>
          </van-collapse>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { getHelpCenter, getWorkOrder } from "@/vuexStore/storeService.js";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      active: 0,
      qList: [],
      workOrderList: [],
      currentQindex: []
    };
  },
  async mounted() {
    try {
      this.qList = await getHelpCenter();
      this.workOrderList = await getWorkOrder();
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    imgPreview(url) {
      let img = new Image();
      img.src = url;
      img.onerror = () => {
        ImagePreview([this.assetConfig.imgs.default]);
      };
      ImagePreview([url]);
    }
  }
};
</script>
<style lang="scss">
.questions {
  .van-hairline--top-bottom::after {
    display: none;
  }
}
</style>
<style lang="scss" scoped>
.list-container {
  padding-left: 1rem;
  .list-item {
    padding: 1.6rem 1rem 1.6rem 0;
    line-height: 1.6;
  }
  .reply {
    margin-top: 1.25rem;
    padding: 1rem 1.25rem;
    background: #f6f6f6;
    > span {
      display: inline-block;
      margin-top: 0.25rem;
    }
  }
  .icon,
  .type {
    justify-content: flex-end;
  }
  .title {
    padding-bottom: 1rem;
  }
}
</style>
