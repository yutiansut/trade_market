<template>
    <div class="content">
        <div class="add-addr">
            <el-form 
                :inline='true'
                label-position='top'
                :model='formData'>
                <div class="flex flex-between">
                  <el-form-item :label='$t("currencyType")||"币种"' >
                      <el-select name='currency' v-model='formData.cid'>
                          <el-option v-for="item in formData.currencies" 
                            :key='item.value' :label='item.label' :value="item.value">
                          </el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item :label='$t("withdrawAddress")||"提币地址"'>
                      <el-input name='address' v-model="formData.address"></el-input>
                  </el-form-item>
                  <el-form-item :label='$t("note")||"备注"'>
                      <el-input name='note' v-model="formData.note"></el-input>
                  </el-form-item>
                </div>
                <button class="btn btn-block btn-large btn-danger btn-active" v-text="$t('add')||'添加'"></button>
            </el-form>
        </div>
        <div class="table-panel">
            <div class="panel-head" v-text="$t('addressList')||'地址列表'"></div>
            <el-table
                :data='addList' 
                :header-cell-style='changeStyle'>
                <el-table-column prop='currency' :label="$t('currencyType')||'币种'"></el-table-column>
                <el-table-column prop='address' :label="$t('withdrawAddress')||'提币地址'"></el-table-column>
                <el-table-column prop='note' :label="$t('note')||'备注'"></el-table-column>
                <el-table-column width='150' :label="$t('operation')||'操作'">
                    <div class="operation color-danger txt-rt"
                      slot-scope="scope"
                      v-text="$t('delete')||'删除'">
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
      formData: {
        cid: "",
        currencies: [
          {
            label: "币种1",
            id: "type_1"
          },
          {
            label: "币种2",
            id: "type_2"
          }
        ],
        address: "",
        note: ""
      },
      addList: [
        {
          currency: "age",
          address: "ageag",
          note: "gaege"
        }
      ]
    };
  },
  mounted() {
    this.routeModel.assetsRoutes = {
      i18nKey: "addressAdmin",
      title: this.$route.meta.title || "",
      path: this.$route.path
    };
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
