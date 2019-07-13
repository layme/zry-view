<template>
  <div style="position: relative;">
    <ButtonGroup class="create-group" v-if="false">
      <Button type="primary" class="create-group-btn" @click="orderVisible = true">
        <Icon type="ios-paper-outline"></Icon>
        订单
      </Button>
      <Button type="primary" class="create-group-btn" @click="lockVisible = true">
        锁定
        <Icon type="ios-lock-outline"></Icon>
      </Button>
    </ButtonGroup>
    <Row :gutter="20">
      <Col :span="4" v-for="item in $store.state.workbench.passwords" :key="item.id" class="top-info">
        <info-card disHover color="#2d8cf0" icon="md-key" :icon-size="30">
          <count-to :end="parseInt(item.password)" :duration="0.2" :count-class="countStyle"/>
          <p style="font-size: 8px">{{ item.pswType | pswTypeFilter }}</p>
        </info-card>
      </Col>
      <Col :span="4" class="top-info">
        <info-card disHover color="#ff9900" icon="md-bulb" :icon-size="30">
          <count-to :end="$store.state.workbench.cleanCount" :duration="0.2" :count-class="countStyle"/>
          <p style="font-size: 8px">待保洁数量</p>
        </info-card>
      </Col>
      <Col :span="4" class="top-info">
        <info-card disHover color="#ed4014" icon="ios-cart" :icon-size="30">
          <count-to :end="$store.state.workbench.stockOrderCount" :duration="0.2" :count-class="countStyle"/>
          <p style="font-size: 8px">ON 待核订单</p>
        </info-card>
      </Col>
      <Col :span="4" class="top-info">
        <info-card disHover color="#E46CBB" icon="ios-cart-outline" :icon-size="30">
          <count-to :end="$store.state.workbench.unStockOrderCount" :duration="0.2" :count-class="countStyle"/>
          <p style="font-size: 8px">OFF 待核订单</p>
        </info-card>
      </Col>
    </Row>
    <Row style="margin-bottom: 10px">
      <Col span="18">
        <Button type="primary" @click="orderVisible = true" ghost style="margin-right: 20px">新增订单</Button>
        <Button type="primary" @click="lockVisible = true" ghost style="margin-right: 20px">锁定床位</Button>
        <span>当前房型：</span>
        <Dropdown @on-click="handleHouseType">
          <a>
            {{ $store.state.workbench.currentHouseType.houseTypeName }}
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem :name="-1">全部房型</DropdownItem>
            <DropdownItem v-for="(item, index) in $store.state.workbench.houseTypeList" :name="index" :key="index">
              {{ item.houseTypeParentName }} - {{ item.houseTypeName }}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
      <Col span="6" style="text-align: right">
        图例:
        <Tag color="#facb65">已支付</Tag>
        <Tag color="#7ddca3">已入住</Tag>
        <Tag color="#00b4f7">已退房</Tag>
        <Tag color="#e8eaec">锁定</Tag>
      </Col>
    </Row>
    <div class="full-top">
      <Spin size="large" fix v-if="$store.state.workbench.loading" class="full-spin"></Spin>
      <bed-calendar :today-str="todayStr" @dateChange="handleDateChange" @refresh="handleRefresh"></bed-calendar>
    </div>
    <Modal
      v-model="orderVisible"
      title="新增订单"
      :loading="orderLoading"
      width="1200"
      @on-ok="validOrder">
      <create-order ref="createOrderRef" v-if="orderVisible" @submit="handleSaveOrder" @error="handleOrderError"></create-order>
    </Modal>
    <Modal
      v-model="lockVisible"
      title="锁定床位"
      :loading="lockLoading"
      width="900"
      @on-ok="validLock">
      <lock-bed ref="lockRef" v-if="lockVisible" @submit="handleLockBed" @error="handleLockError"></lock-bed>
    </Modal>
  </div>
</template>
<script>
import InfoCard from '_c/info-card'
import CountTo from '_c/count-to'
import bedCalendar from './components/bedCalendar'
import createOrder from './components/createOrder'
import lockBed from './components/lockBed'
import { mapMutations, mapActions } from 'vuex'
import { getDate, dateStrMove } from '@/libs/tools'
import { saveOrder } from '@/api/order'
import { lockBedStock } from '@/api/stock'
export default {
  name: 'workbench',
  components: {
    InfoCard,
    CountTo,
    bedCalendar,
    createOrder,
    lockBed
  },
  data () {
    return {
      countStyle: {
        fontSize: '20px'
      },
      todayStr: '',
      currentHouseTypeName: '全部房型',
      workDto: {
        checkInTime: '',
        checkOutTime: '',
        houseTypeBid: this.$store.state.workbench.currentHouseType.houseTypeBid
      },
      orderVisible: false,
      orderLoading: true,
      lockVisible: false,
      lockLoading: true
    }
  },
  methods: {
    ...mapMutations([
      'setCurrentHouseType',
      'setStockData',
      'setWorkData'
    ]),
    ...mapActions([
      'getPassword',
      'getBedCountByStatus',
      'getStockOrderCount',
      'getHouseTypeList',
      'getStockOfPerDay',
      'getStockWorkbench',
      'getOrderEnums'
    ]),
    init () {
      this.todayStr = getDate(new Date(), 'date')
      this.workDto.checkInTime = dateStrMove(this.todayStr, -1)
      this.workDto.checkOutTime = dateStrMove(this.todayStr, 29)
    },
    handleHouseType (index) {
      let houseTypeBid = ''
      let houseTypeName = ''
      if (index !== -1) {
        let houseType = this.$store.state.workbench.houseTypeList[index]
        houseTypeBid = houseType.bid
        houseTypeName = houseType.houseTypeParentName + '-' + houseType.houseTypeName
      } else {
        houseTypeName = '全部房型'
      }
      if (this.workDto.houseTypeBid !== houseTypeBid) {
        this.setCurrentHouseType({
          houseTypeName: houseTypeName,
          houseTypeBid: houseTypeBid
        })
        this.currentHouseTypeName = houseTypeName
        this.workDto.houseTypeBid = houseTypeBid
      }
    },
    handleDateChange (dto) {
      this.todayStr = dto
    },
    validOrder () {
      this.$refs.createOrderRef.validateForm()
    },
    handleSaveOrder (dto) {
      saveOrder(dto).then(res => {
        this.$Message.success('订单创建成功')
        this.orderVisible = false
        const orderNumber = res.body
        const route = {
          name: 'orderDetail',
          query: {
            orderNumber
          }
        }
        this.$router.push(route)
      }).catch(() => {
        this.handleOrderError()
      })
    },
    handleOrderError () {
      setTimeout(() => {
        this.orderLoading = false
        this.$nextTick(() => {
          this.orderLoading = true
        })
      }, 500)
    },
    validLock () {
      this.$refs.lockRef.validateForm()
    },
    handleLockBed (dto) {
      lockBedStock(dto).then(res => {
        this.$Message.success('锁定成功')
        this.lockVisible = false
        this.handleRefresh()
      }).catch(() => {
        this.handleLockError()
      })
    },
    handleLockError () {
      setTimeout(() => {
        this.lockLoading = false
        this.$nextTick(() => {
          this.lockLoading = true
        })
      }, 500)
    },
    handleRefresh () {
      this.getStockOfPerDay(this.workDto)
      this.getStockWorkbench(this.workDto)
    },
    toRefundList (orderNumber) {
      const route = {
        name: 'refundList',
        query: {
          orderNumber
        }
      }
      this.$router.push(route)
    }
  },
  watch: {
    todayStr (val) {
      this.workDto.checkInTime = dateStrMove(val, -1)
      this.workDto.checkOutTime = dateStrMove(val, 29)
    },
    workDto: {
      handler (val) {
        this.setStockData([])
        this.setWorkData([])
        this.getStockOfPerDay(val)
        this.getStockWorkbench(val)
      },
      deep: true
    },
    '$store.state.user.currentProject' () {
      this.init()
      this.getPassword()
      this.getBedCountByStatus()
      this.getStockOrderCount()
      this.getHouseTypeList()
      this.getOrderEnums()
      this.getStockOfPerDay(this.workDto)
      this.getStockWorkbench(this.workDto)
    }
  },
  created () {
    this.init()
    this.getPassword()
    this.getBedCountByStatus()
    this.getStockOrderCount()
    this.getHouseTypeList()
    this.getOrderEnums()
    this.getStockOfPerDay(this.workDto)
    this.getStockWorkbench(this.workDto)
  }
}
</script>
<style lang="less" scoped>
  .top-info {
    height: 70px;
    padding-bottom: 10px;
  }
  .full-top {
    position: relative;
    min-height: 300px;
  }

  .full-spin {
    height: 100%;
  }

  .create-group {
    position: absolute;
    top: 0;
    right: 0;
    &-btn {
      height: 60px;
      width: 100px;
      font-size: 18px;
      z-index: 3;
    }
  }
</style>
