<template>
  <div class="con">
    <Spin size="large" fix v-if="loading" class="full-spin"></Spin>
    <div v-if="Object.keys(orderInfo).length" class="subscript" :style="{ backgroundColor: refundStatusBC }">
      {{ orderInfo.refundStatus | refundStatusFilter }}
    </div>
    <Row>
      <strong class="order order-number">订单号：{{ orderInfo.orderNumber }}</strong>
    </Row>
    <cancel-reason-card v-if="Object.keys(orderInfo).length && $route.query.flag === 'n'"
                        :order-info="orderInfo"
                        class="card-cls"></cancel-reason-card>
    <refund-card v-if="Object.keys(orderInfo).length"
                 v-for="(refund, index) in orderInfo.refundDetailVos"
                 :key="index" :index="index + 1"
                 :refund-status="orderInfo.refundStatus"
                 :refund="refund"
                 :check-out-data="checkOutData"
                 @refresh="getCheckOutData"
                 @refreshFee="getAllFeeAmount"
                 class="card-cls"></refund-card>
    <refund-verify-card v-if="Object.keys(orderInfo).length"
                        :order-info="orderInfo"
                        :refund-fee-detail-info="refundFeeDetailInfo"
                        @refresh="getCheckOutData"
                        @refreshFee="getAllFeeAmount"
                        class="card-cls"></refund-verify-card>
  </div>
</template>
<script>
import cancelReasonCard from './components/cancelReasonCard'
import refundCard from './components/refundCard'
import refundVerifyCard from './components/refundVerifyCard'
import { getOrderRefund, getCheckOutData, getAllFeeAmount } from '@/api/refund'
export default {
  name: 'refundDetail',
  components: {
    cancelReasonCard,
    refundCard,
    refundVerifyCard
  },
  data () {
    return {
      orderInfo: {},
      refundFeeDetailInfo: [],
      accountBank: [],
      paramDto: {
        orderBid: '',
        pageSource: ''
      },
      checkOutData: [],
      loading: false
    }
  },
  computed: {
    refundStatusBC () {
      switch (this.orderInfo.refundStatus) {
        case 1:
          return '#5cadff'
        case 2:
          return '#19be6b'
        case 3:
          return '#ff9900'
        case 4:
          return '#515a6e'
        default:
          return '#2d8cf0'
      }
    }
  },
  methods: {
    getOrderRefund () {
      this.loading = true
      this.orderInfo = {}
      this.refundFeeDetailInfo = []
      this.accountBank = []
      getOrderRefund(this.$route.query.orderBid).then(res => {
        this.flushData(res.body.orderInfo)
        this.orderInfo = res.body.orderInfo
        this.refundFeeDetailInfo = res.body.refundFeeDetailInfo
        this.accountBank = res.body.accountBank
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    getCheckOutData () {
      this.loading = true
      this.checkOutData = []
      this.paramDto.orderBid = this.$route.query.orderBid
      if (this.$route.query.flag === 'y') {
        this.paramDto.pageSource = 2
      } else {
        this.paramDto.pageSource = 1
      }
      getCheckOutData(this.paramDto).then(res => {
        this.checkOutData = res.body
        this.loading = false
        this.getOrderRefund()
      }).catch(() => {
        this.loading = false
      })
    },
    flushData (obj) {
      obj.refundDetailVos.forEach(item => {
        item.personVoList = this.findPersonVoList(item.bid)
        item.detailOperationVos.forEach(x => {
          x.oldValue = x.feeAmount
          x.refundBid = obj.refundBid
          x.orderBid = obj.orderBid
        })
      })
    },
    findPersonVoList (bid) {
      let ap = this.checkOutData.find(x => x.bid === bid).personVoList
      return ap || []
    },
    getAllFeeAmount () {
      getAllFeeAmount(this.orderInfo.orderBid).then(res => {
        this.refundFeeDetailInfo = res.body
      })
    }
  },
  filters: {
    refundStatusFilter (val) {
      switch (val) {
        case 0:
          return '待核实'
        case 1:
          return '待打款'
        case 2:
          return '打款成功'
        case 3:
          return '打款异常'
        case 4:
          return '拒绝退款'
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.getCheckOutData()
    }
  },
  created () {
    this.getCheckOutData()
  }
}
</script>
<style lang="less" scoped>
  .order {
    margin: 0 15px;
    font-size: 20px;
    &-number {
      margin-left: 80px;
    }
    &-switch {
      margin-top: -5px;
    }
  }

  .card-cls {
    margin-top: 20px;
    -webkit-box-shadow: #dcdee2 0 1px 6px;
    -moz-box-shadow: #dcdee2 0 1px 6px;
    box-shadow: #dcdee2 0 1px 6px;
  }

  .con {
    position: relative;
    height: 100%;
  }

  .subscript {
    z-index: 2;
    color: #fff;
    height: 30px;
    width: 200px;
    position: absolute;
    left: -76px;
    top: 7px;
    text-align: center;
    font-size: 14px;
    line-height: 30px;
    background-color: #2d8cf0;
    -moz-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .full-spin {
    height: 100px;
  }
</style>
