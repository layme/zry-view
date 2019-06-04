<template>
  <div>
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
      bedTypeList: []
    }
  },
  methods: {
    getHouseType () {
      getHouseTypes(this.projectBid).then(res => {
        if (res.body.list.length > 0) {
          this.houseTypes = res.body.list
        } else {
          this.houseTypes.push({})
        }
      }).catch(() => {
        this.houseTypes.push({})
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
        deleteHouseType(this.houseTypes[index].bid).then(res => {
          if (res.code === 200) {
            this.Message.success('删除成功')
            this.$emit('remove', this.index)
            this.houseTypes.splice(index, 1)
          }
        })
      } else {
        this.houseTypes.splice(index, 1)
      }
    },
    getHouseTypeParentBidOptions () {
      getHouseSorts(this.projectBid).then(res => {
        if (res.code === 200) {
          this.houseTypeParentBidOptions = res.body
        }
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
        content: '<p>确定在App上' + text + '该房型吗?</p>',
        onOk: () => {
          this.showHouseType(bid, val)
        },
        onCancel: () => {
        }
      })
    },
    showHouseType (bid, val) {
      showOrNot(bid, val).then(res => {
        if (res.code === 200) {
          this.$Message.success('操作成功')
          this.getHouseType()
        }
      })
    }
  },
  watch: {
    'projectBid' (val) {
      if (val) {
        this.getHouseType()
        this.getHouseTypeParentBidOptions()
        this.getBedTypeList()
      }
    }
  },
  created () {
    if (this.projectBid) {
      this.getHouseType()
      this.getHouseTypeParentBidOptions()
      this.getBedTypeList()
    }
  }
}
</script>

<style scoped>
  .house-type {
    margin-top: 20px;
  }
</style>
