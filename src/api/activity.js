import axios from '@/libs/request'

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

// 保存优惠活动
export const saveActivity = (data) => {
  return axios.request({
    url: '/activity/saveActivity.action',
    method: 'post',
    data: data
  })
}

// 更新优惠活动
export const updateActivity = (activityBid, activityStatus) => {
  return axios.request({
    url: '/activity/updateActivity.action',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: {
      activityBid: activityBid,
      activityStatus: activityStatus
    }
  })
}
