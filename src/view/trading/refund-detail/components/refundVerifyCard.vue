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
            <Tag color="warning">{{ orderInfo.refuseReason | refuseReasonFilter }}</Tag>
          </span>
        </Col>
        <Col :span="6" class="my-col" v-if="orderInfo.refundStatus === 4">
          <span class="my-span">备注:
            {{ orderInfo.refuseRemark | nullFilter }}
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
        <Button v-if="validRefuseBtn" type="primary" class="my-btn" @click="openRefuse">拒绝退款</Button>
      </Row>
    </div>
    <Modal
      v-model="visible"
      :loading="refuseLoading"
      title="拒绝退款"
      width="500"
      @on-ok="validateForm">
      <Form ref="refuseForm" :model="refuseDto" :rules="rules" :label-width="80">
        <FormItem label="拒绝原因" prop="refuseReason">
          <Select v-model="refuseDto.refuseReason" placeholder="" class="my-select">
            <Option v-for="x in refuseOptions" :value="x.value" :key="x.value">{{ x.label }}</Option>
          </Select>
        </FormItem>
        <div v-if="refuseDto.refuseReason === 3">
          <FormItem label="备注" prop="refuseRemark"
                    :rules="[{ required: true, message: '请输入备注信息', trigger: 'blur' }]">
            <Input type="textarea" v-model.trim="refuseDto.refuseRemark" placeholder="" :row="2"
                   :maxlength="200"></Input>
          </FormItem>
        </div>
        <FormItem v-else label="备注" prop="refuseRemark">
          <Input type="textarea" v-model.trim="refuseDto.refuseRemark" placeholder="" :row="2" :maxlength="200"></Input>
        </FormItem>
      </Form>
    </Modal>
  </Card>
</template>
<script>
import { saveOrderRefundInfo, submitRefundCheck, saveRefuseRefund } from '@/api/refund'
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
      },
      visible: false,
      refuseLoading: true,
      refuseDto: {
        orderBid: '',
        refundWay: '',
        refuseReason: 1,
        refuseRemark: ''
      },
      refuseOptions: [
        {
          label: '不符合退款规则，已超出退款时限',
          value: 1
        },
        {
          label: '用户取消退款',
          value: 2
        },
        {
          label: '其他',
          value: 3
        }
      ],
      rules: {}
    }
  },
  computed: {
    validRefuseBtn () {
      return this.$route.query.flag === 'n' && !(this.orderInfo.isRelease === 0 && this.orderInfo.refundStatus === 0 && (this.orderInfo.orderStatus === 8 || this.orderInfo.orderStatus === 9 || this.orderInfo.orderStatus === 10))
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
    },
    openRefuse () {
      this.visible = true
      this.refuseDto.orderBid = this.orderInfo.orderBid
      this.refuseDto.refundWay = this.orderInfo.refundWay
      this.refuseDto.refuseRemark = this.orderInfo.refuseRemark
    },
    validateForm () {
      this.$refs.refuseForm.validate((valid) => {
        if (valid) {
          this.refuseRefund()
        } else {
          this.handleError()
        }
      })
    },
    refuseRefund () {
      saveRefuseRefund(this.refuseDto).then(() => {
        this.$Message.success('拒绝成功')
        this.visible = false
      }).catch(() => {
        this.handleError()
      })
    },
    handleError () {
      setTimeout(() => {
        this.refuseLoading = false
        this.$nextTick(() => {
          this.refuseLoading = true
        })
      }, 500)
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
    },
    refuseReasonFilter (val) {
      switch (val) {
        case 1:
          return '不符合退款规则，已超出退款时限'
        case 2:
          return '用户取消退款'
        case 3:
          return '其他'
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
