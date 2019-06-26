<template>
  <div>
    <order-form @search="listOrder" @exportList="exportFile"></order-form>
    <Table stripe :columns="columns" :data="orderList" :loading="loading" class="my-table">
      <template slot-scope="{ row }" slot="orderNumber">
        <a @click="toOrderDetail(row)">{{ row.orderNumber }}</a>
      </template>
      <template slot-scope="{ row }" slot="orderStatus">
        <span>{{ row.orderStatus | orderStatusFilter }}</span>
      </template>
      <template slot-scope="{ row }" slot="projectName">
        <span>{{ getProjectName(row.projectBid) }}</span>
      </template>
      <template slot-scope="{ row }" slot="startDate">
        <span>{{ row.startDate | dateFilter }}</span>
      </template>
      <template slot-scope="{ row }" slot="endDate">
        <span>{{ row.endDate | dateFilter }}</span>
      </template>
      <template slot-scope="{ row }" slot="createTime">
        <span>{{ row.createTime | dateTimeFilter }}</span>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.pageIndex"
          :page-size="paramDto.pageSize" @on-change="handlePageChange"/>
    <export-file ref="exportFile"></export-file>
  </div>
</template>
<script>
import orderForm from './orderForm'
import { getOrders } from '@/api/order'
import ExportFile from '_c/export-file/ExportFile'

export default {
  name: 'orderList',
  components: {
    orderForm,
    ExportFile
  },
  data () {
    return {
      loading: false,
      paramDto: {
        pageIndex: 1,
        pageSize: 10
      },
      columns: [
        {
          title: '订单号',
          slot: 'orderNumber',
          minWidth: 50
        },
        {
          title: 'OTA单号',
          key: 'otaOrderNumber',
          minWidth: 50
        },
        {
          title: '状态',
          slot: 'orderStatus'
        },
        {
          title: '项目',
          slot: 'projectName',
          tooltip: true
        },
        {
          title: '预订人',
          key: 'name'
        },
        {
          title: '预订手机号',
          key: 'phone',
          minWidth: 40
        },
        {
          title: '入住人数',
          key: 'bedCount'
        },
        {
          title: '间夜数',
          key: 'bedNights'
        },
        {
          title: '入住时间',
          slot: 'startDate'
        },
        {
          title: '退房时间',
          slot: 'endDate'
        },
        {
          title: '创建时间',
          slot: 'createTime'
        },
        {
          title: '金额/元',
          key: 'amountNoCoupon',
          width: 90
        }
      ],
      orderList: [],
      total: 30
    }
  },
  methods: {
    listOrder (dto) {
      Object.assign(this.paramDto, dto)
      this.paramDto.pageIndex = 1
      this.handlePageChange()
    },
    handlePageChange () {
      this.loading = true
      this.$delete(this.paramDto, 'checkInTime')
      this.$delete(this.paramDto, 'checkOutTime')
      getOrders(this.paramDto).then(res => {
        if (res.code === 200) {
          this.orderList = res.body.rows
          this.total = res.body.total
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    toOrderDetail (row) {
      const orderNumber = row.orderNumber
      const route = {
        name: 'orderDetail',
        query: {
          orderNumber
        }
      }
      this.$router.push(route)
    },
    getProjectName (projectBid) {
      return this.$store.state.user.projectList.find(item => item.bid === projectBid).projectName
    },
    exportFile (dto) {
      let data = {
        type: 1004,
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
