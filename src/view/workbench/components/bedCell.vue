<template>
  <div class="con">
    <div v-if="bed.bedStatus === 3" class="subscript" style="background-color: #ff9900;">
      <Icon type="md-bulb"></Icon>
    </div>
    <span style="line-height: 60px;">{{ bed.bedCode }}</span>
    <div class="bed-status-set" @click="handleBedStatus">{{ bed.bedStatus === 3 ? '设为净房' : '设为脏房' }}</div>
  </div>
</template>
<script>
import { updStockStatus } from '@/api/stock'
export default {
  name: 'bedCell',
  props: {
    bed: Object
  },
  data () {
    return {}
  },
  computed: {
    bedStatusBC () {
      switch (this.bed.bedStatus) {
        case 1:
          return '#5cadff'
        case 2:
          return '#19be6b'
        case 3:
          return '#ff9900'
        default:
          return '#2d8cf0'
      }
    }
  },
  methods: {
    handleBedStatus () {
      let dto = {
        bedBid: this.bed.bedBid,
        status: this.bed.bedStatus === 3 ? 1 : 3
      }
      updStockStatus(dto).then(res => {
        this.$Message.success('设置成功')
        this.$emit('refresh')
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .con {
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  .subscript {
    color: #fff;
    height: 20px;
    width: 50px;
    position: absolute;
    left: -18px;
    top: -3px;
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    background-color: #2d8cf0;
    -moz-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .bed-status-set {
    display: none;
  }

  .con:hover .bed-status-set {
    position: absolute;
    display: block;
    bottom: 0;
    background-color: #dcdee2;
    text-align: center;
    width: 100%;
    line-height: 20px;
    cursor: pointer;
    z-index: 2;
  }
</style>
