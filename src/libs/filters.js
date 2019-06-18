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

const payMethodFilter = val => {
  switch (val) {
    case '0':
      return 'POS支付'
    case 'wx_ad_pay':
      return '微信支付'
    case 'wx_ios_pay':
      return '微信支付'
    case 'cft_wx_pay':
      return '微信支付'
    case 'yl_ad_pay':
      return '银联支付'
    case 'yl_ios_pay':
      return '银联支付'
    case '1':
      return 'OTA预付'
    case 'balance':
      return '余额支付'
    case 'ali_mobile':
      return '支付宝支付'
    case '2':
      return '余额+微信支付'
    case '3':
      return '余额+支付宝支付'
  }
}

const stayPersonStatusFilter = val => {
  switch (val) {
    case 1:
      return '未入住'
    case 2:
      return '已入住'
    case 3:
      return '已续租'
    case 4:
      return '已退租'
    case 5:
      return '已保存床位'
    case 8:
      return '已支付取消'
    case 9:
      return '未入住取消'
    case 10:
      return '未入住退房'
  }
}

const nullFilter = val => {
  if (val) {
    return val
  } else {
    return '-'
  }
}

const idTypeFilter = val => {
  switch (val) {
    case 0:
      return '其他'
    case 1:
      return '身份证'
    case 2:
      return '护照'
    case 3:
      return '军官证'
    case 4:
      return '通行证'
    case 5:
      return '驾驶证'
    case 6:
      return '台胞证'
    case 7:
      return '社保卡'
    case 8:
      return '省份证'
    case 9:
      return '社保卡'
    case 10:
      return '学生证'
    case 11:
      return '回乡证'
    case 12:
      return '营业执照'
    case 13:
      return '港澳通行证'
    case 14:
      return '户口本'
    case 15:
      return '居住证'
    case 16:
      return '营业执照'
  }
}

Vue.filter('orderStatusFilter', orderStatusFilter)
Vue.filter('dateTimeFilter', dateTimeFilter)
Vue.filter('dateFilter', dateFilter)
Vue.filter('timeFilter', timeFilter)
Vue.filter('payMethodFilter', payMethodFilter)
Vue.filter('stayPersonStatusFilter', stayPersonStatusFilter)
Vue.filter('nullFilter', nullFilter)
Vue.filter('idTypeFilter', idTypeFilter)
