<template>
  <div class="app-main wh-full">
    <my-header></my-header>
    <div class="app-body h-full">
      <van-tabs
        sticky
        line-width='40'
        color='#333'
        v-model="tabIndex"
      >
        <van-tab title="意见反馈">
          <div class="van-hairline--top"></div>
          <van-row class="feedback-type">
            <van-col
              class="flex flex-h-center"
              span='6'
              v-for="(item,i) in feedBackTypes"
              :key='i'
            >
              <button
                @click='changeFeedType(item.code,i)'
                :class="i==typeIndex ?'btn-dark':'btn-normal'"
                class="btn-small btn-round"
                v-text="item.name"
              ></button>
            </van-col>
          </van-row>
          <div class="feedback-content">
            <div class="panel">
              <div class="title font-15">反馈内容</div>
              <van-field
                v-model="context"
                type="textarea"
                placeholder="请具体描述您的问题"
                rows="3"
                autosize
              />
            </div>
            <!-- <div class="panel">
              <div class="title font-15">联系方式</div>
              <van-field placeholder="邮箱/电话/qq/或微信"></van-field>
            </div> -->
          </div>
          <div class="btn-group">
            <button
              @click='pubFeedBack'
              :disabled='context==""?true:false'
              class="btn-block btn-large btn-dark btn-radius"
            >提交</button>
          </div>
        </van-tab>
        <van-tab title="历史反馈">
          <div
            v-if="feedbackList.length>0"
            class="list-container"
          >
            <div
              v-for="(item,i) in feedbackList"
              :key='i'
              class="list-item van-hairline--bottom"
            >
              <van-row>
                <van-col
                  class="font-15"
                  span='20'
                >{{item.feedbackContext}}</van-col>
                <van-col
                  class="type color-999 font-14 flex flex-v-center"
                  span='4'
                >{{item.feedbackTypeName}}</van-col>
              </van-row>
              <div class="reply font-14">
                <div
                  v-if="item.feekdackRemark"
                  class="reply-content"
                >回复：{{item.feekdackRemark}}</div>
                <div
                  v-else
                  class="color-success"
                >等待客服回复</div>
                <span
                  v-if="item.url"
                  @click="imgPreview(item.url)"
                  class="color-danger riple"
                >查看图片&gt;</span>
              </div>
            </div>
          </div>
          <div
            v-else
            class="no-data"
          >暂无数据</div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import {
  getFeedbackType,
  getFeedbackList,
  pushFeedback
} from "@/vuexStore/customerController.js";
export default {
  data() {
    return {
      feedBackTypes: [],
      typeIndex: 0,
      tabIndex: 0,
      context: "",
      type: "",
      feedbackList: []
    };
  },
  methods: {
    imgPreview() {},
    changeFeedType(code, i) {
      this.type = code;
      this.typeIndex = i;
    },
    pubFeedBack() {
      pushFeedback(this.type, this.context).then(res => {
        this.context = "";
      });
    }
  },
  mounted() {
    getFeedbackType().then(res => {
      this.feedBackTypes = res;
      try {
        this.type = res[0].code;
      } catch (err) {
        console.log(err);
      }
    });
    getFeedbackList().then(res => {
      this.feedbackList = res;
    });
  }
};
</script>
<style lang="scss" scoped>
.app-body {
  margin-top: 1.25rem;
}
.panel {
  padding: 1rem;
  background: #fff;
}
.van-field {
  margin-top: 1rem;
  background: #f5f5f5;
  padding: 1rem;
}
.btn-group {
  margin-top: 2rem;
  padding: 1rem;
}
.feedback-content {
  margin-top: 1.5rem;
}
.feedback-type {
  background: #fff;
  padding: 18px 0;
}
button.btn-normal {
  background: #f5f5f5;
}
.list-container {
  padding-left: 1rem;
  background: #fff;
  margin-top: 1.25rem;
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