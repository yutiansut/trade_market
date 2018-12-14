<template>
    <ul class="list-container">
      <li class="flex flex-between flex-v-center"
        v-for="(item) in dataList" :key='item.id'
        :class="(item.name==currentId||item.coinid==currentId)?'color-danger':''"
        @click='onClick(item)'>
        <div class="currency flex flex-v-center">
          <img v-if='item.icon||item.logo' 
            :src="item.icon||item.logo"
            class="thumb-20" alt="">
          <span class="font-bold" v-html="item.coinid||item.name+'&nbsp;/&nbsp;'+item.chinaname"></span>
        </div>
        <i v-if="showIcon" class="el-icon-arrow-right"></i>
      </li>
    </ul>
</template>
<script>
export default {
  name: "c2c-aside-comp",
  props: {
    myData: null,
    showArrow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      showIcon: true,
      dataList: [],
      currentId: ""
    };
  },
  methods: {
    onClick(item) {
      this.currentId = item.name || item.coinid;
      this.$emit("onListClick", item);
    }
  },
  watch: {
    myData() {
      if (this.myData && Array.isArray(this.myData)) {
        this.dataList = this.myData;
        this.currentId = this.myData[0] && this.myData[0].name;
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
