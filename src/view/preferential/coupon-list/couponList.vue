<template>
  <div>
    <coupon-form :batch-number="$route.query.batchNumber" :activity-number="$route.query.activityNumber"
                 @search="listCoupon" @export="exportData"></coupon-form>
    <Table stripe :columns="columns" :data="couponList" :loading="loading" class="my-table">
      <template slot-scope="{ row }" slot="ticketNumber">
        <a @click="openCouponDetail(row)">{{ row.ticketNumber }}</a>
      </template>
      <template slot-scope="{ row }" slot="activityNumber">
        <a @click="toActivityDetail(row)">{{ row.activityNumber }}</a>
      </template>
      <template slot-scope="{ row }" slot="customerPhone">
        <div v-if="row.customerPhone">开启</div>
        <div v-else>-</div>
      </template>
      <template slot-scope="{ row }" slot="orderNumber">
        <div v-if="row.orderNumber">开启</div>
        <div v-else>-</div>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.size" @on-change="handlePageChange"/>
    <Modal
      title="优惠券详情"
      v-model="couponVisible"
      width="600"
      footer-hide>
      <div class="full-top">
        <Spin size="large" fix v-if="couponLoading" class="full-spin"></Spin>
        <coupon-detail-form v-if="Object.keys(coupon).length" :coupon="coupon"></coupon-detail-form>
        <div v-else class="no-data">暂无数据</div>
      </div>
    </Modal>
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
import couponForm from './couponForm.vue'
import couponDetailForm from '../coupon-detail/couponDetailForm.vue'
import { listCoupon, getTicketDetail } from '@/api/coupon'
import { requestExportFile, getExportProcess } from '@/api/common'

export default {
  name: 'couponList',
  components: {
    couponForm,
    couponDetailForm
  },
  data () {
    return {
      paramDto: {
        page: 1,
        size: 10
      },
      couponList: [],
      total: 0,
      columns: [
        {
          title: '优惠券编号',
          slot: 'ticketNumber',
          width: 150
        },
        {
          title: '优惠活动编号',
          slot: 'activityNumber'
        },
        {
          title: '优惠券状态',
          key: 'couponState'
        },
        {
          title: '优惠活动状态',
          key: 'activityState'
        },
        {
          title: '绑定手机号',
          slot: 'customerPhone'
        },
        {
          title: '订单号',
          slot: 'orderNumber'
        },
        {
          title: '兑换码',
          key: 'redeemCode'
        },
        {
          title: '有效期',
          key: 'validDate'
        },
        {
          title: '使用条件',
          key: 'conditions',
          tooltip: true
        },
        {
          title: '活动内容',
          key: 'activityContent',
          tooltip: true
        }
      ],
      loading: false,
      coupon: {},
      couponLoading: false,
      couponVisible: false,
      visible: false,
      percent: 0,
      interval: ''
    }
  },
  methods: {
    listCoupon (data) {
      let dto = JSON.parse(JSON.stringify(data))
      this.$delete(dto, 'dateRange')
      this.flushData(dto)
      Object.assign(this.paramDto, dto)
      this.paramDto.page = 1
      this.handlePageChange()
    },
    handlePageChange () {
      this.loading = true
      listCoupon(this.paramDto).then(res => {
        if (res.code === 200) {
          this.couponList = res.body.rows
          this.total = res.body.total
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    flushData (dto) {
      if (Array.isArray(dto.activityState)) {
        dto.activityState = dto.activityState.join(',')
      }
      if (Array.isArray(dto.couponState)) {
        dto.couponState = dto.couponState.join(',')
      }
    },
    exportData (data) {
      if (!data.batchNumber || !data.activityNumber) {
        this.$Message.warning('导出文件时 [批次号] 和 [优惠活动编号] 是必填条件')
      } else {
        let dto = JSON.parse(JSON.stringify(data))
        this.$delete(dto, 'dateRange')
        this.flushData(dto)
        this.requestExportFile(dto)
      }
    },
    openCouponDetail (row) {
      this.coupon = {}
      this.couponVisible = true
      this.couponLoading = true
      getTicketDetail(row.couponBid).then(res => {
        if (res.code === 200) {
          this.coupon = res.body
        }
        this.couponLoading = false
      }).catch(() => {
        this.couponLoading = false
      })
    },
    toActivityDetail (row) {
      const activityBid = row.activityBid
      const route = {
        name: 'activityDetail',
        query: {
          activityBid
        }
      }
      this.$router.push(route)
    },
    requestExportFile (dto) {
      this.percent = 0
      let data = {
        type: 1002,
        jsonParam: JSON.stringify(dto)
      }
      requestExportFile(data).then(res => {
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
  }
}
</script>
<style lang="less" scoped>
  .my-table {
    margin-top: 20px;
  }
  .my-page {
    text-align: right;
    margin-top: 20px
  }
  .no-data {
    height: 100px;
    text-align: center;
    padding-top: 40px;
    color: #909399;
  }
  .full-top {
    position: relative;
    height: 100%;
  }

  .full-spin {
    height: 100%;
  }
</style>
