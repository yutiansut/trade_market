<template>
    <dialog-box
        :showDialog='showModal'
        dialogTitle='最佳匹配订单'>
        <div class="table-content">
            <div class='table-head flex flex-between'>
                <span class="cell">用户名</span>
                <span class="cell">价格</span>
                <span class="cell">数量</span>
                <span class="cell">操作</span>
            </div>
            <div class="table-body">
                <div v-for="(item,i) in dataList" 
                    :key='item.id'
                    class="table-row flex flex-between">
                    <span class="cell" v-text="item.name"></span>
                    <span class="cell" v-text="item.price"></span>
                    <span class="cell" v-text="item.amount"></span>
                    <span 
                        @click="handleFunc(item.id,i)"
                        class="cell operate"
                        v-text="operateLable"
                        :class="textColor">
                    </span>
                </div>
            </div>
        </div>
        <div class="btn-group">
          <button class="btn-block btn-large btn-danger">提交</button>
          <button class="btn-block btn-large btn-bordered">取消</button>
        </div>
    </dialog-box>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    myData: {
      type: Array,
      default: null,
    },
    operateLable: String,
  },
  data() {
    return {
      showModal: this.show,
      dataList: this.myData,
      textColor: 'danger',
    };
  },
  mounted() {
    switch (this.operateLable) {
      case '买入':
        this.textColor = 'danger';
        break;
      case '卖出':
        this.textColor = 'success';
        break;
    }
  },
  watch: {
    show: function() {
      this.showModal = this.show;
    },
  },
  methods: {
    handleFunc(id, index) {},
    closeModal() {
      this.showModal = false;
      this.$emit('closeModal');
    },
  },
};
</script>
<style lang="scss" scoped>
span.danger {
  color: $color-danger;
}
span.success {
  color: $color-success;
}
.table-head,
.table-row {
  padding: 0 10px;
  @include textVcenter;
  box-sizing: border-box;
  &:hover {
    background-color: #f5f5f5;
  }
}
.table-content {
  border: $default-border;
  margin-top: 22px;
  .table-head {
    background: #fafafa;
  }
  .operate {
    cursor: pointer;
  }
  .table-row {
    border-top: $default-border;
  }
  .cell {
    flex: 3;
    &:last-child {
      text-align: right;
      flex: 1;
    }
  }
}
.btn-group {
  margin-top: 30px;
  .btn-bordered {
    margin-top: 15px;
  }
}
</style>

