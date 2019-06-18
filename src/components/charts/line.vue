<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartLine',
  props: {
    lineData: Object,
    text: String
  },
  data () {
    return {
      dom: null
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    initChart () {
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
    },
    drawLine () {
      let option = {
        title: {
          text: this.text
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: this.lineData.legendData
        },
        grid: {
          top: '12%',
          left: '1.2%',
          right: '1%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.lineData.xAxis
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: this.lineData.orderSeries
      }
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
      this.drawLine()
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  },
  watch: {
    lineData: {
      immediate: true,
      deep: true,
      handler (val) {
        if (this.dom && val) {
          this.drawLine()
        }
      }
    }
  }
}
</script>
