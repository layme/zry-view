<template>
  <Tabs type="card" v-model="activeName">
    <TabPane label="基本信息">
      <guest-info></guest-info>
    </TabPane>
    <TabPane label="入住记录">
      <check-in-record @close="handleClose"></check-in-record>
    </TabPane>
    <TabPane label="客人喜好">
      <guest-tag></guest-tag>
    </TabPane>
    <TabPane label="事件记录"></TabPane>
  </Tabs>
</template>
<script>
import guestInfo from './components/guestInfo'
import checkInRecord from './components/checkInRecord'
import guestTag from './components/guestHobbyTag'
export default {
  name: 'guestTabs',
  props: {
    idNumber: String,
    active: String
  },
  components: {
    guestInfo,
    checkInRecord,
    guestTag
  },
  data () {
    return {
      activeName: this.active
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
