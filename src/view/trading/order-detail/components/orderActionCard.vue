<template>
  <Card>
    <p slot="title">订单操作</p>
    <Row :gutter="20">
      <Col :span="20">
        <bed-card v-if="Object.keys(order).length" ref="bedCard" :bed-list="order.bedList" :order-bid="order.orderBid"
                  :order-status="order.orderStatus" :start-date="order.orderStartDate" :end-date="order.orderEndDate"
                  @selectBed="selectBed" @unbindBed="handleUnbindBed"
        ></bed-card>
        <Button v-if="(order.stayPersonSaveStats === 1 || order.stayPersonStats === 6) && order.orderStatus === 1"
                type="primary" class="my-btn" @click="saveBed">保存床位
        </Button>
        <template v-if="order.orderStatus === 1">
          <Button type="primary" class="my-btn">办理入住</Button>
          <Button type="primary" @click="changeBed" class="my-btn">调换床位</Button>
          <Button type="primary" @click="unbindBed" class="my-btn">解绑床位</Button>
          <Button type="primary" class="my-btn">退订床位</Button>
        </template>
        <template v-if="order.orderStatus === 2">
          <Button type="primary" class="my-btn">办理退租</Button>
          <Button type="primary" @click="changeBed" class="my-btn">调换床位</Button>
          <Button type="primary" @click="unbindBed" class="my-btn">解绑床位</Button>
        </template>
        <template v-if="order.orderStatus === 6 || order.orderStatus === 11">
          <Button type="primary" class="my-btn">退房详情</Button>
        </template>
        <template v-if="hasCheckIn">
          <Button v-if="!lockPwdList.length" type="primary" class="my-btn">生成密码</Button>
          <Button v-if="lockPwdList.length && lockPwdHave2" type="primary" class="my-btn">生成密码</Button>
          <template v-if="lockPwdList.length && lockPwdHave1">
            <Button type="primary" class="my-btn">查看密码</Button>
            <Button type="primary" class="my-btn">发送密码</Button>
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
      width="600"
      :loading="stockLoading"
      @on-ok="saveBed">
      <div class="full-top">
        <Spin size="large" fix v-if="loading" class="full-spin"></Spin>
        <div v-for="item in stockData" :key="item.bid">
          <span>{{ item.showName }}</span>
          <CheckboxGroup>
            <Checkbox v-for="i in item.aresBedList" :key="i.bid" :label="i.bid" :disabled="i.status !== 1">{{ i.bedCode | bedCodeFilter }}</Checkbox>
          </CheckboxGroup>
        </div>
        <div v-if="!stockData.length" class="no-data">暂无数据</div>
      </div>
    </Modal>
  </Card>
</template>
<script>
import bedCard from './bedCard'
import feeCard from './feeCard'
import { unbindBed } from '@/api/order'
import { getStock } from '@/api/stock'

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
      stockData: []
    }
  },
  methods: {
    selectBed (dto) {
      this.stockVisible = true
      this.getStock(dto)
    },
    saveBed () {
      let dto = this.$refs.bedCard.saveBed()
      if (dto) {
        this.$emit('saveBed', dto)
      }
    },
    checkIn () {},
    changeBed () {
      this.$refs.bedCard.changeBed()
    },
    getStock (dto) {
      this.loading = true
      getStock(dto).then(res => {
        if (res.code === 200) {
          this.stockData = res.body
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
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
            if (res.code === 200) {
              this.$Message.success('床位解绑成功')
              this.$emit('refresh')
            }
          })
        },
        onCancel: () => {
        }
      })
    },
    unBookBed () {}
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
</style>
