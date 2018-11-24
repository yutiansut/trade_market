/**市场挂单买入/卖出 */
<template>
    <dialog-box
        :showDialog="showModal"
        :dialogTitle="title"
        @onDialogClose='closeModal'>
        <div class="content">
            <div class="form-group">
                <span class="label" v-text="sellerLabel"></span>
                <el-input disabled name='seller'
                    :value='seller'>
                </el-input>
            </div>
            <div class="form-group">
                <span class="label" v-text="priceLabel"></span>
                <el-input disabled name='price'
                    :value='price'>
                    <span class="slot-text font-16 color-666" slot="suffix">CNY</span>
                </el-input>
            </div>
            <div class="form-group">
                <span class="label" v-text="volumnLabel"></span>
                <el-input disabled name='volumn'
                    :value='volumn'>
                    <span class="slot-text font-16 color-666" slot="suffix">USDT</span>
                </el-input>
            </div>
            <div class="form-group">
                <span class="label" v-text="amountLabel"></span>
                <el-input disabled name='amount'
                    :value='amount'>
                    <span class="slot-text font-16 color-666" slot="suffix">CNY</span>
                </el-input>
            </div>
            <div class="form-group">
                <span class="label" v-text="limitLabel"></span>
                <el-input disabled name='limitAmount'
                    :value='limitAmount'>
                    <span class="slot-text font-16 color-666" slot="suffix">USDT</span>
                </el-input>
            </div>
            <div class="btn-group">
                <button @click='formSubmit' class="btn-block btn-large btn-danger btn-active">提交</button>
                <button class="btn-block btn-large btn-bordered btn-active">取消</button>
            </div>
        </div>
    </dialog-box>
</template>
<script>
export default {
  props: {
    title: String,
    show: {
      type: Boolean,
      default: false,
    },
    sellerLabel: {
      type: String,
      default: '商家在线',
    },
    priceLabel: {
      type: String,
      default: '价格',
    },
    volumnLabel: {
      type: String,
      default: '买入量',
    },
    amountLabel: {
      type: String,
      default: '金额',
    },
    limitLabel: {
      type: String,
      default: '限额',
    },
  },
  data() {
    return {
      showModal: this.show,
      seller: '你好呀啊',
      price: '',
      volumn: '',
      amount: '',
      limitAmount: '',
    };
  },
  watch: {
    show: function() {
      this.showModal = this.show;
    },
  },
  methods: {
    formSubmit() {},
    closeModal() {
      this.showModal = false;
      this.$emit('closeModal');
    },
  },
};
</script>
<style lang="scss" scoped>
.form-group {
  margin-top: 15px;
  .label {
    display: inline-block;
    margin-bottom: 10px;
  }
  .slot-text {
    @include textVcenter;
  }
}
.btn-group {
  margin-top: 30px;
  .btn-bordered {
    margin-top: 15px;
  }
}
</style>


