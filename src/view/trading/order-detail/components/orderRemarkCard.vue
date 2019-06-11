<template>
  <div>
    <Card dis-hover>
      <p slot="title">订单备注</p>
      <Input type="text" v-model.trim="orderRemark" class="remark-cls" :maxlength="50" placeholder="输入备注 最多50字" clearable></Input>
      <Button type="primary" style="margin-left: 20px" :disabled="!orderRemark" @click="saveOrderRemark">保 存</Button>
      <Divider dashed/>
      <Timeline :pending="isPending">
        <TimelineItem v-for="(item, index) in remarks" :key="index" v-if="index < 2">
          <p class="time">{{ item.operContent }}</p>
          <p class="content">{{ item.operator }} · {{ item.operTime }}</p>
        </TimelineItem>
        <TimelineItem v-if="isPending">
          <a href="#" @click="visible = true">查看更多</a>
        </TimelineItem>
      </Timeline>
    </Card>
    <Modal
      v-model="visible"
      title="订单备注"
      footer-hide>
      <div :style="{ paddingLeft: '20px' }">
        <Timeline>
          <TimelineItem v-for="(item, index) in remarks" :key="index">
            <p class="time">{{ item.operContent }}</p>
            <p class="content">{{ item.operator }} · {{ item.operTime }}</p>
          </TimelineItem>
        </Timeline>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'orderRemarkCard',
  props: {
    remarks: Array
  },
  data () {
    return {
      orderRemark: '',
      visible: false
    }
  },
  computed: {
    isPending: function () {
      return this.remarks.length > 2
    }
  },
  methods: {
    saveOrderRemark () {
      this.$emit('save', this.orderRemark)
    },
    clear () {
      this.orderRemark = ''
    }
  }
}
</script>
<style lang="less" scoped>
  .remark-cls {
    width: ~"calc(100% - 100px)"
  }

  .time {
    font-size: 14px;
    font-weight: bold;
  }

  .content {
    padding-left: 5px;
  }
</style>
