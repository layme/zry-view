import axios from '@/libs/request'

// 获取列表
export const getProjects = data => {
  return axios.request({
    url: '/project/getProjectList',
    method: 'post',
    data: data
  })
}

// 获取详情
export const getBaseInfo = data => {
  return axios.request({
    url: '/project/getProjectDetail',
    method: 'get',
    params: {
      projectBid: data
    }
  })
}

// 获取项目发布的进度信息
export const getProjectProgress = data => {
  return axios.request({
    url: '/project/getProjectProgress',
    method: 'get',
    params: {
      projectBid: data
    }
  })
}

// 保存数据
export const saveBase = data => {
  return axios.request({
    url: '/project/saveProject',
    method: 'post',
    data: data
  })
}

// 修改数据
export const updateBase = data => {
  return axios.request({
    url: '/project/updateProject',
    method: 'post',
    data: data
  })
}

// 启用或停用
export const validOrNot = (bid, val) => {
  return axios.request({
    url: '/project/validOrNot',
    method: 'post',
    data: {
      bid: bid,
      isValid: val
    }
  })
}

// 在App展示或隐藏
export const showOrNot = (bid, val) => {
  return axios.request({
    url: '/project/showOrNot',
    method: 'post',
    data: {
      bid: bid,
      isValid: val
    }
  })
}

// 在App可预定或禁止预定
export const canOrderOrNot = (bid, val) => {
  return axios.request({
    url: '/project/canOrderOrNot',
    method: 'post',
    data: {
      bid: bid,
      isValid: val
    }
  })
}

// 获取订单数据
export const getOrderInfoForSmartLock = data => {
  return axios.request({
    url: '/project/getOrderInfoForSmartLock',
    method: 'get',
    params: {
      orderNumber: data
    }
  })
}

// 获取订单数据
export const getProjectListAll = () => {
  return axios.request({
    url: '/project/getProjectListAll',
    method: 'get'
  })
}

// 查询密码
export const getPassword = () => {
  return axios.request({
    url: '/project/getPassword.action',
    method: 'get'
  })
}

// 查询待保洁床位数
export const getBedCountByStatus = () => {
  return axios.request({
    url: '/project/getBedCountByStatus.action',
    method: 'get'
  })
}
