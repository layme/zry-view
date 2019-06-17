import axios from '@/libs/request'
// import { getToken } from '@/libs/util'

// 获取群聊列表
export const getGroups = (data) => {
  return axios.request({
    url: '/socialContact/getGroupsByProjectBid.action',
    method: 'post',
    data: data
  })
}

// 修改群聊
export const updateGroup = (data) => {
  return axios.request({
    url: '/socialContact/updateGroupByGroupId.action',
    method: 'post',
    data: data
  })
}

// 创建群聊
export const createGroup = (data) => {
  return axios.request({
    url: '/socialContact/createGroup.action',
    method: 'post',
    data: data
  })
}

// 创建群聊
export const removeGroup = (data) => {
  return axios.request({
    url: '/socialContact/removeGroupByGroupId.action',
    method: 'post',
    data: data
  })
}

// 获取成员列表
export const getMembers = (data) => {
  return axios.request({
    url: '/socialContact/getMembersByGroupBid.action',
    method: 'post',
    data: data
  })
}
