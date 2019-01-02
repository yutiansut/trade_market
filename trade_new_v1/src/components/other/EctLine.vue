<template>
  <div
    ref="container"
    class="container"
  ></div>
</template>
<script>
import Echart from "echarts/lib/echarts";
import Line from "echarts/lib/chart/line";
export default {
  name: "ec-line",
  data() {
    return {};
  },
  mounted() {
    let myChart = Echart.init(this.$refs.container);
    myChart.setOption({
      tooltip: {},
      xAxis: {
        show: false,
        boundaryGap: false,
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {
        show: false
      },
      areaStyle: {},
      series: [
        {
          name: "销量",
          type: "line",
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });
    myChart.resize();
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>

