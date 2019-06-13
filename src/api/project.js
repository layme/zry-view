import axios from '@/libs/api.request'

// 获取列表
export const getProjects = (data) => {
  return axios.request({
    url: '/project/getProjectList',
    method: 'get',
    params: data
  })
}

// 获取详情
export const getBaseInfo = (data) => {
  return axios.request({
    url: '/project/getProjectDetail',
    method: 'get',
    params: {
      projectBid: data
    }
  })
}

// 保存数据
export const saveBase = (data) => {
  return axios.request({
    url: '/project/saveProject',
    method: 'post',
    data: data
  })
}

// 修改数据
export const updateBase = (data) => {
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
