<template>
    <div>
        <snap-shot v-for="item in articleList"
            v-bind="item" 
            :key='item.id'
            :path='"/notice/detail/"+item.id'>
            <div class="statistic">
                <span>{{$t("view")||"阅读"}}：<em v-text="item.view"></em></span>
                <span>{{$t("updateTime")||"更新时间"}}：<em v-text="item.updated_data"></em></span>
            </div>
        </snap-shot>
    </div>
</template>
<script>
export default {
  data() {
    return {
      articleList: [
        {
          id: "1",
          updated_data: "2018-1-14",
          title: "Pcew 已经升级Smartmesh(SMT)到主网公告",
          content:
            "根据SmartMesh官方信息，SmartMesh主网已经上线并稳定运行。gate.io已经开始支持SMT主网资产，并为所有SMT用户按照1：1比例将SMT资产升级到主网资产,原基于以太坊的SMT代币将会全部发回给官方换取主网资产。目前SMT主网充值已经开... ",
          view: 100
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.statistic {
  color: #999;
  font-size: 12px;
  span {
    margin-right: 25px;
  }
}
</style>

