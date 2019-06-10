import Vue from 'vue'
import { getDate } from '@/libs/tools'

// 订单状态
const orderStatusFilter = val => {
  switch (val) {
    case 1:
      return '已支付'
    case 2:
      return '已入住'
    case 3:
      return '退款申请中'
    case 4:
      return '已退款'
    case 5:
      return '待支付'
    case 6:
      return '已退房'
    case 7:
      return '已取消'
    case 8:
      return '已支付取消'
    case 9:
      return '未入住取消'
    case 10:
      return '未入住退房'
    case 11:
      return '已退订'
    case 12:
      return 'NoShow'
  }
}

const dateTimeFilter = val => {
  return getDate(val, 'all')
}

const dateFilter = val => {
  return getDate(val, 'date')
}

const timeFilter = val => {
  return getDate(val, 'time')
}

Vue.filter('orderStatusFilter', orderStatusFilter)
Vue.filter('dateTimeFilter', dateTimeFilter)
Vue.filter('dateFilter', dateFilter)
Vue.filter('timeFilter', timeFilter)
