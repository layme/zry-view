<template>
  <Card>
    <p slot="title">订单操作</p>
    <Row :gutter="20">
      <Col :span="20">
        <bed-card v-if="Object.keys(order).length" ref="bedCard" :bed-list="order.bedList" :order-bid="order.orderBid"
                  :order-status="order.orderStatus" :start-date="order.orderStartDate" :end-date="order.orderEndDate"
                  @selectBed="selectBed" @unbindBed="handleUnbindBed" @cancelBookBed="handleCancelBookBed"
                  @checkIn="handleCheckIn" @checkOut="handleCheckOut"
        ></bed-card>
        <Button v-if="(order.stayPersonSaveStats === 1 || order.stayPersonStats === 6) && order.orderStatus === 1"
                type="primary" @click="saveBed" class="my-btn">保存床位
        </Button>
        <template v-if="order.orderStatus === 1">
          <Button type="primary" @click="checkIn" class="my-btn">办理入住</Button>
          <Button type="primary" @click="changeBed" class="my-btn">调换床位</Button>
          <Button type="primary" @click="unbindBed" class="my-btn">解绑床位</Button>
          <Button type="primary" @click="cancelBookBed" class="my-btn">退订床位</Button>
        </template>
        <template v-if="order.orderStatus === 2">
          <Button type="primary" @click="checkOut" class="my-btn">办理退租</Button>
          <Button type="primary" @click="changeBed" class="my-btn">调换床位</Button>
          <Button type="primary" @click="unbindBed" class="my-btn">解绑床位</Button>
        </template>
        <template v-if="order.orderStatus === 6 || order.orderStatus === 11">
          <Button type="primary" @click="toRefundDetail" class="my-btn">退房详情</Button>
        </template>
        <template v-if="hasCheckIn">
          <Button v-if="!lockPwdList.length" type="primary" @click="generateLockPwd" class="my-btn">生成密码</Button>
          <Button v-if="lockPwdList.length && lockPwdHave2" type="primary" @click="generateLockPwd" class="my-btn">生成密码</Button>
          <template v-if="lockPwdList.length && lockPwdHave1">
            <Button type="primary" @click="showPwd" class="my-btn">查看密码</Button>
            <Button type="primary" @click="sendDoorPwd" class="my-btn">发送密码</Button>
          </template>
        </template>
      </Col>
      <Col :span="4">
        <fee-card :order="order"></fee-card>
      </Col>
    </Row>
    <Modal
      v-model="stockVisible"
      title="选择床位"
      width="800"
      :loading="stockLoading"
      @on-ok="saveBed">
      <div class="full-top">
        <Spin size="large" fix v-if="loading" class="full-spin"></Spin>
        <div v-if="!stockData.length" class="no-data">暂无数据</div>
        <Form v-else :label-width="70">
          <RadioGroup v-model="selectAreaBed" style="width: 100%">
            <FormItem v-for="item in stockData" :key="item.bid" :label="item.showName">
              <Row>
                <Col v-for="i in item.aresBedList" :key="i.bid" :span="24 / item.aresBedList.length" style="text-align: center">
                  <Radio :label="item.bid + ',' + i.bid" :disabled="i.status !== 1" class="my-radio">
                    {{ i.bedCode | bedCodeFilter }}
                  </Radio>
                </Col>
              </Row>
            </FormItem>
          </RadioGroup>
        </Form>
      </div>
    </Modal>
    <Modal
      v-model="pwdVisible"
      title="房间密码"
      width="300">
        <Table stripe :columns="pwdColumns" :data="lockPwdList"></Table>
    </Modal>
  </Card>
</template>
<script>
import bedCard from './bedCard'
import feeCard from './feeCard'
import { unbindBed, changeBed, cancelBookBed, checkInOrder, checkOutOrder, generateLockPwd } from '@/api/order'
import { getStock } from '@/api/stock'
import { checkDoorPwd, sendDoorPwd } from '@/api/smartLock'

export default {
  name: 'orderActionCard',
  props: {
    order: Object,
    hasCheckIn: Boolean,
    lockPwdList: {
      type: Array,
      default: () => []
    },
    lockPwdHave1: Boolean,
    lockPwdHave2: Boolean
  },
  components: {
    bedCard,
    feeCard
  },
  data () {
    return {
      loading: false,
      stockVisible: false,
      stockLoading: true,
      stockData: [],
      selectAreaBed: '',
      changeBedDto: {
        orderBid: '',
        stayPersonBid: '',
        oldBedBid: '',
        oldAreaBid: '',
        houseTypeBid: '',
        startDate: '',
        endDate: '',
        newBedBid: '',
        newAreaBid: '',
        projectBid: ''
      },
      pwdVisible: false,
      pwdColumns: [
        {
          title: '房间',
          key: 'areCode',
          align: 'center'
        },
        {
          title: '密码',
          key: 'passWord',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    selectBed (dto, stay) {
      this.stockVisible = true
      this.selectAreaBed = ''
      this.getStock(dto)
      this.changeBedDto.orderBid = stay.orderBid
      this.changeBedDto.stayPersonBid = stay.bid
      this.changeBedDto.oldBedBid = stay.areaBedBid
      this.changeBedDto.oldAreaBid = stay.areaBid
      this.changeBedDto.houseTypeBid = stay.houseTypeBid
      this.changeBedDto.startDate = dto.checkInTime
      this.changeBedDto.endDate = dto.checkOutTime
      this.changeBedDto.newBedBid = ''
      this.changeBedDto.newAreaBid = ''
      this.changeBedDto.projectBid = this.order.projectBid
    },
    changeBed () {
      this.$refs.bedCard.changeBed()
    },
    getStock (dto) {
      this.loading = true
      getStock(dto).then(res => {
        this.stockData = res.body
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    saveBed () {
      changeBed(this.changeBedDto).then(res => {
        this.$Message.success('床位保存成功')
        this.stockVisible = false
        this.$emit('refresh')
      }).catch(() => {
        this.handleError()
      })
    },
    handleError () {
      setTimeout(() => {
        this.stockLoading = false
        this.$nextTick(() => {
          this.stockLoading = true
        })
      }, 500)
    },
    unbindBed () {
      this.$refs.bedCard.unbindBed()
    },
    handleUnbindBed (dto) {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>确定要解绑吗？</p>',
        onOk: () => {
          unbindBed(dto).then(res => {
            this.$Message.success('床位解绑成功')
            this.$emit('refresh')
          })
        },
        onCancel: () => {
        }
      })
    },
    checkIn () {
      this.$refs.bedCard.checkIn()
    },
    handleCheckIn (dto) {
      let phone = this.order.cusPhone
      if (!/^\d{11}$/.test(phone)) {
        this.$Message.warning('预定人手机号格式不正确')
        return
      }
      dto.customerPhone = phone
      checkInOrder(dto).then(res => {
        this.$Message.success('办理入住成功')
        this.$emit('refresh')
      })
    },
    cancelBookBed () {
      this.$refs.bedCard.cancelBookBed()
    },
    handleCancelBookBed (dto) {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>确定要退订床位吗？</p>',
        onOk: () => {
          cancelBookBed(dto).then(res => {
            this.$Message.success('退订床位成功')
            this.$emit('refresh')
          })
        },
        onCancel: () => {
        }
      })
    },
    checkOut () {
      this.$refs.bedCard.checkOut()
    },
    handleCheckOut (dto) {
      dto.customerPhone = this.order.cusPhone
      checkOutOrder(dto).then(res => {
        this.$Message.success('办理退租成功')
        this.$emit('refresh')
      })
    },
    generateLockPwd () {
      this.$Modal.confirm({
        title: '通知',
        content: '<p>确定生成密码吗？</p>',
        onOk: () => {
          generateLockPwd({
            orderBid: this.order.orderBid,
            projectBid: this.order.projectBid
          }).then(res => {
            this.$Message.success('密码生成成功')
            this.$emit('refresh')
          })
        },
        onCancel: () => {
        }
      })
    },
    showPwd () {
      this.pwdVisible = true
      checkDoorPwd(this.order.orderBid)
    },
    sendDoorPwd () {
      sendDoorPwd(this.order.orderBid).then(res => {
        this.$Message.success('密码发送成功')
      })
    },
    toRefundDetail () {
      const orderBid = this.order.orderBid
      const route = {
        name: 'refundDetail',
        query: {
          orderBid
        }
      }
      this.$router.push(route)
    }
  },
  watch: {
    selectAreaBed (val) {
      if (val) {
        let a = val.split(',')
        this.changeBedDto.newAreaBid = a[0]
        this.changeBedDto.newBedBid = a[1]
      } else {
        this.changeBedDto.newAreaBid = ''
        this.changeBedDto.newBedBid = ''
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .my-btn {
    margin-right: 20px;
  }
  .full-top {
    position: relative;
    min-height: 300px;
  }

  .full-spin {
    height: 100%;
  }

  .my-radio {
    border: 1px #dcdee2 solid;
    border-radius: 4px;
    padding: 0 10px;
  }
</style>
