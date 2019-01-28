<template>
  <div class="log-list van-hairline--top h-full">
    <div class="h-full overflow-y">
      <div
        v-for="item in addressList"
        :key='item.autoid'
        class="list-item flex flex-v-center flex-between van-hairline--top"
      >
        <div class="col">
          <div
            class="title font-15 font-bold"
            v-text="item.title"
          ></div>
          <div
            class="font-14 color-999"
            v-text="item.address"
          ></div>
        </div>
        <div
          @click="delAddr(item.autoid)"
          class="col font-14 color-danger"
        >删除</div>
      </div>
    </div>
    <div class="btn-group">
      <button
        @click="navigateTo('/account/add_address')"
        class="btn-block btn-large btn-primary riple"
      >新增地址</button>
    </div>
  </div>
</template>
<script>
import { getAddress, deleteAddress } from "../../vuexStore/storeService.js";
import { Dialog } from "vant";
export default {
  data() {
    return {
      addressList: []
    };
  },
  mounted() {
    getAddress().then(res => {
      this.addressList = res;
    });
  },
  methods: {
    delAddr(id) {
      if (id) {
        Dialog.confirm({
          title: "提示",
          message: "确认删除?"
        })
          .then(() => {
            deleteAddress(id).then(res => {
              getAddress().then(res => {
                this.addressList = res;
              });
            });
          })
          .catch(() => {});
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.log-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.list-item {
  padding: 1rem;
  background: #fff;

  .title {
    margin-bottom: 0.5rem;
  }
}
.btn-group {
  padding: 1rem;
}
</style>