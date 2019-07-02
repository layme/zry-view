<template>
  <div class="full-top">
    <Spin size="large" fix v-if="loading" class="full-spin"></Spin>
    <Button type="primary" @click="addHouseType">添加房型</Button>
    <house-type-card v-for="(item,index) in houseTypes" :key="index" :projectBid="projectBid" :houseType="item"
                     :index="index" :houseTypeParentBidOptions="houseTypeParentBidOptions"
                     :bedTypeList="bedTypeList" @show="confirmShow" class="house-type"
                     @remove="confirmRemove"></house-type-card>
  </div>
</template>

<script>
import houseTypeCard from './houseTypeCard.vue'
import { getHouseTypes, getBedTypeList, deleteHouseType, showOrNot } from '@/api/houseType'
import { getHouseSorts } from '@/api/houseSort'

export default {
  name: 'houseType',
  props: {
    projectBid: String
  },
  components: {
    houseTypeCard
  },
  data () {
    return {
      houseTypes: [],
      houseTypeParentBidOptions: [],
      bedTypeList: [],
      loading: false
    }
  },
  methods: {
    getHouseType () {
      this.loading = true
      getHouseTypes(this.projectBid).then(res => {
        if (res.body.list.length > 0) {
          this.houseTypes = res.body.list
        } else {
          this.houseTypes.push({})
        }
        this.loading = false
      }).catch(() => {
        this.houseTypes.push({})
        this.loading = false
      })
    },
    addHouseType () {
      this.houseTypes.push({})
    },
    confirmRemove (index) {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>确定删除该房型吗？</p>',
        onOk: () => {
          this.removeHouseType(index)
        },
        onCancel: () => {
        }
      })
    },
    removeHouseType (index) {
      if (this.houseTypes[index].bid) {
        this.loading = true
        deleteHouseType(this.houseTypes[index].bid).then(res => {
          this.Message.success('删除成功')
          this.$emit('remove', this.index)
          this.houseTypes.splice(index, 1)
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.houseTypes.splice(index, 1)
      }
    },
    getHouseTypeParentBidOptions () {
      getHouseSorts(this.projectBid).then(res => {
        this.houseTypeParentBidOptions = res.body
      })
    },
    getBedTypeList () {
      getBedTypeList().then(res => {
        this.bedTypeList = res.body
      })
    },
    confirmShow (bid, val) {
      let text = val === 1 ? '展示' : '隐藏'
      this.$Modal.confirm({
        title: '通知',
        content: `<p>确定在App上${text}该房型吗?</p>`,
        onOk: () => {
          this.showHouseType(bid, val)
        },
        onCancel: () => {
        }
      })
    },
    showHouseType (bid, val) {
      this.loading = true
      showOrNot(bid, val).then(res => {
        this.$Message.success('操作成功')
        this.getHouseType()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  watch: {
    'projectBid' (val) {
      if (val) {
        this.getHouseType()
        this.getHouseTypeParentBidOptions()
        this.getBedTypeList()
      } else {
        this.houseTypes = [{}]
      }
    }
  },
  created () {
    if (this.projectBid) {
      this.getHouseType()
      this.getHouseTypeParentBidOptions()
      this.getBedTypeList()
    } else {
      this.houseTypes = [{}]
    }
  }
}
</script>

<style scoped>
  .house-type {
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
