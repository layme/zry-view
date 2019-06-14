import axios from '@/libs/request'
// import { getToken } from '@/libs/util'

// 获取活动列表
export const listActivity = (data) => {
  return axios.request({
    url: '/activity/listActivity.action',
    method: 'post',
    data: data
  })
}

// 获取活动详情
export const getActivityDetail = (data) => {
  return axios.request({
    url: '/activity/getActivityDetail.action',
    method: 'get',
    params: {
      activityBid: data
    }
  })
}

// 保存优惠券
export const saveActivity = (data) => {
  return axios.request({
    url: '/activity/saveActivity.action',
    method: 'post',
    data: data
  })
}
