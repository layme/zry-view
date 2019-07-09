<template>
  <Card>
    <p slot="title">
      <template v-if="orderInfo.refundStatus === 2">退款明细</template>
      <template v-else>退款审核</template>
    </p>
    <div>
      <Row>
        <Col :span="6">
          <span class="refund">
            <template v-if="orderInfo.refundStatus === 2">已退款:</template>
            <template v-else>预计退款:</template>
            <span class="refund refund-amount"> {{ predict.refundAmount | amountFilter }} </span>
            元
          </span>
        </Col>
        <Col :span="6" class="my-col">
          <span class="my-span">退款方式:
            <template v-if="orderInfo.availableRefundWay === 1">
              <template v-if="orderInfo.refundWay === 1">
                <Tag color="blue">原路退回</Tag>
              </template>
              <template v-else-if="orderInfo.refundWay === 2">
                <Tag color="blue">退至银行卡</Tag>
              </template>
            </template>
            <template v-else-if="orderInfo.availableRefundWay === 2">
              <template v-if="orderInfo.refundWay === 2">
                <Tag color="blue">退至银行卡</Tag>
              </template>
            </template>
            <template v-else>
              <Tag color="blue">OTA退款</Tag>
            </template>
          </span>
        </Col>
        <Col :span="6" class="my-col" v-if="orderInfo.refundStatus === 3">
          <span class="my-span">失败原因:
            <Tag color="error">{{ orderInfo.refundFailReason }}</Tag>
          </span>
        </Col>
        <Col :span="6" class="my-col" v-if="orderInfo.refundStatus === 4">
          <span class="my-span">拒绝原因:
            <Tag color="warning">{{ orderInfo.refuseReason }}</Tag>
          </span>
        </Col>
      </Row>
      <Row class="my-row">
        <Col :span="6">
          <span>订单总额:
            <Tag color="blue">{{ predict.payAmount | amountFilter }}</Tag>
            元</span>
        </Col>
        <Col :span="6">
          <span>优惠券折扣:
            <Tag color="blue">{{ predict.favourAmount | amountFilter }}</Tag>
            元</span>
        </Col>
        <Col :span="6">
          <span>房租消费:
            <Tag color="blue">{{ predict.rentedAmount | amountFilter }}</Tag>
            元</span>
        </Col>
        <Col :span="6">
          <span>违约金消费:
            <Tag color="blue">{{ predict.penaltyAmount | amountFilter }}</Tag>
            元</span>
        </Col>
      </Row>
      <Row class="my-row" v-if="orderInfo.refundStatus === 0 || orderInfo.refundStatus === 3">
        <Button class="my-btn" @click="refreshPredict">估算退款</Button>
        <Button type="primary" class="my-btn" :loading="loading" @click="saveOrderRefundInfo">提交审核</Button>
        <Button type="primary" class="my-btn">拒绝退款</Button>
      </Row>
    </div>
  </Card>
</template>
<script>
import { saveOrderRefundInfo, submitRefundCheck } from '@/api/refund'
export default {
  name: 'amountPredictCard',
  props: {
    orderInfo: Object,
    refundFeeDetailInfo: Array
  },
  data () {
    return {
      predict: {
        refundAmount: '',
        payAmount: '',
        favourAmount: '',
        rentedAmount: '',
        penaltyAmount: ''
      },
      loading: false,
      saveRefundDto: {
        bid: '',
        status: '',
        refundReason: '',
        refundAmount: '',
        refundWay: '',
        orderBid: ''
      }
    }
  },
  methods: {
    init () {
      this.predict.payAmount = this.refundFeeDetailInfo.find(x => x.feeType === 1).feeAmount
      this.predict.favourAmount = this.refundFeeDetailInfo.find(x => x.feeType === 2).feeAmount
      this.predict.rentedAmount = this.refundFeeDetailInfo.find(x => x.feeType === 3).feeAmount
      this.predict.penaltyAmount = this.refundFeeDetailInfo.find(x => x.feeType === 4).feeAmount
      this.predict.refundAmount = this.refundFeeDetailInfo.find(x => x.feeType === 5).feeAmount
    },
    refreshPredict () {
      this.$emit('refreshFee')
    },
    saveOrderRefundInfo () {
      this.loading = true
      this.saveRefundDto.bid = this.orderInfo.refundBid
      this.saveRefundDto.status = this.orderInfo.refundStatus
      this.saveRefundDto.refundReason = this.orderInfo.refundReason
      this.saveRefundDto.refundAmount = this.orderInfo.refundAmount
      this.saveRefundDto.refundWay = this.orderInfo.refundWay
      this.saveRefundDto.orderBid = this.orderInfo.orderBid
      saveOrderRefundInfo(this.saveRefundDto).then(() => {
        this.$Message.success('退款信息保存成功')
        this.refundConfirm()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
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
      submitRefundCheck(this.orderInfo.orderBid, this.orderInfo.orderStatus).then(() => {
        this.$Message.success('退款审核提交成功')
        this.$emit('refresh')
      })
    }
  },
  watch: {
    refundFeeDetailInfo: {
      handler () {
        this.init()
      },
      deep: true
    }
  },
  created () {
    this.init()
  },
  filters: {
    amountFilter (val) {
      if (val) {
        return val
      } else {
        if (val === 0) {
          return val
        } else {
          return '-'
        }
      }
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

  .my-col {
    height: 60px;
  }

  .my-span {
    position: absolute;
    bottom: 6px;
  }
</style>
