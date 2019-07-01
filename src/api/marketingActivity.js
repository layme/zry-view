import axios from '@/libs/request'
// import { getToken } from '@/libs/util'

// 获取活动列表
export const getMarketingActivities = (data) => {
  return axios.request({
    url: '/marketingActivity/getMarketingActivities.action',
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

// 营销活动上下线
export const changeIsOnline = (data) => {
  return axios.request({
    method: 'post',
    url: '/marketingActivity/changeIsOnline.action',
    data: data
  })
}

// 删除营销活动
export const delActivity = (data) => {
  return axios.request({
    method: 'post',
    url: '/marketingActivity/del.action',
    params: data
  })
}

// 新增营销活动
export const createActivity = (data) => {
  return axios.request({
    method: 'post',
    url: '/marketingActivity/addMarketingActivity.action',
    data: data
  })
}

// 修改营销活动
export const updateActivity = (data) => {
  return axios.request({
    method: 'post',
    url: '/marketingActivity/updateMarketingActivity.action',
    data: data
  })
}
