<template>
  <div>
    <Form :model="customer" :label-width="50">
      <Row>
        <Col :span="12">
          <FormItem label="姓名" prop="customerMobile">
            {{ customer.nickName | nullFilter }}
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="手机号" prop="customerMobile">
            {{ customer.customerMobile | nullFilter }}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :span="12">
          <FormItem label="性别" prop="customerMobile">
            {{ customer.customerSex | nullFilter | sexFilter }}
          </FormItem>
        </Col>
        <Col :span="12">
          <FormItem label="证件号" prop="customerMobile">
            {{ customer.idNo | nullFilter }}
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Table stripe :columns="columns" :data="orderList" :loading="loading" max-height="300" size="small">
      <template slot-scope="{ row }" slot="perStartDate">
        <div>{{ row.perStartDate | dateFilter }}</div>
      </template>
      <template slot-scope="{ row }" slot="perEndDate">
        <div>{{ row.perEndDate | dateFilter }}</div>
      </template>
      <template slot-scope="{ row }" slot="orderStatus">
        <div>{{ row.orderStatus | orderStatusFilter }}</div>
      </template>
    </Table>
  </div>
</template>
<script>
import { getPhoneByUid } from '@/api/socialContact'
export default {
  name: 'customerCard',
  props: {
    uid: String
  },
  data () {
    return {
      customer: {},
      orderList: [],
      loading: false,
      columns: [
        {
          title: '订单号码',
          key: 'orderNumber'
        },
        {
          title: '入住日期',
          slot: 'perStartDate'
        },
        {
          title: '退房日期',
          slot: 'perEndDate'
        },
        {
          title: '订单状态',
          slot: 'orderStatus'
        }
      ]
    }
  },
  methods: {
    getCustomerInfo () {
      this.loading = true
      getPhoneByUid(this.uid).then(res => {
        this.customer = res.body.customer
        this.orderList = res.body.orderList
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  created () {
    this.getCustomerInfo()
  },
  filters: {
    sexFilter (val) {
      if (val === 1) {
        return ''
      } else if (val === 2) {
        return ''
      } else {
        return val
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
