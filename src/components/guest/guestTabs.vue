<template>
  <Tabs type="card" v-model="activeName">
    <TabPane label="基本信息" name="info">
      <guest-info :guest-fid="guestFid"></guest-info>
    </TabPane>
    <TabPane label="入住记录" name="record">
      <check-in-record :guest-fid="guestFid" @close="handleClose"></check-in-record>
    </TabPane>
    <TabPane label="客人喜好" name="tag">
      <guest-tag :guest-fid="guestFid"></guest-tag>
    </TabPane>
    <TabPane label="事件记录" name="event">
      <guest-event :guest-fid="guestFid"></guest-event>
    </TabPane>
  </Tabs>
</template>
<script>
import guestInfo from './components/guestInfo'
import checkInRecord from './components/checkInRecord'
import guestTag from './components/guestHobbyTag'
import guestEvent from './components/guestEvent'
export default {
  name: 'guestTabs',
  props: {
    guestFid: String,
    active: String
  },
  components: {
    guestInfo,
    checkInRecord,
    guestTag,
    guestEvent
  },
  data () {
    return {
      activeName: this.active ? this.active : 'info'
    }
  },
  methods: {
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>
<style lane="less" scoped>
</style>
