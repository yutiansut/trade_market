<template>
    <dialog-box 
        :showDialog='showModal'
        :dialogTitle='$t("orderDetail")||title'
        @onDialogClose='closeModal'>
        <div class="content">
            <div class="form-group">
                <span class="label" v-text="$t('price')||priceLabel"></span>
                <el-input disabled name='price' 
                    :value='price'>
                </el-input>
            </div>
            <div class="form-group">
                <span class="label" v-text="$t('amount')||numLabel"></span>
                <el-input disabled name='num' 
                    :value='num'>
                </el-input>
            </div>
            <div class="form-group">
                <span class="label" v-text="$t('money')||amountLabel"></span>
                <el-input disabled name='amount' 
                    :value='amount'>
                </el-input>
            </div>
            <div class="form-group">
                <span class="label" v-text="$t('status')||stateLabel"></span>
                <el-input disabled name='stateLabel' 
                    :value='state'>
                </el-input>
            </div>
        </div>
    </dialog-box>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "订单详情"
    },
    priceLabel: {
      type: String,
      default: "价格"
    },
    numLabel: {
      type: String,
      default: "数量"
    },
    amountLabel: {
      type: String,
      default: "金额"
    },
    stateLabel: {
      type: String,
      default: "状态"
    }
  },
  data() {
    return {
      price: "0",
      amount: "0",
      num: "0",
      state: "待确认",
      showModal: this.show
    };
  },
  methods: {
    closeModal() {
      this.showModal = this.show;
      this.$emit("closeModal");
    }
  },
  watch: {
    show: function() {
      this.showModal = this.show;
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
</style>