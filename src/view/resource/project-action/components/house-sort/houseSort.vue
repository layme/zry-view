<template>
  <div class="full-top">
    <Spin size="large" fix v-if="loading" class="full-spin"></Spin>
    <Button type="primary" @click="addHouseSort">添加房型分类</Button>
    <Row>
      <Col :span="18">
        <house-sort-card v-for="(item,index) in houseSorts" :key="index" :projectBid="projectBid" :houseSort="item"
                         :index="index" @remove="confirmRemove" class="house-sort"
                         @show="confirmShow"></house-sort-card>
      </Col>
    </Row>
  </div>
</template>

<script>
import houseSortCard from './houseSortCard.vue'
import { getHouseSorts, deleteHouseSort, showOrNot } from '@/api/houseSort'

export default {
  name: 'houseSort',
  props: {
    projectBid: String
  },
  components: {
    houseSortCard
  },
  data () {
    return {
      houseSorts: [],
      loading: false
    }
  },
  methods: {
    getHouseSorts () {
      if (!this.projectBid) {
        this.houseSorts = [{}]
        return
      }
      this.loading = true
      getHouseSorts(this.projectBid).then(res => {
        if (res.body.length > 0) {
          this.houseSorts = res.body
        } else {
          this.houseSorts.push({})
        }
        this.loading = false
      }).catch(() => {
        this.houseSorts.push({})
        this.loading = false
      })
    },
    addHouseSort () {
      this.houseSorts.push({})
    },
    confirmRemove (index) {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>确定删除该房型分类吗？</p>',
        onOk: () => {
          this.removeHouseSort(index)
        },
        onCancel: () => {
        }
      })
    },
    removeHouseSort (index) {
      if (this.houseSorts[index].bid) {
        this.loading = true
        deleteHouseSort(this.houseSorts[index].bid).then(res => {
          this.$Message.success('删除成功')
          this.houseSorts.splice(index, 1)
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.houseSorts.splice(index, 1)
      }
    },
    confirmShow (bid, val) {
      let text = val === 1 ? '展示' : '隐藏'
      this.$Modal.confirm({
        title: '通知',
        content: `<p>确定在App上${text}该房型分类吗?</p>`,
        onOk: () => {
          this.showHouseSort(bid, val)
        },
        onCancel: () => {
        }
      })
    },
    showHouseSort (bid, val) {
      this.loading = true
      showOrNot(bid, val).then(res => {
        this.$Message.success('操作成功')
        this.getHouseSorts()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  watch: {
    'projectBid' () {
      this.getHouseSorts()
    }
  },
  created () {
    this.getHouseSorts()
  }
}
</script>

<style scoped>
  .house-sort {
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
