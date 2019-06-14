import axios from '@/libs/request'

export const getOwners = (data) => {
  return axios.request({
    url: '/owner/ownerPageList.action',
    method: 'post',
    data: data
  })
}

// 获取业主列表
export const getOwnerList = () => {
  return axios.request({
    url: '/owner/ownerList',
    method: 'get'
  })
}

export const saveOwner = (data) => {
  return axios.request({
    url: '/owner/saveOwner.action',
    method: 'post',
    data: data
  })
}

export const updateOwner = (data) => {
  return axios.request({
    url: '/owner/updateOwner.action',
    method: 'post',
    data: data
  })
}

export const removeOwner = (data) => {
  return axios.request({
    url: '/owner/updateOwner.action',
    method: 'post',
    data: data
  })
}
