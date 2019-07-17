<template>
  <div>
    <h2 style="margin-bottom: 20px">当前项目: {{ name ? name : '-' }}</h2>
    <Tabs v-model="$store.state.project.activeName" type="card">
      <TabPane label="基础信息" name="1">
        <base-info v-if="$store.state.project.activeName === '1'" :project-bid="projectBid" @success="handleSuccess"></base-info>
      </TabPane>
      <TabPane label="楼栋管理" name="2" :disabled="isDisabled(2)" lazy>
        <building v-if="$store.state.project.activeName === '2'" :project-bid="projectBid"></building>
      </TabPane>
      <TabPane label="房型分类" name="3" :disabled="isDisabled(3)" lazy>
        <house-sort v-if="$store.state.project.activeName === '3'" :project-bid="projectBid"></house-sort>
      </TabPane>
      <TabPane label="房型管理" name="4" :disabled="isDisabled(4)" lazy>
        <house-type v-if="$store.state.project.activeName === '4'" :project-bid="projectBid"></house-type>
      </TabPane>
      <TabPane label="房间管理" name="5" :disabled="isDisabled(5)" lazy>
        <room v-if="$store.state.project.activeName === '5'" :project-bid="projectBid"></room>
      </TabPane>
      <TabPane label="项目资料" name="6" :disabled="isDisabled(2)" lazy>
        <project-data v-if="$store.state.project.activeName === '6'" :project-bid="projectBid"></project-data>
      </TabPane>
      <TabPane label="区域管理" name="7" :disabled="isDisabled(3)" lazy>
        <public-area v-if="$store.state.project.activeName === '7'" :project-bid="projectBid"></public-area>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import baseInfo from './components/base-info/baseInfo.vue'
import building from './components/building/building.vue'
import houseSort from './components/house-sort/houseSort.vue'
import houseType from './components/house-type/houseType.vue'
import room from './components/room/room.vue'
import projectData from './components/project-data/projectData.vue'
import publicArea from './components/area/publicArea.vue'
import { getProjectProgress } from '@/api/project'

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
      projectBid: '',
      name: ''
    }
  },
  methods: {
    isDisabled (val) {
      return val > this.$store.state.project.step
    },
    handleSuccess (bid, name) {
      this.projectBid = bid
      this.name = name
    },
    getInfo () {
      this.projectBid = this.$route.query.projectBid
      if (this.projectBid) {
        // 修改项目，查询项目项启用状态和步骤
        getProjectProgress(this.projectBid).then(res => {
          this.name = res.body.name
          let step = res.body.step
          this.$store.commit('upStep', step + 1)
          let status = res.body.status
          if (status === 1) {
            // 启用，定位到第一个tab
            this.$store.commit('upActiveName', '1')
          } else {
            // 停用，定位到最后一个tab
            this.$store.commit('upActiveName', step.toString())
          }
        })
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
  }
}
</script>

<style lang="less" scoped>
</style>
