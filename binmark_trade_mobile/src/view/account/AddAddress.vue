<template>
  <div class="wh-full">
    <van-cell
      :title="coin||'请选择币种'"
      is-link
      @click='showPicker'
    ></van-cell>
    <div class="panel">
      <div class="title font-14 font-bold">提币地址</div>
      <van-field
        v-model="address"
        type="textarea"
        placeholder="请输入地址"
        rows="2"
        autosize
      />
    </div>
    <div class="panel">
      <div class="title font-14 font-bold">备注</div>
      <van-field
        v-model="title"
        type="textarea"
        placeholder="备注"
        rows="1"
        autosize
      />
    </div>
    <div class="btn-group">
      <button
        :disabled='disabled'
        @click="onSubmit"
        class="btn-block btn-large btn-primary riple"
      >添加</button>
    </div>
    <!-- 币种上拉菜单 -->
    <transition name="van-slide-up">
      <van-picker
        title='选择币种'
        show-toolbar
        v-show="show"
        :columns="coinList"
        value-key='coin'
        visible-item-count='3'
        @confirm="onConfirm"
        @cancel='cancelPicker'
      />
    </transition>
  </div>
</template>
<script>
import { addAddress, getAllCoin } from "@/vuexStore/storeService.js";
import { Picker } from "vant";
export default {
  components: { Picker },
  data() {
    return {
      show: false,
      title: "",
      address: "",
      coin: "",
      coinList: []
    };
  },
  mounted() {
    getAllCoin().then(res => {
      if (res) {
        this.coinList = res;
      }
    });
  },
  computed: {
    disabled() {
      if (!this.title || !this.address || !this.coin) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    showPicker() {
      this.show = true;
    },
    onSubmit() {
      addAddress(this.title, this.coin, this.address).then(res => {
        if (res) {
          this.navigateTo("/account/address");
        }
      });
    },
    onConfirm(item) {
      this.coin = item.coin;
      this.show = false;
    },
    cancelPicker() {
      this.show = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.van-picker {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 999;
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
</style>