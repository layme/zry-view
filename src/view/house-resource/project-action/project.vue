<template>
    <Tabs v-model="$store.state.project.activeName" type="card">
      <TabPane label="基础信息" name="1">
        <base-info @success="handleSuccess"></base-info>
      </TabPane>
      <TabPane label="楼栋管理" name="2" :disabled="isDisabled(2)" lazy>
        <building :projectBid="projectBid"></building>
      </TabPane>
      <TabPane label="房型分类" name="3" :disabled="isDisabled(3)" lazy>
        <house-sort :projectBid="projectBid"></house-sort>
      </TabPane>
      <TabPane label="房型管理" name="4" :disabled="isDisabled(4)" lazy>
        <house-type :projectBid="projectBid"></house-type>
      </TabPane>
      <TabPane label="房间管理" name="5" :disabled="isDisabled(5)" lazy>
        <room :projectBid="projectBid"></room>
      </TabPane>
      <TabPane label="项目资料" name="6" :disabled="isDisabled(2)" lazy>
        <project-data :projectBid="projectBid"></project-data>
      </TabPane>
      <TabPane label="区域管理" name="7" :disabled="isDisabled(3)" lazy>
        <public-area :projectBid="projectBid"></public-area>
      </TabPane>
    </Tabs>
</template>

<script>
import baseInfo from './components/base-info/baseInfo.vue'
import building from './components/building/building.vue'
import houseSort from './components/house-sort/houseSort.vue'
import houseType from './components/house-type/houseType.vue'
import room from './components/room/room.vue'
import projectData from './components/project-data/projectData.vue'
import publicArea from './components/area/publicArea.vue'

export default {
  name: 'project',
  components: {
    baseInfo,
    building,
    houseSort,
    houseType,
    room,
    projectData,
    publicArea
  },
  data () {
    return {
      projectBid: ''
    }
  },
  methods: {
    isDisabled (val) {
      return val > this.$store.state.project.step
    },
    handleSuccess (val) {
      this.projectBid = val
    },
    getInfo () {
      this.projectBid = this.$route.query.projectBid
      if (this.projectBid) {
        // 修改项目，查询项目项启用状态和步骤
        let step = 1
        this.$store.commit('upStep', step + 1)
        let status = 1
        if (status === 1) {
          // 启用，定位到第一个tab
          this.$store.commit('upActiveName', '1')
        } else {
          // 停用，定位到最后一个tab
          this.$store.commit('upActiveName', step.toString())
        }
      } else {
        // 新建项目
        this.$store.commit('upStep', 1)
        this.$store.commit('upActiveName', '1')
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.getInfo()
    }
  },
  created () {
    this.getInfo()
    console.log('project created')
  }
}
</script>

<style lang="less" scoped>
</style>
