<template>
  <div class="content">
    <div class="add-addr">
      <el-form
        :inline='true'
        label-position='top'
        :model='formData'
        @submit.native.prevent
      >
        <div class="flex flex-between">
          <el-form-item :label='$t("currencyType")||"币种"'>
            <el-select
              name='currency'
              v-model='formData.coin'
            >
              <el-option
                v-for="item in allCoin"
                :key='item.value'
                :label='item.coin'
                :value="item.coin"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label='$t("withdrawAddress")||"提币地址"'>
            <el-input
              name='address'
              v-model="formData.address"
            ></el-input>
          </el-form-item>
          <el-form-item :label='$t("note")||"备注"'>
            <el-input
              name='note'
              v-model="formData.title"
            ></el-input>
          </el-form-item>
        </div>
        <button
          class="btn btn-block btn-large btn-danger btn-active"
          v-text="$t('add')||'添加'"
          @click="addMyAddress(formData)"
        >
        </button>
      </el-form>
    </div>
    <div class="table-panel">
      <div
        class="panel-head"
        v-text="$t('addressList')||'地址列表'"
      ></div>
      <el-table
        v-loading='showLoading'
        :data='addrList'
        :header-cell-style='changeStyle'
      >
        <el-table-column :label="$t('currencyType')||'币种'">
          <template slot-scope="scope">
            {{scope.row.coin||scope.row.coinid}}
          </template>
        </el-table-column>
        <el-table-column
          prop='address'
          :label="$t('withdrawAddress')||'提币地址'"
        ></el-table-column>
        <el-table-column
          prop='title'
          :label="$t('note')||'备注'"
        ></el-table-column>
        <el-table-column
          width='150'
          :label="$t('operation')||'操作'"
        >
          <div
            class="operation color-danger txt-rt"
            @click="delAddr(scope.row.autoid,scope.$index)"
            slot-scope="scope"
            v-text="$t('delete')||'删除'"
          >
          </div>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allCoin: "",
      formData: {
        coin: "",
        address: "",
        title: ""
      },
      showLoading: false,
      addrList: []
    };
  },
  mounted() {
    this.routeModel.assetsRoutes = {
      i18nKey: "addressAdmin",
      title: this.$route.meta.title || "",
      path: this.$route.path
    };
    this.getMyAddress();
    this.getallcoin();
  },
  beforeRouteLeave(to, from, next) {
    this.routeModel.assetsRoutes = null;
    next();
  },
  methods: {
    getallcoin() {
      this.request(this.api.allcoin).then(res => {
        if (res && res.code != "0") {
          this.getDataFaild(res.msg);
          return false;
        }
        res.data && res.data.list && (this.allCoin = res.data.list);
      });
    },
    changeStyle({ columnIndex }) {
      if (columnIndex == 3) {
        return "text-align:right;";
      }
    },
    getMyAddress() {
      this.showLoading = true;
      this.request(this.api.getoutaddress).then(res => {
        console.log(`我的地址列表：${JSON.stringify(res)}`);
        this.showLoading = false;
        if (res && res.code != "0") {
          this.getDataFaild(res.msg);
          return false;
        }
        res.data && res.data.list && (this.addrList = res.data.list);
      });
    },
    addMyAddress(param) {
      this.request(this.api.addoutaddress, {
        ...param,
        showLoading: true
      }).then(res => {
        console.log(`添加地址：${JSON.stringify(res)}`);
        if (res && res.code != "0") {
          this.getDataFaild(res.msg);
          return false;
        }
        this.successMsg(res.msg || "添加成功");
        let obj = Object.assign({}, this.formData);
        this.addrList.unshift(obj);
        return Promise.resolve();
      });
    },
    delLocalAddr(index) {
      this.addrList.splice(index, 1);
    },
    // 删除地址
    delAddr(id, index) {
      this.request(this.api.deloutaaddress, {
        autoid: id,
        showLoading: true
      }).then(res => {
        if (res.code == "0") {
          this.successMsg(res.msg || "删除成功");
          this.delLocalAddr(index);
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
  .operation {
    cursor: pointer;
  }
}
</style>
