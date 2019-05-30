<template>
  <div class="con">
    <div class="subscript">
      {{ orderInfo.status | orderStatusFilter }}
    </div>
    <Row>
      <Col :span="12">
        <strong class="order order-number">订单号：{{ orderNumber }}</strong>
        <strong class="order order-price">¥ {{ orderInfo.amount }}</strong>
      </Col>
      <Col :span="12" style="text-align: right">
        <ButtonGroup>
          <Button type="primary" icon="ios-time-outline" ghost @click="logVisible = true">订单日志</Button>
          <Button type="primary" icon="ios-card" ghost @click="paymentVisible = true">支付明细</Button>
          <Button type="primary" icon="ios-print-outline" ghost>打印</Button>
          <Button type="primary" icon="ios-mail-outline" ghost @click="emailRender">发送邮件</Button>
        </ButtonGroup>
      </Col>
    </Row>
    <base-info-card :data="orderInfo" class="card-cls"></base-info-card>
    <Row :gutter="20">
      <Col :span="18">
        <stay-person-card class="card-cls"></stay-person-card>
      </Col>
      <Col :span="6">
        <order-remark-card class="card-cls"></order-remark-card>
      </Col>
    </Row>
    <order-action-card class="card-cls"></order-action-card>
    <Modal
      v-model="logVisible"
      title="订单日志"
      footer-hide>
      <div :style="{ paddingLeft: '20px' }">
        <order-log v-if="logVisible" :order-bid="orderInfo.bid"></order-log>
      </div>
    </Modal>
    <Modal
      v-model="paymentVisible"
      title="支付明细"
      width="60"
      footer-hide>
      <div :style="{ paddingLeft: '20px' }">
        <payment-detail v-if="paymentVisible" :order-bid="orderInfo.bid"></payment-detail>
      </div>
    </Modal>
  </div>
</template>
<script>
import baseInfoCard from './components/baseInfoCard'
import stayPersonCard from './components/stayPersonCard'
import orderRemarkCard from './components/orderRemarkCard'
import orderActionCard from './components/orderActionCard'
import orderLog from './components/orderLog'
import paymentDetail from './components/paymentDetail'

export default {
  name: 'orderDetail',
  components: {
    baseInfoCard,
    stayPersonCard,
    orderRemarkCard,
    orderActionCard,
    orderLog,
    paymentDetail
  },
  data () {
    return {
      orderNumber: '',
      orderInfo: {
        bid: '561972384',
        customer: '易贤超',
        phone: '15659971836',
        email: '',
        payWay: '微信支付',
        startDate: '2019-05-18',
        endDate: '2019-05-21',
        bedCount: 1,
        source: 'iOS',
        can: '2019-05-21',
        amount: 300.00,
        status: 2
      },
      logVisible: false,
      paymentVisible: false,
      email: ''
    }
  },
  methods: {
    getOrderDetail () {
      // do something
      this.orderNumber = this.$route.query.orderNumber
    },
    emailRender () {
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: this.email,
              autofocus: true,
              placeholder: '请输入邮箱'
            },
            on: {
              input: (val) => {
                this.email = val
              }
            }
          })
        }
      })
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
    }
  },
  watch: {
    '$route' (to, from) {
      this.getOrderDetail()
    }
  },
  created () {
    this.getOrderDetail()
  }
}
</script>
<style lang="less" scoped>
  .order {
    margin: 0 15px;
    font-size: 20px;
    &-number {
      margin-left: 50px;
    }
    &-price {
      color: #2d8cf0;
    }
  }

  .card-cls {
    margin-top: 20px;
    -webkit-box-shadow: #dcdee2 0 1px 6px;
    -moz-box-shadow: #dcdee2 0 1px 6px;
    box-shadow: #dcdee2 0 1px 6px;
  }

  .con {
    position: relative;
  }

  .subscript {
    color: #fff;
    height: 40px;
    width: 200px;
    position: absolute;
    left: -90px;
    top: -10px;
    text-align: center;
    font-size: 16px;
    line-height: 40px;
    background-color: #2d8cf0;
    -moz-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
</style>
