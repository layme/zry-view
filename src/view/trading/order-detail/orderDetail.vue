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
          <Button type="primary" icon="ios-print-outline" ghost @click="printRegistrationForm">打印</Button>
          <Button type="primary" icon="ios-mail-outline" ghost @click="mailVisible = true">发送邮件</Button>
        </ButtonGroup>
      </Col>
    </Row>
    <base-info-card v-if="Object.keys(orderInfo).length" :order="orderInfo" :coupon="ticketInfo" :channel="firstChannel"
                    class="card-cls" @updatePhone="updatePhone" @updateMail="updateMail" @refresh="getOrderDetail"></base-info-card>
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
    <order-action-card v-if="Object.keys(orderInfo).length && orderInfo.orderStatus !== 5 && orderInfo.orderStatus !== 7 "
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
      width="800"
      footer-hide>
      <div :style="{ paddingLeft: '20px' }">
        <order-log v-if="logVisible" :order-bid="orderInfo.orderBid"></order-log>
      </div>
    </Modal>
    <Modal
      v-model="paymentVisible"
      title="支付明细"
      width="60"
      footer-hide>
      <div :style="{ paddingLeft: '20px' }">
        <payment-detail v-if="paymentVisible" :order-bid="orderInfo.orderBid"></payment-detail>
      </div>
    </Modal>
    <Modal
      v-model="phoneVisible"
      :loading="phoneLoading"
      title="修改预定手机号"
      width="500"
      @on-ok="validPhone">
      <Form ref="cusPhoneForm" :model="phoneDto" :label-width="100">
        <FormItem label="预定手机号" prop="phone" :rules="[
                  { required: true, message: '请输入预定手机号', trigger: 'blur' },
                  { pattern: /^1\d{10}$/, message: '手机号格式有误', trigger: 'blur' }]">
          <Input v-model.trim="phoneDto.phone" placeholder="" clearable></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="mailVisible"
      :loading="phoneLoading"
      title="发送邮件"
      width="500"
      @on-ok="validMail">
      <Form ref="mailForm" :model="mailDto" :label-width="50">
        <FormItem label="邮箱" prop="email" :rules="[
                  { required: true, message: '请输入邮箱', trigger: 'blur' },
                  { pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: '邮箱格式有误', trigger: 'blur' }]">
          <Input v-model.trim="mailDto.email" placeholder="请输入邮箱" :maxlength="200" clearable></Input>
        </FormItem>
      </Form>
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
import { orderDetail, saveOrderRemark, getOrderRemark, saveStayPerson, updateOrderPhone, getRegistrationForm, sendEmail } from '@/api/order'

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
      newCusPhone: '',
      phoneDto: {
        orderBid: '',
        phone: '',
        oldPhone: ''
      },
      phoneVisible: false,
      mailVisible: false,
      phoneLoading: true,
      mailDto: {
        orderBid: '',
        email: ''
      }
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
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    saveOrderRemark (dto) {
      saveOrderRemark({ orderBid: this.orderInfo.orderBid, orderRemark: dto }).then(res => {
        this.$Message.success('备注保存成功，备注信息稍后展示')
        this.$refs.remarkRef.clear()
        setTimeout(() => {
          this.getOrderRemark()
        }, 2000)
      })
    },
    getOrderRemark () {
      getOrderRemark(this.orderInfo.orderBid).then(res => {
        this.recordList = res.body
      })
    },
    saveStayPerson (dto) {
      saveStayPerson(dto).then(() => {
        this.$Message.success('入住人保存成功')
        this.getOrderDetail()
      })
    },
    saveBed (dto) {
      console.info('saveBed ', dto)
    },
    updatePhone () {
      this.phoneDto.orderBid = this.orderInfo.orderBid
      this.phoneDto.phone = this.orderInfo.cusPhone
      this.phoneDto.oldPhone = this.orderInfo.cusPhone
      this.phoneVisible = true
    },
    validPhone () {
      this.$refs.cusPhoneForm.validate((valid) => {
        if (valid) {
          if (this.phoneDto.phone !== this.phoneDto.oldPhone) {
            this.updateOrderPhone()
          } else {
            this.phoneVisible = false
          }
        } else {
          this.handleError()
        }
      })
    },
    updateOrderPhone () {
      updateOrderPhone(this.phoneDto).then(res => {
        this.$Message.success('预定手机号修改成功')
        this.phoneVisible = false
        this.getOrderDetail()
      }).catch(() => {
        this.handleError()
      })
    },
    validMail () {
      this.$refs.mailForm.validate((valid) => {
        if (valid) {
          this.sendEmail()
        } else {
          this.handleError()
        }
      })
    },
    sendEmail () {
      this.mailDto.orderBid = this.orderInfo.orderBid
      this.$Message.info('邮件后台发送中...')
      sendEmail(this.mailDto).then(() => {
        this.$Message.success('邮件发送成功')
        this.mailVisible = false
      })
    },
    updateMail () {},
    handleError () {
      setTimeout(() => {
        this.phoneLoading = false
        this.$nextTick(() => {
          this.phoneLoading = true
        })
      }, 500)
    },
    printRegistrationForm () {
      this.$Message.info('入住单后台生成中，稍后在新页面打开...')
      getRegistrationForm(this.orderInfo.orderBid).then(res => {
        window.open(res.body, '_blank')
      })
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
