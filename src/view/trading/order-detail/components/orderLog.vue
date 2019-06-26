<template>
  <div class="full-top">
    <Spin size="large" fix v-if="loading" class="full-spin"></Spin>
    <Timeline>
      <TimelineItem v-for="(item, index) in orderLog" :key="index">
        <p class="content">{{ item.operContent }}</p>
        <p class="time">{{ item.operator }} / {{ item.operTime }}</p>
      </TimelineItem>
    </Timeline>
  </div>
</template>
<script>
import { getOrderRecord } from '@/api/order'
export default {
  name: 'orderLog',
  props: {
    orderBid: String
  },
  data () {
    return {
      orderLog: [],
      loading: false
    }
  },
  methods: {
    getOrderRecord () {
      this.loading = true
      getOrderRecord(this.orderBid).then(res => {
        if (res.code === 200) {
          this.orderLog = res.body
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  created () {
    this.getOrderRecord()
  }
}
</script>
<style lang="less" scoped>
  .full-top {
    position: relative;
    min-height: 300px;
  }

  .full-spin {
    height: 100%;
  }

  .content {
    font-size: 14px;
    font-weight: bold;
  }
  .time {
    padding-left: 10px;
  }
</style>
