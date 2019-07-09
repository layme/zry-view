<template>
  <div>
    <refund-form @search="listRefund"></refund-form>
    <Table stripe :columns="columns" :data="data" :loading="loading" class="my-table">
      <template slot-scope="{ row }" slot="orderNumber">
        <a @click="toRefundDetail(row)">{{ row.orderNumber }}</a>
      </template>
      <template slot-scope="{ row }" slot="orderStatus">
        <div>{{ row.orderStatus | orderStatusFilter }}</div>
      </template>
      <template slot-scope="{ row }" slot="status">
        <div>{{ row.status | refundStatusFilter }}</div>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.pageIndex"
          :page-size="paramDto.pageSize" @on-change="handlePageChange"/>
  </div>
</template>
<script>
import refundForm from './refundForm'
import { getRefundList } from '@/api/refund'

export default {
  name: 'refundList',
  components: {
    refundForm
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
          title: '订单状态',
          slot: 'orderStatus'
        },
        {
          title: '退款状态',
          slot: 'status'
        },
        {
          title: '项目',
          key: 'projectName',
          tooltip: true
        },
        {
          title: '预订人',
          key: 'name'
        },
        {
          title: '入住人数',
          key: 'personCount',
          minWidth: 40
        },
        {
          title: '入住时间',
          key: 'checkInTime',
          minWidth: 30
        },
        {
          title: '退房时间',
          key: 'checkOutTime',
          minWidth: 30
        },
        {
          title: '申请时间',
          key: 'createTime',
          minWidth: 65
        },
        {
          title: '订单金额',
          key: 'amount'
        },
        {
          title: '退款金额',
          key: 'refundAmount'
        }
      ],
      data: [],
      total: 0
    }
  },
  methods: {
    listRefund (dto) {
      Object.assign(this.paramDto, dto)
      this.paramDto.pageIndex = 1
      this.handlePageChange()
    },
    handlePageChange () {
      this.loading = true
      getRefundList(this.paramDto).then(res => {
        this.data = res.body.rows
        this.total = res.body.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    toRefundDetail (row) {
      let flag = 'n'
      if (row.orderStatus === 11 || row.orderStatus === 6 || row.orderStatus === 1 || row.orderStatus === 2) {
        flag = 'y'
      }
      const orderBid = row.orderBid
      const route = {
        name: 'refundDetail',
        query: {
          orderBid,
          flag
        }
      }
      this.$router.push(route)
    }
  },
  filters: {
    orderStatusFilter (val) {
      switch (val) {
        case 1:
          return '已支付'
        case 2:
          return '已入住'
        case 3:
          return '退款申请中'
        case 4:
          return '已退款'
        case 5:
          return '待支付'
        case 6:
          return '已退房'
        case 7:
          return '已取消'
        case 8:
          return '已支付取消'
        case 9:
          return '未入住取消'
        case 10:
          return '未入住退房'
        case 11:
          return '已退订'
      }
    },
    refundStatusFilter (val) {
      switch (val) {
        case 0:
          return '待核实'
        case 1:
          return '待打款'
        case 2:
          return '打款成功'
        case 3:
          return '打款异常'
      }
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
