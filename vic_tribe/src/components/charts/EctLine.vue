<template>
  <div
    class="chart_content"
    ref="chartBox"
    style="margin: auto;"
  ></div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "chart",
  props: {
    type: {
      type: String
    },
    chartData: {
      type: Object,
      default: {}
    }
  },
  mounted() {
    let w =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    this.$refs.chartBox.style.width = w + "px";
    this.$refs.chartBox.style.height = (w * 2) / 3 + "px";
    const chart = echarts.init(this.$refs.chartBox);
    chart.setOption({
      backgroundColor: "#fff",
      grid: {
        x: "40px",
        top: "20px",
        bottom: "40px"
      },
      tooltip: {
        trigger: "axis"
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        axisTick: {
          //坐标轴刻度相关设置
          show: true, //是否显示坐标轴刻度。
          inside: false, //坐标轴刻度是否朝内，默认朝外。
          length: 1 //坐标轴刻度的长度。
        },
        data: this.chartData.date && this.chartData.date,
        splitLine: {
          //坐标轴在 grid 区域中的分隔线。
          show: false,
          lineStyle: {
            color: "#aaa",
            type: "dashed"
          }
        },
        axisLabel: {
          // rotate: 30,
        },
        axisLine: {
          lineStyle: {
            color: "#eee"
          }
        }
      },
      yAxis: {
        type: "value",
        scale: true,
        // splitNumber: 8,
        axisTick: {
          show: true,
          length: 1
        },
        axisLine: {
          lineStyle: {
            color: "#eee"
          }
        },
        splitLine: {
          lineStyle: {
            color: "#aaa",
            type: "dashed"
          }
        }
      },
      series: [
        {
          name: this.type,
          type: "line",
          data: this.chartData.value,
          areaStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#ff6b3f" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#ffdbd0" // 100% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            }
          },
          itemStyle: {
            color: "#ff6b3f"
          },
          smooth: true
        }
      ],
      lineStyle: {
        width: 1,
        type: "solid",
        color: "#ff6b3f"
      }
    });
  }
};
</script>
