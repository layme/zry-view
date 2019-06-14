import axios from '@/libs/request'
// import { getToken } from '@/libs/util'

// 获取活动列表
export const listCoupon = (data) => {
  return axios.request({
    url: '/coupon/search.action',
    method: 'post',
    data: data
  })
}

// 获取活动详情
export const getActivityDetail = (data) => {
  return axios.request({
    url: '/preferential/getActivityDetail.action',
    method: 'get',
    params: {
      activityBid: data
    }
  })
}

// 保存优惠券
export const saveActivity = (data) => {
  return axios.request({
    url: '/preferential/saveActivity.action',
    method: 'post',
    data: data
  })
}
