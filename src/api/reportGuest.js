import axios from '@/libs/request'

// 客群分析报表
export const getReport = data => {
  return axios.request({
    url: '/reportGuest/getReport.action',
    method: 'post',
    data: data
  })
}

// 客群数据报表
export const getGuestDataReport = data => {
  return axios.request({
    url: '/reportGuest/getGuestInfoReport.action',
    method: 'post',
    data: data
  })
}
