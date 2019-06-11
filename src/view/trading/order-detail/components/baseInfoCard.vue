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
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="邮箱：">
            <span>{{ order.cusMail }}</span>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="支付方式：">
            <span>{{ order.payMethod | payMethodFilter }}</span>
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
            <Tag color="blue">{{ order.orderBedCount }}</Tag>
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
      <Button type="primary" class="my-btn" v-if="order.status === 5">支 付</Button>
      <Button type="warning" class="my-btn" v-if="order.status === 1 || order.status === 5" @click.prevent="cancelOrder">取 消</Button>
    </Form>
  </Card>
</template>
<script>
export default {
  name: 'baseInfoCard',
  props: {
    order: Object,
    channel: Array
  },
  data () {
    return {}
  },
  methods: {
    cancelOrder () {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>确定取消该订单？</p>',
        onOk: () => {
          this.$Message.success('cancel ok')
        },
        onCancel: () => {
        }
      })
    },
    channelFormat (val) {
      return val ? this.channel.find(item => item.code === val).text : '未知'
    }
  }
}
</script>
<style lang="less">
  .my-btn {
    margin-right: 20px;
  }
</style>
