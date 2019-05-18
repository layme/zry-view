<template>
  <div class="con demo-tabs-style1">
    <div class="subscript">
      {{ orderInfo.status | orderStatusFilter }}
    </div>
    <Row>
      <Col :span="12">
        <span class="order order-number">订单号：{{ orderNumber }}</span>
        <span class="order order-price">¥ {{ orderInfo.amount }}</span>
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

    <Tabs type="card" v-model="activeName" class="card-cls">
      <TabPane label="基础信息" name="baseInfo">
        <base-info-card v-if="activeName === 'baseInfo'" :data="orderInfo" class="card-cls"></base-info-card>
      </TabPane>
      <TabPane label="入住人信息" name="stayPerson">
        <stay-person-card v-if="activeName === 'stayPerson'" class="card-cls"></stay-person-card>
      </TabPane>
      <TabPane label="床位信息" name="bedInfo">
        <stay-person-card v-if="activeName === 'bedInfo'" class="card-cls"></stay-person-card>
      </TabPane>
    </Tabs>
    <Row :gutter="20">
      <Col :span="18">
        <order-action-card class="card-cls"></order-action-card>
      </Col>
      <Col :span="6">
        <order-remark-card class="card-cls"></order-remark-card>
      </Col>
    </Row>
  </div>
</template>
<script>
import baseInfoCard from './baseInfoCard'
import stayPersonCard from './stayPersonCard'
import orderRemarkCard from './orderRemarkCard'
import orderActionCard from './orderActionCard'

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
      activeName: 'baseInfo',
      orderNumber: this.$route.params.orderNumber,
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
          return '待支付'
        case 2:
          return '已支付'
        case 3:
          return '已入住'
        case 4:
          return '已退房'
        case 5:
          return '已取消'
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

  .demo-tabs-style1 > .ivu-tabs-card > .ivu-tabs-content > .ivu-tabs-tabpane {
    padding: 15px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    border-left: #dcdee2 1px solid;
    border-bottom: #dcdee2 1px solid;
    border-right: #dcdee2 1px solid;
    margin-top: -16px;
  }
</style>
