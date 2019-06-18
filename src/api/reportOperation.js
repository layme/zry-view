import axios from '@/libs/request'

// 核心指标达成情况
export const getReportCore = data => {
  return axios.request({
    url: '/reportOperation/getReportCore.action',
    method: 'get',
    params: data
  })
}

// occ表格数据
export const getReportCoreOCC = data => {
  return axios.request({
    url: '/reportOperation/getReportCoreOCC.action',
    method: 'get',
    params: data
  })
}

// occ折线数据
export const getLineReportCoreOCC = data => {
  return axios.request({
    url: '/reportOperation/getLineReportCoreOCC.action',
    method: 'get',
    params: data
  })
}

// 新订表格数据
export const getMonthNewOrderCount = data => {
  return axios.request({
    url: '/reportOperation/getMonthNewOrderCount.action',
    method: 'get',
    params: data
  })
}

// 新订折线数据
export const getChartNewOrderCount = data => {
  return axios.request({
    url: '/reportOperation/getChartNewOrderCount.action',
    method: 'get',
    params: data
  })
}
