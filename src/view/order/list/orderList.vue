<template>
  <div>
    <order-form></order-form>
    <Table stripe :columns="columns" :data="data" :loading="loading">
      <template slot-scope="{ row }" slot="orderNumber">
        <Button type="text" @click="toOrderDetail(row)">{{ row.orderNumber }}</Button>
      </template>
    </Table>
    <Page style="text-align: right; margin-top: 20px" :total="total" show-total />
  </div>
</template>
<script>
import orderForm from './orderForm'
export default {
  name: 'orderList',
  components: {
    orderForm
  },
  data () {
    return {
      loading: false,
      columns: [
        {
          title: '订单号',
          slot: 'orderNumber',
          minWidth: 50
        },
        {
          title: 'OTA单号',
          key: 'otaNumber',
          minWidth: 50
        },
        {
          title: '状态',
          key: 'status'
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
          title: '预订手机号',
          key: 'customPhone',
          minWidth: 40
        },
        {
          title: '入住人数',
          key: 'personCount'
        },
        {
          title: '间夜数',
          key: 'nightCount'
        },
        {
          title: '入住时间',
          key: 'checkInDate'
        },
        {
          title: '退房时间',
          key: 'checkOutDate'
        },
        {
          title: '创建时间',
          key: 'createDate'
        },
        {
          title: '金额',
          key: 'amount'
        }
      ],
      data: [
        {
          bid: 'as70a7s9d0786',
          orderNumber: 'BJ201905170001',
          otaNumber: 'BJ201905170001',
          status: '已支付',
          projectName: 'CBD自如驿',
          customer: 'ayu',
          customPhone: '13240966922',
          personCount: 1,
          nightCount: 5
        },
        {
          bid: 'as70a7s9d0786',
          orderNumber: 'BJ201905170002',
          status: '已支付',
          projectName: 'CBD自如驿',
          customer: 'ayu',
          customPhone: '13240966922',
          personCount: 1,
          nightCount: 5
        },
        {
          bid: 'as70a7s9d0786',
          orderNumber: 'BJ201905170003',
          status: '已支付',
          projectName: 'CBD自如驿',
          customer: 'ayu',
          customPhone: '13240966922',
          personCount: 1,
          nightCount: 5
        },
        {
          bid: 'as70a7s9d0786',
          orderNumber: 'BJ201905170004',
          status: '已支付',
          projectName: 'CBD自如驿',
          customer: 'ayu',
          customPhone: '13240966922',
          personCount: 1,
          nightCount: 5
        },
        {
          bid: 'as70a7s9d0786',
          orderNumber: 'BJ201905170005',
          status: '已支付',
          projectName: 'CBD自如驿',
          customer: 'ayu',
          customPhone: '13240966922',
          personCount: 1,
          nightCount: 5
        }
      ],
      total: 0
    }
  },
  methods: {
    listOrder () {},
    toOrderDetail (row) {
      const orderNumber = row.orderNumber
      const route = {
        name: 'detail',
        params: {
          orderNumber
        }
      }
      this.$router.push(route)
    }
  }
}
</script>
