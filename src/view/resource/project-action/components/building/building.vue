<template>
  <div class="full-top">
    <Spin size="large" fix v-if="loading" class="full-spin"></Spin>
    <Button type="primary" @click="addBuilding">添加楼栋</Button>
    <building-card v-for="(item,index) in buildings" :key="index" class="build-row" :projectBid="projectBid"
                   :building="item" :index="index" @remove="confirmRemove"></building-card>
  </div>
</template>

<script>
import buildingCard from './buildingCard.vue'
import { getBuildings, deleteBuilding } from '@/api/building'

export default {
  name: 'building',
  props: {
    projectBid: String
  },
  components: {
    buildingCard
  },
  data () {
    return {
      buildings: [],
      loading: false
    }
  },
  methods: {
    getBuildings () {
      if (!this.projectBid) {
        this.buildings = [{}]
        return
      }
      this.loading = true
      getBuildings(this.projectBid).then(res => {
        if (res.body.length > 0) {
          this.buildings = res.body
        } else {
          this.buildings.push({})
        }
        this.loading = false
      }).catch(() => {
        this.buildings.push({})
        this.loading = false
      })
    },
    addBuilding () {
      this.buildings.push({})
    },
    confirmRemove (index) {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>确定删除该楼栋吗？</p>',
        onOk: () => {
          this.removeBuilding(index)
        },
        onCancel: () => {
        }
      })
    },
    removeBuilding (index) {
      if (this.buildings[index].fid) {
        this.loading = true
        deleteBuilding(this.buildings[index].fid).then(res => {
          if (res.code === 200) {
            this.$Message.success('删除成功')
            this.buildings.splice(index, 1)
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.buildings.splice(index, 1)
      }
    }
  },
  watch: {
    'projectBid' () {
      this.getBuildings()
    }
  },
  created () {
    this.getBuildings()
  }
}
</script>
<style scoped>
  .build-row {
    margin-top: 20px;
  }
  .full-top {
    position: relative;
    height: 100%;
  }
  .full-spin {
    height: 100%;
  }
</style>
