<template>
  <Form ref="ticketForm" :model="coupon" :label-width="80">
    <Row :gutter="20">
      <Col :span="12">
        <FormItem label="优惠活动: ">
          <span>{{ coupon.activityNumber }}</span>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="优惠券编号: ">
          <span>{{ coupon.ticketNumber }}</span>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col :span="12">
        <FormItem label="优惠券状态: ">
          <span>{{ coupon.status | couponStatusFilter }}</span>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="绑定账号: ">
          <span>{{ coupon.customerPhone | nullFilter }}</span>
        </FormItem>
      </Col>
    </Row>
    <Row :gutter="20">
      <Col :span="12">
        <FormItem label="兑换码: ">
          <span>{{ coupon.redeemCode }}</span>
        </FormItem>
      </Col>
      <Col :span="12">
        <FormItem label="优惠券金额: ">
          <span>¥ {{ coupon.ticketAmount }}</span>
        </FormItem>
      </Col>
    </Row>
    <FormItem label="有效期: ">
      <span v-if="coupon.limitDate">绑定至账户的 {{ coupon.ticketAmount }} 天内</span>
      <span v-else>{{ coupon.startDateShow }} 至 {{ coupon.endDateShow }}</span>
    </FormItem>
    <FormItem label="使用条件: ">
      <div v-if="coupon.limitMoney">消费满 {{ coupon.limitMoney }} 可使用</div>
      <div v-if="coupon.activityCondition">{{ coupon.activityCondition }}</div>
      <div v-if="!coupon.limitMoney && !coupon.activityCondition">无限制条件</div>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'couponDetailForm',
  props: {
    coupon: Object
  },
  data () {
    return {}
  },
  filters: {
    couponStatusFilter (val) {
      switch (val) {
        case 0:
          return '初始态'
        case 1:
          return '可使用'
        case 2:
          return '已使用'
        case 3:
          return '已关闭'
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
