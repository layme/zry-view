<template>
  <Card>
    <p slot="title">订单操作</p>
    <Row :gutter="20">
      <Col :span="16">
        <bed-card></bed-card>
        <Button type="primary" class="my-btn">退 订</Button>
        <Button type="primary" class="my-btn">换 租</Button>
        <Button type="primary" class="my-btn">办理入住</Button>
        <Button type="primary" class="my-btn">退 租</Button>
        <Button type="primary" class="my-btn">退房详情</Button>
      </Col>
      <Col :span="8">
        <fee-card></fee-card>
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
    data: Object
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
