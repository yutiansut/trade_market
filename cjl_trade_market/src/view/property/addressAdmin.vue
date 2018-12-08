<template>
    <div class="content">
        <div class="add-addr">
            <el-form 
                :inline='true'
                label-position='top'
                :model='formData'
                @submit.native.prevent>
                <div class="flex flex-between">
                  <el-form-item :label='$t("currencyType")||"币种"' >
                      <el-select name='currency' v-model='formData.coin'>
                          <el-option v-for="item in mainCoin.maincoin" 
                            :key='item.value' :label='item.coinid' :value="item.coinid">
                          </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item :label='$t("withdrawAddress")||"提币地址"'>
                      <el-input name='address' v-model="formData.address"></el-input>
                  </el-form-item>
                  <el-form-item :label='$t("note")||"备注"'>
                      <el-input name='note' v-model="formData.title"></el-input>
                  </el-form-item>
                </div>
                <button
                  class="btn btn-block btn-large btn-danger btn-active"
                  v-text="$t('add')||'添加'"
                  @click="addMyAddress(formData)">
                </button>
            </el-form>
        </div>
        <div class="table-panel">
            <div class="panel-head" v-text="$t('addressList')||'地址列表'"></div>
            <el-table
                :data='addrList' 
                :header-cell-style='changeStyle'>
                <el-table-column prop='coinid' :label="$t('currencyType')||'币种'"></el-table-column>
                <el-table-column prop='address' :label="$t('withdrawAddress')||'提币地址'"></el-table-column>
                <el-table-column prop='title' :label="$t('note')||'备注'"></el-table-column>
                <el-table-column width='150'
                    :label="$t('operation')||'操作'">
                    <div class="operation color-danger txt-rt"
                      @click="delAddr(scope.row.autoid)"
                      slot-scope="scope"
                      v-text="$t('delete')||'删除'">
                    </div>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import mainCoinModel from "@/model/allCoinModel.js";
export default {
  data() {
    return {
      mainCoin: mainCoinModel,
      formData: {
        coin: "",
        address: "",
        title: ""
      },
      addrList: null
    };
  },
  mounted() {
    this.routeModel.assetsRoutes = {
      i18nKey: "addressAdmin",
      title: this.$route.meta.title || "",
      path: this.$route.path
    };
    this.getMyAddress();
  },
  beforeRouteLeave(to, from, next) {
    this.routeModel.assetsRoutes = null;
    next();
  },
  methods: {
    changeStyle({ columnIndex }) {
      if (columnIndex == 3) {
        return "text-align:right;";
      }
    },
    getMyAddress() {
      this.request(this.api.getoutaddress).then(res => {
        console.log(`我的地址列表：${JSON.stringify(res)}`);
        if (res && res.code != "0") return this.getDataFaild(res.msg);
        res.data && res.data.list && (this.addrList = res.data.list);
      });
    },
    addMyAddress(param) {
      this.request(this.api.addoutaddress, param).then(res => {
        console.log(`添加地址：${JSON.stringify(res)}`);
        if (res && res.code != "0") return this.getDataFaild(res.msg);
        this.successMsg(res.msg || "添加成功");
        this.getMyAddress();
        return Promise.resolve();
      });
    },
    delLocalAddr(id) {
      this.addrList.map((item, index, arr) => {
        if (item.autoid == id) {
          arr.splice(index);
        }
      });
    },
    // 删除地址
    delAddr(id) {
      this.request(this.api.deloutaaddress, {
        autoid: id
      }).then(res => {
        if (res.code == "0") {
          this.successMsg(res.msg || "删除成功");
          this.delLocalAddr(id);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.add-addr {
  .el-form-item {
    margin: 0;
    width: 40.5%;
    &:first-child {
      width: 13.5%;
    }
  }
  overflow: hidden;
  border: $default-border;
  margin-top: 12px;
  padding: 30px 22px 22px;
  .btn {
    margin-top: 20px;
    width: 200px;
    float: right;
  }
}
.table-panel {
  border: $default-border;
  border-bottom: none;
  margin-top: 20px;
  .panel-head {
    @include textVcenter;
    padding: 0 15px;
    border-bottom: $default-border;
    background-color: #fcfcfc;
  }
}
</style>
