<template>
    <div class="side">
        <!-- tab选项卡 -->
        <div class="tab-wrap p-rel">
          <ul>
            <li @click="onTabChange(item.id,i)" v-for="(item,i) in tabConfig" 
              :key="i"
              :class='currentId==item.id?"active":""'
              v-text='item.label'>
          </li>
        </ul>
        </div>
        <el-input suffix-icon="el-icon-search"></el-input>
        <el-table style="font-size:14px;"
          :data='tableData'
          max-height='800'
          stripe>
          <el-table-column label='币种' width='100px'>
              <template slot-scope="scope">
              <div class="operate">
                  <img class="thumb-20" src="" alt="">
                  <span v-text="scope.row.currency"></span>
              </div>
              </template>
          </el-table-column>
          <el-table-column label='最新价' prop='latestPrize'></el-table-column>
          <el-table-column label='涨幅' prop='increase'>
            <template slot-scope="scope">
              <span :class="scope.row.increase>0?'color-danger':'color-success'" v-text="scope.row.increase"></span>
            </template>
          </el-table-column>
          <el-table-column width='56px' label='自选'>
              <template slot-scope="scope">
              <div class="operate">
                  <span v-text="scope.row.trend"></span>
                  <i class="el-icon-star-off"></i>
              </div>
              </template>
          </el-table-column>
      </el-table>
    </div>
</template>
<script>
export default {
  name: "ce-aside-comp",
  data() {
    return {
      tabConfig: [
        {
          id: "1",
          name: "USDT",
          label: "USDT"
        },
        {
          id: "2",
          name: "BTC",
          label: "BTC"
        },
        {
          id: "3",
          name: "ETH",
          label: "ETH"
        },
        {
          id: "4",
          name: "自选",
          label: "自选"
        }
      ],
      currentId: 1,
      tableData: [
        {
          thumb: "",
          currency: " BCD",
          latestPrize: "124",
          increase: "+6%"
        },
        {
          thumb: "",
          currency: " CNYT",
          latestPrize: "421",
          increase: "+6%"
        }
      ]
    };
  },
  methods: {
    onTabChange(id, index) {
      this.currentId = id;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-input {
  margin-top: 10px;
}

.operate {
  cursor: pointer;
  display: flex;
}
.active {
  color: $color-danger;
}
.tab-wrap {
  height: 40px;
  border-bottom: $default-border;
  ul {
    @include textVcenter;
    position: absolute;
    white-space: nowrap;
    display: flex;
    top: 1px;
    li {
      width: 80px;
      box-sizing: border-box;
      text-align: center;
      font-size: $font-normal;
      border: 1px solid transparent;
      border-bottom-color: $bd-color;
      font-weight: 500;
      &:first-child {
        border-left-color: transparent;
      }
      &:hover {
        cursor: pointer;
      }
      &.active {
        border-color: $bd-color;
        border-bottom-color: #fff;
      }
    }
  }
}
</style>

