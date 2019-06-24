<template>
  <div class="con">
    <Spin size="large" fix v-if="loading" class="full-spin"></Spin>
    <div v-if="Object.keys(orderInfo).length" class="subscript" :style="{ backgroundColor: orderStatusBC }">
      {{ orderInfo.orderStatus | orderStatusFilter }}
    </div>
    <Row v-if="Object.keys(orderInfo).length">
      <Col :span="12">
        <strong class="order order-number">订单号：{{ orderNumber }}</strong>
        <strong class="order order-price">¥ {{ orderInfo.amountNoCoupon }}</strong>
      </Col>
      <Col :span="12" style="text-align: right">
        <ButtonGroup>
          <Button type="primary" icon="ios-time-outline" ghost @click="logVisible = true">订单日志</Button>
          <Button type="primary" icon="ios-card" ghost @click="paymentVisible = true">支付明细</Button>
          <Button type="primary" icon="ios-print-outline" ghost>打印</Button>
          <Button type="primary" icon="ios-mail-outline" ghost @click="emailRender">发送邮件</Button>
        </ButtonGroup>
      </Col>
    </Row>
    <base-info-card v-if="Object.keys(orderInfo).length" :order="orderInfo" :channel="firstChannel"
                    class="card-cls"></base-info-card>
    <Row :gutter="20">
      <Col :span="18">
        <stay-person-card v-if="Object.keys(orderInfo).length" :stay-list="orderInfo.stayPersonDtoList"
                          :guest-type="guestType" :order-bid="orderInfo.orderBid" :order-status="orderInfo.orderStatus"
                          @save="saveStayPerson"
                          class="card-cls"></stay-person-card>
      </Col>
      <Col :span="6">
        <order-remark-card v-if="Object.keys(orderInfo).length" ref="remarkRef" :remarks="recordList" class="card-cls"
                           @save="saveOrderRemark"></order-remark-card>
      </Col>
    </Row>
    <order-action-card v-if="Object.keys(orderInfo).length"
                       :order="orderInfo"
                       :has-check-in="hasCheckInStayPerson"
                       :lock-pwd-list="lockPwdList"
                       :lock-pwd-have1="lockPwdHave1"
                       :lock-pwd-have2="lockPwdHave2"
                       @refresh="getOrderDetail"
                       class="card-cls" style="margin-bottom: 20px">
    </order-action-card>
    <Modal
      v-model="logVisible"
      title="订单日志"
      footer-hide>
      <div :style="{ paddingLeft: '20px' }">
        <order-log v-if="logVisible" :order-bid="orderInfo.bid"></order-log>
      </div>
    </Modal>
    <Modal
      v-model="paymentVisible"
      title="支付明细"
      width="60"
      footer-hide>
      <div :style="{ paddingLeft: '20px' }">
        <payment-detail v-if="paymentVisible" :order-bid="orderInfo.bid"></payment-detail>
      </div>
    </Modal>
  </div>
</template>
<script>
import baseInfoCard from './components/baseInfoCard'
import stayPersonCard from './components/stayPersonCard'
import orderRemarkCard from './components/orderRemarkCard'
import orderActionCard from './components/orderActionCard'
import orderLog from './components/orderLog'
import paymentDetail from './components/paymentDetail'
import { orderDetail, saveOrderRemark, getOrderRemark, saveStayPerson } from '@/api/order'

export default {
  name: 'orderDetail',
  components: {
    baseInfoCard,
    stayPersonCard,
    orderRemarkCard,
    orderActionCard,
    orderLog,
    paymentDetail
  },
  data () {
    return {
      orderNumber: '',
      loading: false,
      orderInfo: {},
      accountBank: '',
      lockPwdList: [],
      lockPwdHave1: '',
      lockPwdHave2: '',
      hasCheckInStayPerson: '',
      ticketInfo: '',
      renewOrderEndMinDate: '',
      recordList: [],
      guestType: {},
      firstChannel: [],
      logVisible: false,
      paymentVisible: false,
      email: ''
    }
  },
  computed: {
    orderStatusBC () {
      switch (this.orderInfo.orderStatus) {
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
    getOrderDetail () {
      this.loading = true
      this.orderNumber = this.$route.query.orderNumber
      orderDetail(this.orderNumber).then(res => {
        if (res.code === 200) {
          this.orderInfo = res.body.orderInfo
          this.accountBank = res.body.accountBank
          this.lockPwdList = res.body.lockPwdList
          this.lockPwdHave1 = res.body.lockPwdHave1
          this.lockPwdHave2 = res.body.lockPwdHave2
          this.hasCheckInStayPerson = res.body.hasCheckInStayPerson
          this.ticketInfo = res.body.ticketInfo
          this.renewOrderEndMinDate = res.body.renewOrderEndMinDate
          this.recordList = res.body.recordList
          this.guestType = res.body.guestType
          this.firstChannel = res.body.firstChannel
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    emailRender () {
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: this.email,
              autofocus: true,
              placeholder: '请输入邮箱'
            },
            on: {
              input: (val) => {
                this.email = val
              }
            }
          })
        }
      })
    },
    saveOrderRemark (dto) {
      saveOrderRemark({ orderBid: this.orderInfo.orderBid, orderRemark: dto }).then(res => {
        if (res.code === 200) {
          this.$Message.success('备注保存成功，备注信息稍后展示')
          this.$refs.remarkRef.clear()
          setTimeout(() => {
            this.getOrderRemark()
          }, 2000)
        }
      })
    },
    getOrderRemark () {
      getOrderRemark(this.orderInfo.orderBid).then(res => {
        if (res.code === 200) {
          this.recordList = res.body
        }
      })
    },
    saveStayPerson (dto) {
      saveStayPerson(dto).then(res => {
        if (res.code === 200) {
          this.$Message.success('入住人保存成功')
          this.getOrderDetail()
        }
      })
    },
    saveBed (dto) {
      console.info('saveBed ', dto)
    }
  },
  watch: {
    '$route' (to, from) {
      this.getOrderDetail()
    }
  },
  created () {
    this.getOrderDetail()
  }
}
</script>
<style lang="less" scoped>
  .order {
    margin: 0 15px;
    font-size: 20px;
    &-number {
      margin-left: 50px;
    }
    &-price {
      color: #2d8cf0;
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
    color: #fff;
    height: 40px;
    width: 200px;
    position: absolute;
    left: -90px;
    top: -10px;
    text-align: center;
    font-size: 16px;
    line-height: 40px;
    background-color: #2d8cf0;
    -moz-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .full-spin {
    height: 100%;
  }
</style>
