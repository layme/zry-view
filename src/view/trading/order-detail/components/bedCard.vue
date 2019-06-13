<template>
  <Card dis-hover :bordered="false">
    <p slot="title">
      床位分配
    </p>
    <div slot="extra">
      <Checkbox
        :indeterminate="indeterminate"
        :value="checkAll"
        @click.prevent.native="handleCheckAll">全选
      </Checkbox>
    </div>
    <Row v-for="(item, index) in bedDto.stayPersonList" :key="index" class="bed-row" :class="bedRow(index)">
      <Col :span="5">
        入住人：{{ item.stayPersonName }}
      </Col>
      <Col :span="4">
        房型信息：{{ item.houseTypeParentName }} - {{ item.houseTypeName }}
      </Col>
      <Col :span="4">
        楼栋：{{ buildingFormat(item) }}
      </Col>
      <Col :span="4">
        房间号：{{ item.areaName ? item.areaName : '-' }}
      </Col>
      <Col :span="4">
        床位号：
        <span v-if="item.bedCode">{{ item.bedCode.substring(item.bedCode.length - 2) }}</span>
        <template v-else>
          <span v-if="item.stayPersonStatus !== 1 && item.stayPersonStatus !== 6" style="color: #ed4014;">已解绑床位</span>
          <span v-else>暂未排床</span>
        </template>
      </Col>
      <Col :span="2">
        <div
          v-if="orderStatus=== 1 || orderStatus=== 2 || orderStatus=== 6 || orderStatus === 11">
          <Tag v-if="item.stayPersonStatus !== 1 && item.stayPersonStatus !== 6" color="blue">
            {{ item.stayPersonStatus | stayPersonStatusFilter }}
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
import { getDate } from '@/libs/tools'
export default {
  name: 'bedCard',
  props: {
    bedList: {
      type: Array,
      default: () => []
    },
    orderBid: String,
    orderStatus: Number,
    startDate: Number,
    endDate: Number
  },
  data () {
    return {
      bedDto: {
        orderId: '',
        startDate: '',
        endDate: '',
        stayPersonList: []
      },
      checkAll: true,
      indeterminate: false
    }
  },
  methods: {
    initData () {
      this.bedDto.orderId = this.orderBid
      this.bedDto.startDate = getDate(this.startDate, 'date')
      this.bedDto.endDate = getDate(this.endDate, 'date')
      this.bedList.forEach(item => {
        this.bedDto.stayPersonList.push({
          orderBid: this.orderBid,
          bid: item.stayPersonBid,
          areaBedBid: item.bedBid,
          houseTypeBid: item.houseTypeBid,
          areaBid: item.areaBid,
          areaCode: item.areaName,
          bedCode: item.bedCode,
          stayPersonName: item.stayPersonName,
          houseTypeParentName: item.houseTypeParentName,
          houseTypeName: item.houseTypeName,
          buildName: item.buildName,
          areaName: item.areaName,
          stayPersonStatus: item.stayPersonStatus,
          isSelect: true
        })
      })
    },
    bedRow (index) {
      if (index > 0) {
        return 'bed-row-not-first'
      }
    },
    buildingFormat (item) {
      if (item.buildName) {
        return item.buildName
      } else {
        return '-'
      }
    },
    handleCheck () {
      let selected = this.bedDto.stayPersonList.filter(item => item.isSelect)
      if (selected.length === this.bedDto.stayPersonList.length) {
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
        this.bedDto.stayPersonList.forEach(item => {
          item.isSelect = true
        })
      } else {
        this.bedDto.stayPersonList.forEach(item => {
          item.isSelect = false
        })
      }
    },
    saveBed () {
      let selected = this.bedDto.stayPersonList.filter(item => item.isSelect)
      let isPass = true
      selected.forEach(item => {
        if (!item.areaBedBid) {
          this.$Message.warning(`${item.stayPersonName} 还未分配床位`)
          isPass = false
        }
      })
      if (isPass) {
        this.$emit('saveBed', {
          orderId: this.bedDto.orderId,
          startDate: this.bedDto.startDate,
          endDate: this.bedDto.endDate,
          stayPersonList: selected
        })
      }
    },
    checkIn () {},
    changeBed () {}
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
