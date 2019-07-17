<template>
  <Card>
    <p slot="title">
      基础信息
    </p>
    <Form :label-width="100">
      <Row>
        <Col :span="6">
          <FormItem label="预定人姓名：">
            <span>{{ order.cusName }}</span>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="预定人手机号：">
            <span>{{ order.cusPhone }}</span>
            <a v-if="order.secondChannel > 1" @click="updatePhone" style="margin-left: 10px;"><Icon type="md-create" /></a>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="邮箱：">
            <span>{{ order.cusMail | nullFilter }}</span>
<!--            <a @click="updateMail" style="margin-left: 10px;"><Icon type="md-create" /></a>-->
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="支付方式：">
            <span>{{ order.payMethod | payMethodFilter | nullFilter }}</span>
            <Tooltip theme="light" v-if="order.ticketBid && coupon">
              <span>已使用 {{ coupon.amount }} 元优惠券</span>
              <div slot="content">
                <p>优惠券编码: {{ coupon.ticketNumber }}</p>
                <p>优惠活动名: {{ coupon.activityName }}</p>
              </div>
            </Tooltip>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :span="6">
          <FormItem label="入住时段：">
            <span>{{ order.orderStartDate | dateFilter }} 到 {{ order.orderEndDate | dateFilter }}</span>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="预定床位数：">
            <Tag color="blue">{{ order.orderBedCount }} 个</Tag>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="订单来源：">
            <span>{{ channelFormat(order.secondChannel) }}</span>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="允许续住：">
            <span>否</span>
          </FormItem>
        </Col>
      </Row>
      <div v-action="btnAccess">
        <Button type="primary" class="my-btn" v-if="order.orderStatus === 5" @click="prePay">支 付</Button>
        <Button type="warning" class="my-btn" v-if="order.orderStatus === 5" @click="cancelOrder">取 消</Button>
        <Button type="warning" class="my-btn" v-if="order.orderStatus === 1" @click="closeOrder">取 消</Button>
        <Button type="primary" class="my-btn"
                v-if="order.orderStatus === 8 || order.orderStatus === 9 || order.orderStatus === 10"
                @click="toRefundDetail(order.orderBid)">取消详情
        </Button>
      </div>
    </Form>
    <Modal
      v-model="visible"
      :loading="loading"
      title="支付订单"
      width="500"
      @on-ok="pay">
      <Form ref="payForm" :model="paramDto" :label-width="60">
        <FormItem label="支付方式">
          <Select v-model="paramDto.payMethod" placeholder="" class="my-select">
            <Option v-for="item in finSettleOptions" :key="item.payMethod"
                    :label="item.settleName" :value="item.payMethod"></Option>
          </Select>
        </FormItem>
        <FormItem label="备注">
          <Input type="textarea" v-model.trim="paramDto.remark" placeholder="" :row="2" :maxlength="200"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="cancelVisible"
      :loading="loading"
      title="取消订单"
      width="500"
      @on-ok="handleCloseOrder">
      <Form ref="closeForm" :model="closeDto" :label-width="60">
        <FormItem label="原因">
          <Select v-model="closeDto.refundReason" placeholder="" class="my-select">
            <Option v-for="item in closeOptions" :key="item.value"
                    :label="item.label" :value="item.value"></Option>
          </Select>
        </FormItem>
        <FormItem label="备注">
          <Input type="textarea" v-model.trim="closeDto.remark" placeholder="" :row="2" :maxlength="200"></Input>
        </FormItem>
      </Form>
    </Modal>
  </Card>
</template>
<script>
import { getFinSettle, cancelOrder, pay, refundOrder } from '@/api/order'
export default {
  name: 'baseInfoCard',
  props: {
    order: Object,
    coupon: Object,
    channel: Array
  },
  data () {
    return {
      finSettleOptions: [],
      visible: false,
      cancelVisible: false,
      loading: true,
      paramDto: {
        orderBid: this.order.orderBid,
        payMethod: '1',
        amount: this.order.amountNoCoupon,
        remark: ''
      },
      closeDto: {
        orderBid: this.order.orderBid,
        refundReason: 1,
        remark: ''
      },
      closeOptions: [
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
      ],
      btnAccess: '/orderDetail/orderCancelBtn.action'
    }
  },
  methods: {
    cancelOrder () {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>确定取消该订单？</p><p style="color: #808695;">未支付取消，直接释放库存，无需审核</p>',
        onOk: () => {
          cancelOrder(this.order.orderBid).then(res => {
            this.$Message.success('取消成功')
            this.$emit('refresh')
          })
        },
        onCancel: () => {
        }
      })
    },
    channelFormat (val) {
      return val ? this.channel.find(item => item.code === val).text : '未知'
    },
    updatePhone () {
      this.$emit('updatePhone')
    },
    updateMail () {
      this.$emit('updateMail')
    },
    prePay () {
      if (this.order.firstChannel !== 2) {
        this.$Message.warning('PC端暂时不能支付APP端创建的订单，请在APP端支付')
      } else {
        this.getFinSettle()
        this.visible = true
      }
    },
    getFinSettle () {
      getFinSettle().then(res => {
        this.finSettleOptions = res.body
      })
    },
    pay () {
      pay(this.paramDto).then(res => {
        this.$Message.success('支付成功')
        this.visible = false
        this.$emit('refresh')
      }).catch(() => {
        this.handleError()
      })
    },
    handleError () {
      setTimeout(() => {
        this.loading = false
        this.$nextTick(() => {
          this.loading = true
        })
      }, 500)
    },
    closeOrder () {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>确定取消该订单？</p><p style="color: #808695;">已支付取消，不会释放库存，需要审核</p>',
        onOk: () => {
          this.cancelVisible = true
        },
        onCancel: () => {
        }
      })
    },
    handleCloseOrder () {
      refundOrder(this.closeDto).then(res => {
        this.$Message.success('取消成功')
        this.cancelVisible = false
        this.toRefundDetail(this.order.orderBid)
      }).catch(() => {
        this.handleError()
      })
    },
    toRefundDetail (orderBid) {
      const route = {
        name: 'refundDetail',
        query: {
          orderBid
        }
      }
      this.$router.push(route)
    }
  }
}
</script>
<style lang="less">
  .my-btn {
    margin-right: 20px;
  }
  .my-select {
    width: 200px;
  }
</style>
