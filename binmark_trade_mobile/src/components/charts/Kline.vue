<template>
  <div
    ref="chart"
    class="container"
  ></div>
</template>
<script>
import HighStock from "highcharts/highstock";
export default {
  props: {
    chartData: {
      type: Object,
      default: []
    }
  },
  data() {
    return {};
  },
  mounted() {
    HighStock.setOptions({
      lang: {
        rangeSelectorZoom: "", // 不显示 'zoom' 文字
        months: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "71月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ]
      },
      navigator: {
        enabled: false,
        height: 0
      },
      rangeSelector: {
        inputEnabled: false,
        selected: 0,
        buttonTheme: {
          display: "block" // 不显示按钮
        }
      },
      plotOptions: {
        series: {
          showInLegend: false
        }
      },
      tooltip: {
        split: false,
        shared: false
      },
      credits: {
        enabled: false
      }
    });
    HighStock.each(this.chartData, d => {
      d.length = 2;
    });
    HighStock.stockChart(this.$refs.chart, {
      series: [
        {
          type: "spline",
          name: "现价",
          data: this.chartData
        }
      ]
    });
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 20.5rem;
}
</style>


