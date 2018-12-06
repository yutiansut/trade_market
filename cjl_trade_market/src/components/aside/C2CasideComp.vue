<template>
    <ul class="list-container">
      <li class="flex flex-between flex-v-center"
        v-for="(item) in dataList" :key='item.id'
        @click='onClick(item)'>
        <div class="currency flex flex-v-center">
          <img v-if='item.icon' 
            :src="item.icon" 
            class="thumb-20" alt="">
          <span v-text="item.coinid"></span>
        </div>
        <i v-if="showIcon" class="el-icon-arrow-right"></i>
      </li>
    </ul>
</template>
<script>
export default {
  name: "c2c-aside-comp",
  props: {
    myData: Array,
    showArrow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showIcon: true,
      dataList: []
    };
  },
  methods: {
    onClick(item) {
      this.$emit("onListClick", item);
    }
  },
  watch: {
    myData() {
      if (this.myData && Array.isArray(this.myData)) {
        this.dataList = this.myData;
      }
      this.showIcon = this.showArrow;
    }
  }
};
</script>

<style lang="scss" scoped>
.currency {
  margin-right: 11px;
}

.list-container {
  border-bottom: 1px solid $bd-color;
  li {
    @include textVcenter;
    padding: 0 10px;
    transition: all 0.4s;
    &:hover {
      background-color: #fcfcfc;
    }
  }
  img {
    display: inline-block;
    margin-right: 5px;
  }
}
</style>
