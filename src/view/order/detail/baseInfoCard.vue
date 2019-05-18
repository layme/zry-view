<template>
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
  </Form>
</template>
<script>
export default {
  name: 'baseInfoCard',
  props: {
    data: Object
  },
  data () {
    return {}
  }
}
</script>
<style lang="less">
</style>
