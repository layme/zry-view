<template>
  <Card>
    <p slot="title">订单操作</p>
    <Row :gutter="20">
      <Col :span="16">
        <bed-card v-if="Object.keys(order).length" :bed-list="order.bedList" :order-bid="order.orderBid"
                  :order-status="order.orderStatus"></bed-card>
        <Button v-if="(order.stayPersonSaveStats === 1 || order.stayPersonStats === 6) && order.orderStatus === 1"
                type="primary" class="my-btn">保存床位
        </Button>
        <template v-if="order.orderStatus === 1">
          <Button type="primary" class="my-btn">办理入住</Button>
          <Button type="primary" class="my-btn">调换床位</Button>
          <Button type="primary" class="my-btn">解绑床位</Button>
          <Button type="primary" class="my-btn">退订床位</Button>
        </template>
        <template v-if="order.orderStatus === 2">
          <Button type="primary" class="my-btn">办理退租</Button>
          <Button type="primary" class="my-btn">调换床位</Button>
          <Button type="primary" class="my-btn">解绑床位</Button>
        </template>
        <template v-if="order.orderStatus === 6 || order.orderStatus === 11">
          <Button type="primary" class="my-btn">退房详情</Button>
        </template>
        <template v-if="hasCheckIn">
          <Button v-if="!lockPwdList.length" type="primary" class="my-btn">生成密码</Button>
          <Button v-if="lockPwdList.length && lockPwdHave2" type="primary" class="my-btn">生成密码</Button>
          <template v-if="lockPwdList.length && lockPwdHave1">
            <Button type="primary" class="my-btn">查看密码</Button>
            <Button type="primary" class="my-btn">发送密码</Button>
          </template>
        </template>
      </Col>
      <Col :span="8">
        <fee-card :order="order"></fee-card>
      </Col>
    </Row>
  </Card>
</template>
<script>
import bedCard from './bedCard'
import feeCard from './feeCard'

export default {
  name: 'orderActionCard',
  props: {
    order: Object,
    hasCheckIn: Boolean,
    lockPwdList: {
      type: Array,
      default: () => []
    },
    lockPwdHave1: Boolean,
    lockPwdHave2: Boolean
  },
  components: {
    bedCard,
    feeCard
  },
  data () {
    return {
      depositDto: {
        item: '1',
        type: '1',
        money: '',
        remark: ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .my-btn {
    margin-right: 20px;
  }
</style>
