import axios from '@/libs/request'
// import { getToken } from '@/libs/util'

// 获取临时密码申请列表
export const getApplyPwd = (data) => {
  return axios.request({
    url: '/smartLock/getApplyPasswd.action',
    method: 'get',
    params: data
  })
}

// 保存临时密码
export const savePwd = (data) => {
  return axios.request({
    url: '/smartLock/save.action',
    method: 'post',
    data: data
  })
}

// 密码重制列表
export const getPwdRemakeList = (data) => {
  return axios.request({
    url: '/smartLock/getOrderPswLockList.action',
    method: 'post',
    data: data
  })
}

// 密码重制
export const resetOrderPassword = (data) => {
  return axios.request({
    url: '/smartLock/resetOrderPassword.action',
    method: 'post',
    data: data
  })
}

// 获取工作密码列表
export const getWorkPassword = (data) => {
  return axios.request({
    url: '/smartLock/getWorkPassword.action',
    method: 'get',
    params: data
  })
}

// 申请工作密码
export const applyWorkPassword = (data) => {
  return axios.request({
    url: '/smartLock/applyWorkPassword.action',
    method: 'post',
    data: data
  })
}

// 查询电量信息
export const getPowerInfo = (data) => {
  return axios.request({
    url: '/smartLock/getPowerInfo.action',
    method: 'get',
    params: data
  })
}
