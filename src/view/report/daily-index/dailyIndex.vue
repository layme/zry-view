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
        <Button type="warning" icon="ios-cloud-download-outline" @click="requestExportFile"> 导 出</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="listDate">
      <template slot-scope="{ row }" slot="type">
        <Tag v-if="row.type === 1" color="blue">运营期</Tag>
        <Tag v-else color="green">销售期</Tag>
      </template>
    </Table>
    <Modal
      title="文件导出"
      v-model="visible"
      :closable="false"
      :mask-closable="false">
      <Progress :percent="percent" />
      <div slot="footer">
        <Button type="text" @click="cancelExport">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { getDate } from '@/libs/tools'
import { getReportDaily } from '@/api/reportDaily'
import { requestExportFile, getExportProcess } from '@/api/common'
export default {
  name: 'dailyIndex',
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
        if (res.code === 200) {
          this.listDate = res.body.rows
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    requestExportFile () {
      this.percent = 0
      let dto = {
        type: 1000,
        jsonParam: JSON.stringify({
          projectBid: this.paramDto.projectBid,
          startCreateTime: getDate(this.paramDto.date[0], 'date'),
          endCreateTime: getDate(this.paramDto.date[1], 'date')
        })
      }
      requestExportFile(dto).then(res => {
        if (res.code === 200) {
          this.visible = true
          this.interval = setInterval(() => this.getExportProcess(res.body), 300)
        } else {
          this.visible = false
        }
      }).catch(() => {
        this.visible = false
      })
    },
    getExportProcess (key) {
      getExportProcess(key).then(res => {
        if (res.code === 200) {
          if (res.body.finish) {
            this.percent = 100
            setTimeout(() => { this.visible = false }, 800)
            this.$Message.success('文件已生成，开始下载')
            clearInterval(this.interval)
            this.download(res.body.fileUrl)
          } else {
            this.percent = res.body.percent
          }
        } else {
          this.visible = false
        }
      }).catch(() => {
        this.visible = false
      })
    },
    download (url) {
      const link = document.createElement('a')
      link.href = url
      link.style = 'visibility: hidden'
      link.download = `${Date.now()}.xls`
      document.body.appendChild(link)
      link.click()
      this.$forceUpdate()
      setTimeout(() => { document.body.removeChild(link) }, 1000)
    },
    cancelExport () {
      this.visible = false
      clearInterval(this.interval)
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
