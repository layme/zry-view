<template>
  <div class="full-top">
    <Spin size="large" fix v-if="loading" class="full-spin"></Spin>
    <div v-if="!showData" class="no-data">请保存该订单所有顾客身份证信息</div>
    <template v-else>
      <guest-info-collect-card
        v-for="(guest, index) in guestList" :key="index" :guest="guest"
        :channel-options="channelOptions" :purpose-options="purposeOptions"
        :area-options="areaOptions" @fresh="listGuestInfo"></guest-info-collect-card>
    </template>
  </div>
</template>
<script>
import { collectGuestInfo, listGuestInfo } from '@/api/guest'
import guestInfoCollectCard from './guestInfoCollectCard'
export default {
  name: 'guestInfoCollectList',
  components: {
    guestInfoCollectCard
  },
  props: {
    orderBid: String
  },
  data () {
    return {
      loading: false,
      showData: false,
      channelOptions: [],
      purposeOptions: [],
      areaOptions: [],
      guestList: []
    }
  },
  methods: {
    collectGuestInfo () {
      this.loading = true
      collectGuestInfo(this.orderBid).then(res => {
        this.loading = false
        this.showData = res.body.showData
        if (this.showData) {
          this.listGuestInfo()
        }
        this.channelOptions = res.body.channelDicList
        this.purposeOptions = res.body.purposeDicDtoList
        this.areaOptions = res.body.areaDicList
      }).catch(() => {
        this.loading = false
      })
    },
    listGuestInfo () {
      this.loading = true
      listGuestInfo(this.orderBid).then(res => {
        this.showData = res.body.showData
        this.guestList = res.body.localDtos
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  },
  created () {
    this.collectGuestInfo()
  }
}
</script>
<style lang="less" scoped>
  .full-top {
    position: relative;
    min-height: 300px;
  }

  .full-spin {
    height: 100%;
  }

  .no-data {
    height: 40px;
    text-align: center;
    padding-top: 10px;
    color: #909399;
  }
</style>
