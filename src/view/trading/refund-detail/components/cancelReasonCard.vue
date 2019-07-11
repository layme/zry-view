<template>
  <Card>
    <p slot="title">
      取消原因
    </p>
    <Form :model="paramDto" :label-width="70">
      <Row>
        <Col :span="8">
          <FormItem label="取消原因">
            <Select v-model="paramDto.refundReason" placeholder="请选择" :disabled="orderInfo.refundStatus !== 0">
              <Option v-for="x in cancelOptions" :value="x.value" :key="x.value">{{ x.label }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :span="12">
          <FormItem label="备注">
            <Input type="textarea" v-model.trim="paramDto.refundRemark" placeholder="" :row="2" :maxlength="200"></Input>
          </FormItem>
        </Col>
      </Row>
      <Button v-if="orderInfo.refundStatus === 0" type="primary" @click="confirmUpdate"> 修 改</Button>
    </Form>
  </Card>
</template>
<script>
import { updateRefundDetail } from '@/api/refund'
export default {
  name: 'cancelReasonCard',
  props: {
    orderInfo: Object
  },
  data () {
    return {
      paramDto: {
        orderBid: '',
        sourceType: 1,
        bid: '',
        orderNumber: '',
        orderStatus: '',
        refundReason: '',
        refundRemark: ''
      },
      cancelOptions: [
        {
          label: '改变行程',
          value: 1
        },
        {
          label: '填错信息、选错床位了',
          value: 2
        },
        {
          label: '到店没房了',
          value: 3
        },
        {
          label: '其他',
          value: 4
        }
      ]
    }
  },
  methods: {
    init () {
      this.paramDto.orderBid = this.orderInfo.orderBid
      this.paramDto.bid = this.orderInfo.refundBid
      this.paramDto.orderNumber = this.orderInfo.orderNumber
      this.paramDto.orderStatus = this.orderInfo.orderStatus
      this.paramDto.refundReason = this.orderInfo.refundReason
      this.paramDto.refundRemark = this.orderInfo.refundRemark
    },
    confirmUpdate () {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>确定修改取消原因吗？</p>',
        onOk: () => {
          this.updateCancel()
        },
        onCancel: () => {
        }
      })
    },
    updateCancel () {
      updateRefundDetail(this.paramDto).then(() => {
        this.$Message.success('修改成功')
      })
    }
  },
  watch: {
    orderInfo: {
      handler () {
        this.init()
      },
      deep: true
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
</style>
