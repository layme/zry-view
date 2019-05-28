import axios from '@/libs/api.request'

// 获取列表
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
