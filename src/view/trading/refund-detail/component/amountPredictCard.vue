<template>
  <Card>
    <p slot="title">
      金额预估
    </p>
    <a href="#" slot="extra" @click.prevent="refreshPredict">
      刷新
    </a>
    <div>
      <Row>
        <span class="refund">预计退款:
          <span class="refund refund-amount"> {{ predict.refundAmount }} </span>
          元
        </span>
      </Row>
      <Row class="my-row">
        <Col :span="6">
          <span>订单总额:
            <Tag color="blue">{{ predict.payAmount }}</Tag>
            元</span>
        </Col>
        <Col :span="6">
          <span>优惠券折扣:
            <Tag color="blue">{{ predict.favourAmount }}</Tag>
            元</span>
        </Col>
        <Col :span="6">
          <span>房租消费:
            <Tag color="blue">{{ predict.rentedAmount }}</Tag>
            元</span>
        </Col>
        <Col :span="6">
          <span>违约金消费:
            <Tag color="blue">{{ predict.penaltyAmount }}</Tag>
            元</span>
        </Col>
      </Row>
    </div>
  </Card>
</template>
<script>
export default {
  name: 'amountPredictCard',
  data () {
    return {
      predict: {
        refundAmount: 0,
        payAmount: 198,
        favourAmount: 0,
        rentedAmount: 198,
        penaltyAmount: 0
      }
    }
  },
  methods: {
    refreshPredict () {
      this.$Message.info('refresh predict amount')
    }
  }
}
</script>
<style lang="less" scoped>
  .refund {
    font-size: 30px;
    &-amount {
      color: #ed4014;
      font-size: 40px;
    }
  }
  .my-row {
    margin-top: 10px;
  }
</style>
