<template>
  <div v-if="orders.length" :style="{ backgroundColor: orderBC }" class="order">
    <div v-if="orders.length > 1" class="my-btn">
      <Button shape="circle" icon="ios-more" size="small" @click.prevent="visible = true"></Button>
    </div>
    <div style="height: 100%" @click="showOrder(0)">
      <div class="content">{{ orderChannel }}</div>
      <div class="content">{{ orders[0].name }}</div>
    </div>
    <Modal
      v-model="visible"
      title="选择订单"
      width="400"
      footer-hide>
      <Alert v-for="(item, index) in orders" :key="index" style="cursor: pointer;" @click.native="toOrderDetail(index)">
        {{ item.name }}
        <template slot="desc">{{ item.orderNumber }}</template>
      </Alert>
    </Modal>
    <Modal
      v-model="lockVisible"
      title="锁定信息"
      width="400"
      ok-text="解锁"
      @on-ok="unLockBed">
      <Form :model="lockInfo" :label-width="60">
        <Row>
          <Col :span="10">
            <FormItem label="原因: ">
              {{ lockInfo.reason | reasonFilter }}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col :span="20">
            <FormItem label="备注: ">
              {{ lockInfo.remark | nullFilter }}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { getLockBedStock, unLockBedStock } from '@/api/stock'
export default {
  name: 'orderCell',
  props: {
    orders: Array
  },
  data () {
    return {
      visible: false,
      lockVisible: false,
      lockInfo: {}
    }
  },
  computed: {
    orderBC () {
      switch (this.orders[0].orderStatus) {
        case 1:
          return '#facb65'
        case 2:
          return '#7ddca3'
        case 6:
          return '#00b4f7'
        case -1:
          return '#e8eaec'
        default:
          return '#ffffff'
      }
    },
    orderChannel () {
      return this.$store.state.workbench.orderEnums[this.orders[0].channel]
    }
  },
  methods: {
    showOrder (index) {
      let orderNumber = this.orders[index].orderNumber
      if (orderNumber) {
        this.toOrderDetail(orderNumber)
      } else {
        let orderBid = this.orders[index].orderBid
        this.openLockInfo(orderBid)
        this.lockInfo = {}
        this.lockVisible = true
      }
    },
    toOrderDetail (orderNumber) {
      const route = {
        name: 'orderDetail',
        query: {
          orderNumber
        }
      }
      this.$router.push(route)
    },
    openLockInfo (orderBid) {
      getLockBedStock(orderBid).then(res => {
        this.lockInfo = res.body
      })
    },
    unLockBed () {
      unLockBedStock(this.lockInfo.lockbedBid).then(res => {
        this.$Message.success('解锁成功')
        this.$emit('refresh')
      })
    }
  },
  filters: {
    reasonFilter (val) {
      switch (val) {
        case 1:
          return 'OTA库存'
        case 2:
          return '装修'
        case 3:
          return '维修'
        case 4:
          return '其他'
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .order {
    height: 100%;
    text-align: left;
    border-radius: 4px;
    padding: 2px;
    cursor: pointer;
    position: relative;
  }

  .my-btn {
    position: absolute;
    top: 2px;
    right: 2px;
  }

  .content {
    line-height: 25px;
  }
</style>
