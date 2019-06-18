<template>
  <div>
    <Form :model="paramDto" :label-width="80" inline>
      <FormItem label="项目">
        <Select v-model="paramDto.projectCode" class="my-input" placeholder="" clearable>
          <Option
            v-for="item in $store.state.user.projectList"
            :key="item.bid"
            :label="item.projectName"
            :value="item.bid">
          </Option>
        </Select>
      </FormItem>
      <FormItem label="入住日期">
        <DatePicker v-model="paramDto.date" type="daterange" split-panels placeholder=""
                    class="my-input" clearable></DatePicker>
      </FormItem>
      <FormItem>
        <Button type="primary" icon="ios-search" @click="getReport"> 查 询</Button>
      </FormItem>
    </Form>
    <div class="full-top">
      <Spin size="large" fix v-if="loading" class="full-spin"></Spin>
      <Row :gutter="20">
        <Col :span="12">
          <Card dis-hover>
            <chart-pie :value="channelData" text="获知渠道" :subtext="channelSubtext" class="my-chart"></chart-pie>
          </Card>
        </Col>
        <Col :span="12">
          <Card dis-hover>
            <chart-pie :value="purposeData" text="出行目的" :subtext="purposeSubtext" class="my-chart"></chart-pie>
          </Card>
        </Col>
      </Row>
      <Row :gutter="20" class="my-row">
        <Col :span="12">
          <Card dis-hover>
            <chart-pie :value="impressData" text="印象深刻" :subtext="impressSubtext" class="my-chart"></chart-pie>
          </Card>
        </Col>
        <Col :span="12">
          <Card dis-hover>
            <chart-pie :value="ageData" text="年龄分层" :subtext="ageSubtext" class="my-chart"></chart-pie>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import { ChartPie } from '_c/charts'
import { getReport } from '@/api/guestReport'
import { getDate } from '@/libs/tools'

export default {
  name: 'guestAnalysis',
  components: {
    ChartPie
  },
  data () {
    return {
      paramDto: {
        projectCode: '',
        cityCode: '',
        date: [],
        startDate: '',
        endDate: ''
      },
      loading: false,
      channelData: [],
      channelSubtext: '',
      purposeData: [],
      purposeSubtext: '',
      impressData: [],
      impressSubtext: '',
      ageData: [],
      ageSubtext: ''
    }
  },
  methods: {
    getReport () {
      this.loading = true
      getReport(this.paramDto).then(res => {
        if (res.code === 200) {
          this.checkInCount = res.body.checkInCount
          this.channelData = res.body.channelData
          this.channelSubtext = `参评/入住: ${res.body.channelCount}/${res.body.checkInCount}`
          this.purposeData = res.body.purposeData
          this.purposeSubtext = `参评/入住: ${res.body.purposeCount}/${res.body.checkInCount}`
          this.impressData = res.body.areaData
          this.impressSubtext = `参评/入住: ${res.body.areaCount}/${res.body.checkInCount}`
          this.ageData = res.body.ageData
          this.ageSubtext = `参评/入住: ${res.body.ageCount}/${res.body.checkInCount}`
          this.dataFormat()
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    dataFormat () {
      this.channelData.forEach(item => {
        this.$set(item, 'value', item.count)
        this.$delete(item, 'code')
        this.$delete(item, 'count')
      })
      this.purposeData.forEach(item => {
        this.$set(item, 'value', item.count)
        this.$delete(item, 'code')
        this.$delete(item, 'count')
      })
      this.impressData.forEach(item => {
        this.$set(item, 'value', item.count)
        this.$delete(item, 'code')
        this.$delete(item, 'count')
      })
      this.ageData.forEach(item => {
        this.$set(item, 'value', item.count)
        this.$delete(item, 'code')
        this.$delete(item, 'count')
      })
    }
  },
  watch: {
    'paramDto.data' (val) {
      this.paramDto.startDate = val[0] ? getDate(val[0], 'date') : ''
      this.paramDto.endDate = val[1] ? getDate(val[1], 'date') : ''
    }
  },
  created () {
    this.getReport()
  }
}
</script>
<style lang="less" scoped>
  .my-row {
    margin-top: 20px;
  }
  .my-input {
    width: 300px;
  }
  .my-chart {
    height: 400px;
  }
  .full-top {
    position: relative;
    height: 100%;
  }
  .full-spin {
    height: 100%;
  }
</style>
