<template>
  <div>
    <coupon-form @search="listCoupon" @export="exportData"></coupon-form>
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
          :page-size="paramDto.limit" @on-change="handlePageChange"/>
  </div>
</template>
<script>
import couponForm from './couponForm.vue'

export default {
  name: 'couponList',
  components: {
    couponForm
  },
  data () {
    return {
      paramDto: {
        page: 1,
        limit: 10
      },
      couponList: [
        {
          'couponBid': '0bacf1f74c4b47ef91e9bcdadd0a0b1c',
          'activityNumber': 'S19052415',
          'ticketNumber': 'S190524150100002',
          'couponState': '初始态',
          'activityState': '进行中',
          'customerPhone': null,
          'orderNumber': null,
          'orderBid': null,
          'redeemCode': '9nf7vmcqfh',
          'validDate': '绑定账户后15天内有效',
          'conditions': '满50.0可用<br>',
          'activityContent': 'renhyrenhyrenhyrenhy',
          'activityBid': '0343f64e194c42f5bf98fb09ea534966',
          'amount': null,
          'limitMoney': null
        }, {
          'couponBid': '8b7b1c60449b44deaedfde6b880a41ca',
          'activityNumber': 'S19052415',
          'ticketNumber': 'S190524150100001',
          'couponState': '初始态',
          'activityState': '进行中',
          'customerPhone': null,
          'orderNumber': null,
          'orderBid': null,
          'redeemCode': 'imh6bmnqu4',
          'validDate': '绑定账户后15天内有效',
          'conditions': '满50.0可用<br>',
          'activityContent': 'renhyrenhyrenhyrenhy',
          'activityBid': '0343f64e194c42f5bf98fb09ea534966',
          'amount': null,
          'limitMoney': null
        }
      ],
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
      this.paramDto.page = 1
      this.handlePageChange()
    },
    handlePageChange () {
      this.loading = true
      console.info('paramDto', this.paramDto)
      this.loading = false
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
  },
  created () {
    this.listCoupon()
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
