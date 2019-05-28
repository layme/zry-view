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
      <template slot-scope="{ row }" slot="refundStatus">
        <div>{{ row.refundStatus | refundStatusFilter }}</div>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
  </div>
</template>
<script>
import refundForm from './refundForm'

export default {
  name: 'orderList',
  components: {
    refundForm
  },
  data () {
    return {
      loading: false,
      paramDto: {
        page: 1,
        limit: 10
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
          slot: 'refundStatus'
        },
        {
          title: '项目',
          key: 'projectName',
          tooltip: true
        },
        {
          title: '预订人',
          key: 'customer'
        },
        {
          title: '入住人数',
          key: 'personCount',
          minWidth: 40
        },
        {
          title: '入住时间',
          key: 'checkInDate',
          minWidth: 30
        },
        {
          title: '退房时间',
          key: 'checkOutDate',
          minWidth: 30
        },
        {
          title: '申请时间',
          key: 'createDate',
          minWidth: 65
        },
        {
          title: '订单金额',
          key: 'amount'
        },
        {
          title: '退款金额',
          key: 'amount'
        }
      ],
      data: [
        {
          bid: 'as70a7s9d0786',
          orderNumber: 'BJ201905170001',
          orderStatus: 6,
          refundStatus: 2,
          projectName: 'CBD自如驿',
          customer: 'ayu',
          personCount: 1,
          checkInDate: '2019-05-17',
          checkOutDate: '2019-05-18',
          createDate: '2019-05-17 10:05:39',
          amount: 159,
          refund: 30
        },
        {
          bid: 'as70a7s9d0787',
          orderNumber: 'BJ201905170008',
          orderStatus: 6,
          refundStatus: 2,
          projectName: 'CBD自如驿',
          customer: 'ayu',
          personCount: 1,
          checkInDate: '2019-05-17',
          checkOutDate: '2019-05-18',
          createDate: '2019-05-17 10:05:39',
          amount: 159,
          refund: 30
        },
        {
          bid: 'as70a7s9d0789',
          orderNumber: 'BJ201905170009',
          orderStatus: 6,
          refundStatus: 2,
          projectName: 'CBD自如驿',
          customer: 'ayu',
          personCount: 1,
          checkInDate: '2019-05-17',
          checkOutDate: '2019-05-18',
          createDate: '2019-05-17 10:05:39',
          amount: 159,
          refund: 30
        }
      ],
      total: 0
    }
  },
  methods: {
    listRefund (dto) {
      Object.assign(this.paramDto, dto)
      this.paramDto.page = 1
      this.handlePageChange()
    },
    handlePageChange () {
      console.info('paramDto', this.paramDto)
    },
    toRefundDetail (row) {
      const orderBid = row.bid
      const route = {
        name: 'refundDetail',
        query: {
          orderBid
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
