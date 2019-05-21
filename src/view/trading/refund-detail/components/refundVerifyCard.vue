<template>
  <Card>
    <p slot="title">
      退款审核
    </p>
    <div>
      <Row>
        <span class="refund">预计退款：
          <span class="refund refund-amount"> {{ predict.refundAmount }} </span>
          元
        </span>
      </Row>
      <Row class="my-row">
        <Col :span="6">
          <span>订单总额：
            <Tag color="blue">{{ predict.payAmount }}</Tag>
            元</span>
        </Col>
        <Col :span="6">
          <span>优惠券折扣：
            <Tag color="blue">{{ predict.favourAmount }}</Tag>
            元</span>
        </Col>
        <Col :span="6">
          <span>房租消费：
            <Tag color="blue">{{ predict.rentedAmount }}</Tag>
            元</span>
        </Col>
        <Col :span="6">
          <span>违约金消费：
            <Tag color="blue">{{ predict.penaltyAmount }}</Tag>
            元</span>
        </Col>
      </Row>
      <Row class="my-row">
        <span>退款方式：
          <Tag color="blue">{{ predict.refundWay }}</Tag>
        </span>
      </Row>
      <Row class="my-row">
        <Button class="my-btn" @click="refreshPredict">估算退款</Button>
        <Button type="primary" class="my-btn" @click="refundConfirm">提交审核</Button>
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
        penaltyAmount: 0,
        refundWay: '原路退回'
      }
    }
  },
  methods: {
    refreshPredict () {
      this.$Message.info('refresh predict amount')
    },
    refundConfirm () {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>预计退款 <span style="color: #ed4014; font-size: 22px">' + this.predict.refundAmount + '</span> 元</p><p>此操作无法回滚，确定提交吗？</p>',
        onOk: () => {
          this.submitRefund()
        },
        onCancel: () => {
        }
      })
    },
    submitRefund () {
      this.$Message.success('submit refund')
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
    margin-top: 20px;
  }
  .my-btn {
    margin-right: 20px;
  }
</style>
