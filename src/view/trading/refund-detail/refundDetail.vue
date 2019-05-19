<template>
  <div class="con">
    <div class="subscript">
      {{ refundInfo.refundStatus | refundStatusFilter }}
    </div>
    <Row>
      <strong class="order order-number">订单号：{{ refundInfo.orderNumber }}</strong>
    </Row>
    <refund-card class="card-cls"></refund-card>
  </div>
</template>
<script>
import refundCard from './component/refundCard'
export default {
  name: 'refundDetail',
  components: {
    refundCard
  },
  data () {
    return {
      orderBid: this.$route.query.orderBid,
      refundInfo: {
        bid: '',
        orderNumber: 'BJ201905170001',
        refundStatus: 1,
        createTime: '2019-05-17 10:34:12'
      }
    }
  },
  methods: {},
  filters: {
    refundStatusFilter (val) {
      switch (val) {
        case 0:
          return '待核实'
        case 1:
          return '待打款'
        case 2:
          return '打款成功'
        case 3:
          return '打款异常'
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .order {
    margin: 0 15px;
    font-size: 20px;
    &-number {
      margin-left: 50px;
    }
    &-switch {
      margin-top: -5px;
    }
  }

  .card-cls {
    margin-top: 20px;
  }

  .con {
    position: relative;
  }

  .subscript {
    color: #fff;
    height: 40px;
    width: 200px;
    position: absolute;
    left: -90px;
    top: -10px;
    text-align: center;
    font-size: 18px;
    line-height: 40px;
    background-color: #2d8cf0;
    -moz-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
</style>
