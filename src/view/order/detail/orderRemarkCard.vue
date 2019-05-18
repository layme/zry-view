<template>
  <Card dis-hover>
    <p slot="title">订单备注</p>
    <Input type="text" v-model.trim="orderRemark.remark" class="remark-cls" clearable></Input>
    <Button type="primary" style="margin-left: 20px">保 存</Button>
    <Divider dashed/>
    <Timeline>
      <TimelineItem v-for="(item, index) in remarks" :key="index">
        <p class="time">{{ item.remark }}</p>
        <p class="content">{{ item.createBy }} · {{ item.createTime }}</p>
      </TimelineItem>
    </Timeline>
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
        },
        {
          remark: '需要换到向阳的房间',
          createTime: '2019-05-17 18:00:00',
          createBy: '任宏远'
        }
      ]
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
