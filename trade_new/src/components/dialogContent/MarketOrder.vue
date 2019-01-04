/**市场挂单买入/卖出 */
<template>
  <dialog-box
    :showDialog="showModal"
    :dialogTitle="title"
    @onDialogClose='closeModal'
  >
    <div class="content">
      <!-- <div class="form-group">
                <span class="label" v-text="sellerLabel||$t('sellerOnline')"></span>
                <el-input disabled name='seller'
                    :value='seller'>
                </el-input>
            </div> -->
      <div class="form-group">
        <span
          class="label"
          v-text="priceLabel||$t('price')"
        ></span>
        <el-input
          disabled
          name='price'
          :value='price'
        >
          <span
            class="slot-text font-16 color-666"
            slot="suffix"
          >CNY</span>
        </el-input>
      </div>
      <div class="form-group">
        <span
          class="label"
          v-text="volumnLabel||$t('buyVol')"
        ></span>
        <el-input
          disabled
          name='volumn'
          :value='volumn'
        >
          <span
            class="slot-text font-16 color-666"
            slot="suffix"
            v-text="coin"
          ></span>
        </el-input>
      </div>
      <div class="form-group">
        <span
          class="label"
          v-text="amountLabel||$t('money')"
        ></span>
        <el-input
          disabled
          name='amount'
          :value='amount'
        >
          <span
            class="slot-text font-16 color-666"
            slot="suffix"
          >CNY</span>
        </el-input>
      </div>
      <!-- <div class="form-group">
                <span class="label" v-text="limitLabel||$t('tradeLimit')"></span>
                <el-input disabled name='limitAmount'
                    :value='limitAmount'>
                    <span class="slot-text font-16 color-666" slot="suffix" v-text="coin"></span>
                </el-input>
            </div> -->
      <div class="btn-group">
        <button
          @click='formSubmit'
          class="btn-block btn-large btn-danger btn-active"
          v-text="$t('submit')||'提交'"
        >
        </button>
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
      default: false
    },
    sellerLabel: String,
    priceLabel: String,
    volumnLabel: String,
    amountLabel: String,
    limitLabel: String,
    seller: String,
    price: null,
    volumn: null,
    amount: null,
    limitAmount: null,
    coin: null
  },
  data() {
    return {
      showModal: this.show
    };
  },
  watch: {
    show: function() {
      this.showModal = this.show;
    }
  },
  methods: {
    formSubmit() {
      this.$emit("onSubmit");
    },
    closeModal() {
      this.showModal = this.show;
      this.$emit("closeModal");
    }
  }
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


