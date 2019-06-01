<template>
  <Timeline>
    <TimelineItem v-for="(item, index) in records" :key="index"
                  v-if="!(index === records.length - 1 && followUpStatus === 3)">
      <p class="content">{{ item.content }}</p>
      <p class="time">{{ item.createUserName }} &nbsp;&nbsp; {{ item.createTime }}</p>
    </TimelineItem>
    <TimelineItem color="green" v-else>
      <Icon type="ios-checkmark-circle" slot="dot" />
      <p class="content">{{ item.content }}</p>
      <p class="time">{{ item.createUserName }} &nbsp;&nbsp; {{ item.createTime }}</p>
    </TimelineItem>
  </Timeline>
</template>
<script>
export default {
  name: 'followTimeline',
  props: {
    records: {
      type: Array,
      default () {
        return []
      }
    },
    followUpStatus: Number
  }
}
</script>
<style lang="less" scoped>
  .content {
    font-size: 14px;
  }

  .time {
    padding-left: 5px;
  }
</style>
