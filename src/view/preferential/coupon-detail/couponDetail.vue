<template>
  <div>{{ couponBid }}</div>
</template>
<script>
export default {
  name: 'couponDetail',
  data () {
    return {
      couponBid: ''
    }
  },
  methods: {
    getCouponDetail () {
      this.couponBid = this.$route.query.couponBid
    }
  },
  watch: {
    '$route' (to, from) {
      this.getCouponDetail()
    }
  },
  created () {
    this.getCouponDetail()
  }
}
</script>
<style lang="less" scoped>
</style>
