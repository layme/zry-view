<template>
  <div>
    <div v-for="(item, index) in orderLog" :key="index">{{ item }}</div>
  </div>
</template>
<script>
export default {
  name: 'orderLog',
  props: {
    orderBid: String
  },
  data () {
    return {
      orderLog: []
    }
  },
  methods: {
    getOrderLog () {
      this.orderLog = ['time save order', 'time payment', 'time change bed', 'time check in', 'time check out', 'time over']
    }
  },
  created () {
    this.getOrderLog()
  }
}
</script>
<style lang="less" scoped></style>
