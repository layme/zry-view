<template>
  <div>
    <Row>
      <Col :span="18">
        <Form :model="paramDto" :label-width="80" inline>
          <FormItem label="项目">
            <Select v-model="paramDto.projectBid" placeholder="" class="my-input">
              <Option
                v-for="item in $store.state.user.projectList"
                :key="item.bid"
                :label="item.projectName"
                :value="item.bid">
              </Option>
            </Select>
          </FormItem>
          <FormItem label="日期区间">
            <DatePicker v-model="paramDto.date" type="daterange" split-panels placeholder=""
                        class="my-input" :clearable="false" :editable="false" :options="pickerOptions"></DatePicker>
          </FormItem>
          <FormItem>
            <Button type="primary" icon="ios-search" @click="getData"> 查 询</Button>
          </FormItem>
        </Form>
      </Col>
      <Col :span="6" style="text-align: right">
        <Button type="warning" icon="ios-cloud-download-outline" @click="exportFile"> 导 出</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="listDate">
      <template slot-scope="{ row }" slot="type">
        <Tag v-if="row.type === 1" color="blue">运营期</Tag>
        <Tag v-else color="green">销售期</Tag>
      </template>
    </Table>
    <export-file ref="exportFile"></export-file>
  </div>
</template>
<script>
import { getDate } from '@/libs/tools'
import { getReportDaily } from '@/api/reportDaily'
import ExportFile from '_c/export-file/ExportFile'
export default {
  name: 'dailyIndex',
  components: {
    ExportFile
  },
  data () {
    return {
      paramDto: {
        projectBid: this.$store.state.user.projectList[0].bid,
        date: [],
        startCreateTime: '',
        endCreateTime: ''
      },
      loading: false,
      listDate: [],
      columns: [
        {
          title: '日期',
          key: 'recordDate'
        },
        {
          title: '床位数',
          key: 'bedTotalCount'
        },
        {
          title: '入住床位数',
          key: 'checkinCount'
        },
        {
          title: 'OCC（入住率）',
          key: 'occ',
          render: (h, params) => {
            return h('div', `${params.row.occ}%`)
          }
        },
        {
          title: 'ADR（已售客房平均房价）',
          key: 'ard'
        },
        {
          title: 'RevPAR（每间可售房收入）',
          key: 'revpar'
        }
      ],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 24 * 60 * 60 * 1000
        }
      },
      visible: false,
      percent: 0,
      interval: ''
    }
  },
  methods: {
    getData () {
      this.loading = true
      let dto = {
        projectBid: this.paramDto.projectBid,
        startCreateTime: getDate(this.paramDto.date[0], 'date'),
        endCreateTime: getDate(this.paramDto.date[1], 'date')
      }
      getReportDaily(dto).then(res => {
        this.listDate = res.body.rows
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    exportFile () {
      this.percent = 0
      let dto = {
        type: 1000,
        jsonParam: JSON.stringify({
          projectBid: this.paramDto.projectBid,
          startCreateTime: getDate(this.paramDto.date[0], 'date'),
          endCreateTime: getDate(this.paramDto.date[1], 'date')
        })
      }
      this.$refs.exportFile.requestExportFile(dto)
    }
  },
  created () {
    let date = new Date(Date.now() - 24 * 60 * 60 * 1000)
    this.paramDto.date.push(date)
    this.paramDto.date.push(date)
    this.getData()
  }
}
</script>
<style lang="less" scoped>
  .my-input {
    width: 300px;
  }
</style>
