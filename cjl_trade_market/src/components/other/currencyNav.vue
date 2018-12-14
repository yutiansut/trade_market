// 币种导航
<template>
    <div :style="{'width':width}" class="container">
        <div class="serach">
            <i class="iconfont el-icon-search fl"></i>
            <div class="input-container">
                <input v-model="searchVal"
                  :placeholder="$t('currencySearch')+'...'"
                  type="text">
            </div>
        </div>
        <ul v-show="myLists.length>0" class="list-container">
            <li v-for='(item,i) in myLists'
                :key='i'
                @click="toPage(item)">
                <div class="list-item wh-full abs-v-center">
                    <img v-if='item.logo' class="thumb-20"
                        :src="item.logo" alt=""/>
                    <span v-text="item.coinid"></span>
                </div>
            </li>
        </ul>
        <div v-show='myLists.length==0' class="result txt-center" v-text="$t('noResult')"></div>
    </div>
</template>
<script>
export default {
  name: "currency-nav",
  props: {
    width: {
      type: String,
      default: "780px"
    }
  },
  data() {
    return {
      myLists: [],
      searchVal: "",
      coinid: null
    };
  },
  mounted() {
    this.$bus.on("navChange", data => {
      this.myLists = data;
    });
  },
  methods: {
    toPage: function(data) {
      this.navigateTo("/currency_trade", { data: JSON.stringify(data) });
    },
    matchSearch: function(v) {
      let data = [];
      this.myValue.map(item => {
        if (item.coinid && item.coinid.match(new RegExp(v, "i"))) {
          data.push({ ...item });
        }
      });
      return data;
    }
  },
  watch: {
    searchVal: function(newVal) {
      this.myLists = this.matchSearch(newVal);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  background: $bg-dark;
  overflow: hidden;
  .serach {
    height: 40px;
    padding-right: 2px;
    i {
      display: block;
      width: 40px;
      height: 100%;
      line-height: 40px;
      text-align: center;
      font-size: $font-large;
      color: #fff;
    }
    .input-container {
      margin-left: 40px;
      height: 100%;
    }
    input {
      width: 100%;
      height: 36px;
      box-sizing: border-box;
      padding-left: 10px;
      font-size: 16px;
    }
  }
  .result {
    color: #fff;
  }
  .list-container {
    overflow: hidden;
    li {
      position: relative;
      top: 1px;
      left: -1px;
      float: left;
      width: 10%;
      padding-top: calc(6.6% - 1px);
      border-right: 1px solid #444;
      border-bottom: 1px solid #444;
      box-sizing: border-box;
      color: #fff;
      cursor: pointer;
      transition: all 0.3s;
      &:nth-child(10n) {
        border-right-color: transparent;
      }
      &:hover {
        background: #444;
      }
    }
    .list-item {
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: $font-default;
      span {
        line-height: normal;
      }
      img {
        margin-bottom: 4px;
      }
    }
  }
}
</style>
