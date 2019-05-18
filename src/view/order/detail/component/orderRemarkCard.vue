<template>
  <Card dis-hover>
    <p slot="title">订单备注</p>
    <Input type="text" v-model.trim="orderRemark.remark" class="remark-cls" :maxlength="50" clearable></Input>
    <Button type="primary" style="margin-left: 20px">保 存</Button>
    <Divider dashed/>
    <Timeline :pending="isPending">
      <TimelineItem v-for="(item, index) in remarks" :key="index" v-if="index < 2">
        <p class="time">{{ item.remark }}</p>
        <p class="content">{{ item.createBy }} · {{ item.createTime }}</p>
      </TimelineItem>
      <TimelineItem v-if="isPending">
        <a href="#" @click="visible = true">查看更多</a>
      </TimelineItem>
    </Timeline>
    <Modal
      v-model="visible"
      title="订单备注"
      footer-hide>
      <div :style="{ paddingLeft: '20px' }">
        <Timeline>
          <TimelineItem v-for="(item, index) in remarks" :key="index">
            <p class="time">{{ item.remark }}</p>
            <p class="content">{{ item.createBy }} · {{ item.createTime }}</p>
          </TimelineItem>
        </Timeline>
      </div>
    </Modal>
  </Card>
</template>
<script>
export default {
  name: 'orderRemarkCard',
  props: {
    data: Object
  },
  data () {
    return {
      orderRemark: {
        orderBid: '',
        remark: ''
      },
      remarks: [
        {
          remark: '需要换到向阳的房间',
          createTime: '2019-05-17 18:00:00',
          createBy: '任宏远'
        }
      ],
      visible: false
    }
  },
  computed: {
    isPending: function () {
      return this.remarks.length > 2
    }
  }
}
</script>
<style lang="less" scoped>
  .remark-cls {
    width: ~"calc(100% - 100px)"
  }

  .time{
    font-size: 14px;
    font-weight: bold;
  }
  .content{
    padding-left: 5px;
  }
</style>
