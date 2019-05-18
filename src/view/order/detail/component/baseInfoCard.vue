<template>
  <Card dis-hover>
    <p slot="title">
      基础信息
    </p>
    <Form :label-width="100">
      <Row>
        <Col :span="6">
          <FormItem label="预定人姓名：">
            <span>{{ data.customer }}</span>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="预定人手机号：">
            <span>{{ data.phone }}</span>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="邮箱：">
            <span>{{ data.email }}</span>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="支付方式：">
            <span>{{ data.payWay }}</span>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col :span="6">
          <FormItem label="入住时段：">
            <span>{{ data.startDate }} 到 {{ data.endDate }}</span>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="预定床位数：">
            <span>{{ data.bedCount }}</span>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="订单来源：">
            <span>{{ data.source }}</span>
          </FormItem>
        </Col>
        <Col :span="6">
          <FormItem label="允许续住：">
            <span>{{ data.can }}</span>
          </FormItem>
        </Col>
      </Row>
      <Button type="primary" class="my-btn" v-if="data.status === 5">支 付</Button>
      <Button type="warning" class="my-btn" v-if="data.status === 1 || data.status === 5" @click.prevent="cancelOrder">取 消</Button>
    </Form>
  </Card>
</template>
<script>
export default {
  name: 'baseInfoCard',
  props: {
    data: Object
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
    }
  }
}
</script>
<style lang="less">
  .my-btn {
    margin-right: 20px;
  }
</style>
