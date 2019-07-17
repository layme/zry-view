<template>
  <div>
    <guest-form @search="listData" @exportList="exportFile"></guest-form>
    <Table stripe :columns="columns" :data="guestData" :loading="loading" class="my-table"></Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.pageNum"
          :page-size="paramDto.pageSize" @on-change="handlePageChange"/>
    <export-file ref="exportFile"></export-file>
  </div>
</template>
<script>
import guestForm from './guestForm.vue'
import { getGuestDataReport } from '@/api/reportGuest'
import ExportFile from '_c/export-file/ExportFile'
export default {
  name: 'guestData',
  components: {
    guestForm,
    ExportFile
  },
  data () {
    return {
      paramDto: {
        pageNum: 1,
        pageSize: 10
      },
      loading: false,
      guestData: [],
      total: 0,
      columns: [
        {
          title: '入住人',
          key: 'name'
        },
        {
          title: '入住人手机号',
          key: 'phone'
        },
        {
          title: '预订人',
          key: 'bookName'
        },
        {
          title: '预订人手机号',
          key: 'bookPhone'
        },
        {
          title: '订单号',
          key: 'orderNumber',
          width: 190
        },
        {
          title: '订单状态',
          key: 'orderStatusName'
        },
        {
          title: '项目',
          key: 'projectName'
        },
        {
          title: '入住时间',
          key: 'actualStartDate'
        },
        {
          title: '退房时间',
          key: 'actualEndDate'
        },
        {
          title: '预定时间',
          key: 'createTime',
          width: 150
        },
        {
          title: '客户分层',
          key: 'guestType'
        },
        {
          title: '累计入住次数',
          key: 'checkInTimes'
        },
        {
          title: '订单来源',
          key: 'orderChannelName'
        },
        {
          title: '获知渠道',
          key: 'channel'
        },
        {
          title: '到达城市目的',
          key: 'purpose'
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '印象最深刻',
          key: 'deepestImpression'
        },
        {
          title: '意见建议',
          key: 'suggestion',
          tooltip: true
        }
      ]
    }
  },
  methods: {
    listData (dto) {
      this.flushData(dto)
      Object.assign(this.paramDto, dto)
      this.paramDto.pageNum = 1
      this.handlePageChange()
    },
    handlePageChange () {
      this.loading = true
      getGuestDataReport(this.paramDto).then(res => {
        this.guestData = res.body.rows
        this.total = res.body.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    flushData (dto) {
      if (dto.createTime && dto.createTime[0]) {
        dto.createTime[0] = dto.createTime[0].getTime()
        dto.createTime[1] = dto.createTime[1].getTime()
      } else {
        dto.createTime = null
      }
      if (dto.actualStartDate && dto.actualStartDate[0]) {
        dto.actualStartDate[0] = dto.actualStartDate[0].getTime()
        dto.actualStartDate[1] = dto.actualStartDate[1].getTime()
      } else {
        dto.actualStartDate = null
      }
      if (dto.actualEndDate && dto.actualEndDate[0]) {
        dto.actualEndDate[0] = dto.actualEndDate[0].getTime()
        dto.actualEndDate[1] = dto.actualEndDate[1].getTime()
      } else {
        dto.actualEndDate = null
      }
    },
    exportFile (dto) {
      this.flushData(dto)
      let data = {
        type: 1001,
        jsonParam: JSON.stringify(dto)
      }
      this.$refs.exportFile.requestExportFile(data)
    }
  }
}
</script>
<style lang="less" scoped>
  .my-table {
    margin-top: 20px
  }
  .my-page {
    text-align: right;
    margin-top: 20px
  }
</style>
