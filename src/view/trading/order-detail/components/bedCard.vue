<template>
  <Card dis-hover :bordered="false">
    <p slot="title">
      床位分配
    </p>
    <div slot="extra">
      <Checkbox
        :indeterminate="indeterminate"
        :value="checkAll"
        @on-change="handleCheckAll">全选
      </Checkbox>
    </div>
    <Row v-for="(item, index) in bedDto.beds" :key="index" class="bed-row" :class="bedRow(index)">
      <Col :span="5">
        入住人：{{ item.stayPersonName }}
      </Col>
      <Col :span="4">
        房型信息：{{ item.houseTypeParentName }} - {{ item.houseTypeName }}
      </Col>
      <Col :span="4">
        楼栋：{{ buildingFormat(index) }}
      </Col>
      <Col :span="4">
        房间号：{{ item.areaName ? item.areaName : '-' }}
      </Col>
      <Col :span="4">
        床位号：{{ bedFormat(index) }}
      </Col>
      <Col :span="2">
        <div
          v-if="orderStatus=== 1 || orderStatus=== 2 || orderStatus=== 6 || orderStatus === 11">
          <Tag v-if="item.stayPersonStatus !== 1 && item.stayPersonStatus !== 6" color="blue">{{
            item.stayPersonStatus | stayPersonStatusFilter }}
          </Tag>
          <a v-else>选择床位</a>
        </div>
      </Col>
      <Col :span="1" style="text-align: center">
        <Checkbox v-model="item.isSelect" @on-change="handleCheck"></Checkbox>
      </Col>
    </Row>
  </Card>
</template>
<script>
export default {
  name: 'bedCard',
  props: {
    bedList: {
      type: Array,
      default: () => []
    },
    orderBid: String,
    orderStatus: Number
  },
  data () {
    return {
      bedDto: {
        orderBid: '',
        beds: []
      },
      checkAll: true,
      indeterminate: false
    }
  },
  methods: {
    initData () {
      this.bedDto.orderBid = this.orderBid
      this.bedDto.beds = this.bedList
      this.bedDto.beds.forEach(item => {
        this.$set(item, 'isSelect', true)
      })
    },
    bedRow (index) {
      if (index > 0) {
        return 'bed-row-not-first'
      }
    },
    buildingFormat (index) {
      const bed = this.bedDto.beds[index]
      if (bed.buildName) {
        return bed.buildName
      } else {
        return '-'
      }
    },
    bedFormat (index) {
      const bed = this.bedDto.beds[index]
      if (bed.bedCode) {
        return bed.bedCode.substring(bed.bedCode.length - 2)
      } else {
        if (bed.stayPersonStatus !== 1 && bed.stayPersonStatus !== 6) {
          return '已解绑床位'
        } else {
          return '暂未排床'
        }
      }
    },
    handleCheck () {
      let selected = this.bedDto.beds.filter(item => item.isSelect)
      if (selected.length === this.bedDto.beds.length) {
        this.indeterminate = false
        this.checkAll = true
      } else if (selected.length > 0) {
        this.indeterminate = true
        this.checkAll = false
      } else {
        this.indeterminate = false
        this.checkAll = false
      }
    },
    handleCheckAll () {
      if (this.indeterminate) {
        this.checkAll = false
      } else {
        this.checkAll = !this.checkAll
      }
      this.indeterminate = false
      if (this.checkAll) {
        this.bedDto.beds.forEach(item => {
          item.isSelect = true
        })
      } else {
        this.bedDto.beds.forEach(item => {
          item.isSelect = false
        })
      }
    }
  },
  watch: {
    order () {
      this.initData()
    }
  },
  created () {
    this.initData()
  },
  filters: {
    bedCodeFilter (val) {
      return val ? val.substring(val.length - 2) : '-'
    }
  }
}
</script>
<style lang="less" scoped>
  .bed-row {
    border: 1px #dcdee2 solid;
    border-radius: 4px;
    padding: 20px 20px 15px 20px;
    margin: 0 -16px;
    &-not-first {
      margin-top: 15px;
    }
  }
</style>
