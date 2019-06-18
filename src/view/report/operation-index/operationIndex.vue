<template>
  <div>
    <Form :model="paramDto" :label-width="80" inline>
      <FormItem label="指标周期">
        <Select v-model="paramDto.cycleType" class="my-input" placeholder="" clearable>
          <Option
            v-for="item in cycleTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </Option>
        </Select>
      </FormItem>
      <FormItem label="月份选择">
        <DatePicker v-model="paramDto.date" type="month" placeholder="" class="my-input"></DatePicker>
      </FormItem>
      <FormItem>
        <Button type="primary" icon="ios-search" @click="getData"> 查 询</Button>
      </FormItem>
      <Row>
        <FormItem label="数据周期">
          <div>{{ dateRange }}</div>
        </FormItem>
      </Row>
    </Form>
    <div>
      <Spin size="large" fix v-if="loading" class="full-spin"></Spin>
      <Card class="my-card">
        <p slot="title">核心指标达成情况</p>
        <Table :columns="coreColumns" :data="coreData" border>
          <template slot-scope="{ row }" slot="type">
            <Tag v-if="row.type === 1" color="blue">运营期</Tag>
            <Tag v-else color="green">销售期</Tag>
          </template>
        </Table>
      </Card>
      <Card class="my-card my-card-top">
        <p slot="title">OCC</p>
        <Table :columns="occColumns" :data="occData"></Table>
        <chart-line :line-data="occLineData" text="occ走势图" class="my-chart"></chart-line>
      </Card>
      <Card class="my-card my-card-top">
        <p slot="title">新订分析</p>
        <Table :columns="newColumns" :data="newData"></Table>
        <chart-line :line-data="orderLineData" text="订单走势图" class="my-chart"></chart-line>
        <chart-line :line-data="nightLineData" text="间夜走势图" class="my-chart"></chart-line>
      </Card>
    </div>
  </div>
</template>
<script>
import { getReportCore, getReportCoreOCC, getLineReportCoreOCC, getMonthNewOrderCount, getChartNewOrderCount } from '@/api/reportOperation'
import { getDate } from '@/libs/tools'
import { ChartLine } from '_c/charts'

export default {
  name: 'operationIndex',
  components: {
    ChartLine
  },
  data () {
    return {
      paramDto: {
        cycleType: '2',
        date: new Date(),
        startDate: new Date()
      },
      cycleTypeOptions: [
        {
          label: '月指标',
          value: '2'
        }
      ],
      loading: false,
      coreData: [],
      coreColumns: [
        {
          title: '项目',
          key: 'projectNames'
        },
        {
          title: '项目阶段',
          slot: 'type',
          align: 'center'
        },
        {
          title: '床位数',
          align: 'center',
          children: [
            {
              title: '实际值',
              key: 'bedCount',
              align: 'center'
            }
          ]
        },
        {
          title: 'OCC',
          align: 'center',
          children: [
            {
              title: '目标值',
              key: 'occGoal',
              align: 'center',
              render: (h, params) => {
                return h('div', params.row.occGoal === -1 ? '-%' : `${params.row.occGoal}%`)
              }
            },
            {
              title: '实际值',
              key: 'occ',
              align: 'center',
              render: (h, params) => {
                return h('div', `${params.row.occ}%`)
              }
            }
          ]
        },
        {
          title: 'ADR',
          align: 'center',
          children: [
            {
              title: '目标值',
              key: 'ardGoal',
              align: 'center',
              render: (h, params) => {
                return h('div', params.row.ardGoal === -1 ? '-' : params.row.ardGoal)
              }
            },
            {
              title: '实际值',
              key: 'ard',
              align: 'center'
            }
          ]
        },
        {
          title: 'RevPAR',
          align: 'center',
          children: [
            {
              title: '目标值',
              key: 'revParGoal',
              align: 'center',
              render: (h, params) => {
                return h('div', params.row.revParGoal === -1 ? '-' : params.row.revParGoal)
              }
            },
            {
              title: '实际值',
              key: 'revPar',
              align: 'center'
            }
          ]
        }
      ],
      occData: [],
      occColumns: [
        {
          title: '项目',
          key: 'projectName'
        },
        {
          title: '目标值',
          key: 'occGoal',
          align: 'center',
          render: (h, params) => {
            return h('div', params.row.occGoal === -1 ? '-%' : `${params.row.occGoal}%`)
          }
        },
        {
          title: '实际值',
          key: 'occ',
          align: 'center',
          render: (h, params) => {
            return h('div', `${params.row.occ}%`)
          }
        }
      ],
      occLineData: {},
      newData: [],
      newColumns: [
        {
          title: '渠道',
          key: 'firstChannelName'
        },
        {
          title: '本月订单',
          key: 'orderCount',
          align: 'center'
        },
        {
          title: '本月间夜',
          key: 'nightCount',
          align: 'center'
        }
      ],
      newLineData: {}
    }
  },
  computed: {
    dateRange () {
      let now = new Date()
      let select = this.paramDto.date
      if (now.getFullYear() === select.getFullYear() && now.getMonth() === select.getMonth()) {
        now.setDate(1)
        return `${getDate(now, 'date')} 至 ${getDate(new Date(), 'date')}`
      } else {
        let startDate = select
        startDate.setDate(1)
        let currentMonth = select.getMonth()
        let nextMonth = ++currentMonth
        let nextMonthFirstDay = new Date(select.getFullYear(), nextMonth, 1)
        let oneDay = 1000 * 60 * 60 * 24
        return `${getDate(startDate, 'date')} 至 ${getDate(new Date(nextMonthFirstDay - oneDay), 'date')}`
      }
    },
    orderLineData () {
      return {
        legendData: this.newLineData.legendData,
        xAxis: this.newLineData.xAxis,
        orderSeries: this.newLineData.orderSeries
      }
    },
    nightLineData () {
      return {
        legendData: this.newLineData.legendData,
        xAxis: this.newLineData.xAxis,
        orderSeries: this.newLineData.nightSeries
      }
    }
  },
  methods: {
    getData () {
      this.paramDto.date.setDate(1)
      this.paramDto.startDate = getDate(this.paramDto.date, 'date')
      this.getReportCore()
      this.getReportCoreOCC()
      this.getLineReportCoreOCC()
      this.getMonthNewOrderCount()
      this.getChartNewOrderCount()
    },
    getReportCore () {
      this.loading = true
      getReportCore(this.paramDto).then(res => {
        if (res.code === 200) {
          this.coreData = res.body
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    getReportCoreOCC () {
      getReportCoreOCC(this.paramDto).then(res => {
        if (res.code === 200) {
          this.occData = res.body
        }
      })
    },
    getLineReportCoreOCC () {
      getLineReportCoreOCC(this.paramDto).then(res => {
        if (res.code === 200) {
          this.occLineData = res.body
        }
      })
    },
    getMonthNewOrderCount () {
      getMonthNewOrderCount(this.paramDto).then(res => {
        if (res.code === 200) {
          this.newData = res.body
        }
      })
    },
    getChartNewOrderCount () {
      getChartNewOrderCount(this.paramDto).then(res => {
        if (res.code === 200) {
          this.newLineData = res.body
        }
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="less" scoped>
  .my-input {
    width: 300px;
  }

  .full-top {
    position: relative;
    height: 100%;
  }

  .full-spin {
    height: 100%;
  }

  .my-card {
    -webkit-box-shadow: #dcdee2 0 1px 6px;
    -moz-box-shadow: #dcdee2 0 1px 6px;
    box-shadow: #dcdee2 0 1px 6px;
    &-top {
      margin-top: 20px;
    }
  }

  .my-chart {
    height: 300px;
    margin-top: 20px;
  }
</style>
