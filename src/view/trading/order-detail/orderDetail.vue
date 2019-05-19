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
          <Button type="primary" icon="ios-time-outline" ghost>订单日志</Button>
          <Button type="primary" icon="ios-card" ghost>支付明细</Button>
          <Button type="primary" icon="ios-print-outline" ghost>打印</Button>
          <Button type="primary" icon="ios-mail-outline" ghost>发送邮件</Button>
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
  </div>
</template>
<script>
import baseInfoCard from './component/baseInfoCard'
import stayPersonCard from './component/stayPersonCard'
import orderRemarkCard from './component/orderRemarkCard'
import orderActionCard from './component/orderActionCard'

export default {
  name: 'orderDetail',
  components: {
    baseInfoCard,
    stayPersonCard,
    orderRemarkCard,
    orderActionCard
  },
  data () {
    return {
      orderNumber: this.$route.query.orderNumber,
      orderInfo: {
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
      }
    }
  },
  methods: {
    getOrderDetail () {
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
    font-size: 18px;
    line-height: 40px;
    background-color: #2d8cf0;
    -moz-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
</style>
