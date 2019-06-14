<template>
  <div>
    <coupon-form :batch-number="$route.query.batchNumber" :activity-number="$route.query.activityNumber"
                 @search="listCoupon" @export="exportData"></coupon-form>
    <Table stripe :columns="columns" :data="couponList" :loading="loading" class="my-table">
      <template slot-scope="{ row }" slot="ticketNumber">
        <a @click="toCouponDetail(row)">{{ row.ticketNumber }}</a>
      </template>
      <template slot-scope="{ row }" slot="activityNumber">
        <a @click="toActivityDetail(row)">{{ row.activityNumber }}</a>
      </template>
      <template slot-scope="{ row }" slot="customerPhone">
        <div v-if="row.customerPhone">开启</div>
        <div v-else>-</div>
      </template>
      <template slot-scope="{ row }" slot="orderNumber">
        <div v-if="row.orderNumber">开启</div>
        <div v-else>-</div>
      </template>
    </Table>
    <Page class="my-page" :total="total" show-total :current.sync="paramDto.page"
          :page-size="paramDto.size" @on-change="handlePageChange"/>
  </div>
</template>
<script>
import couponForm from './couponForm.vue'
import { listCoupon } from '@/api/coupon'

export default {
  name: 'couponList',
  components: {
    couponForm
  },
  data () {
    return {
      paramDto: {
        page: 1,
        size: 10
      },
      couponList: [],
      total: 0,
      columns: [
        {
          title: '优惠券编号',
          slot: 'ticketNumber',
          width: 150
        },
        {
          title: '优惠活动编号',
          slot: 'activityNumber'
        },
        {
          title: '优惠券状态',
          key: 'couponState'
        },
        {
          title: '优惠活动状态',
          key: 'activityState'
        },
        {
          title: '绑定手机号',
          slot: 'customerPhone'
        },
        {
          title: '订单号',
          slot: 'orderNumber'
        },
        {
          title: '兑换码',
          key: 'redeemCode'
        },
        {
          title: '有效期',
          key: 'validDate'
        },
        {
          title: '使用条件',
          key: 'conditions'
        },
        {
          title: '活动内容',
          key: 'activityContent',
          tooltip: true
        }
      ],
      loading: false
    }
  },
  methods: {
    listCoupon (dto) {
      Object.assign(this.paramDto, dto)
      this.$delete(this.paramDto, 'dateRange')
      this.paramDto.activityState = this.paramDto.activityState.join(',')
      this.paramDto.couponState = this.paramDto.couponState.join(',')
      this.paramDto.page = 1
      this.handlePageChange()
    },
    handlePageChange () {
      this.loading = true
      listCoupon(this.paramDto).then(res => {
        if (res.code === 200) {
          this.couponList = res.body.rows
          this.total = res.body.total
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    exportData (dto) {
    },
    toCouponDetail (row) {
      const couponBid = row.couponBid
      const route = {
        name: 'couponDetail',
        query: {
          couponBid
        }
      }
      this.$router.push(route)
    },
    toActivityDetail (row) {
      const activityBid = row.activityBid
      const route = {
        name: 'activityDetail',
        query: {
          activityBid
        }
      }
      this.$router.push(route)
    }
  }
}
</script>
<style lang="less" scoped>
  .my-table {
    margin-top: 20px;
  }
  .my-page {
    text-align: right;
    margin-top: 20px
  }
</style>
