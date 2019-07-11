import axios from '@/libs/request'

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

// 禁言
export const addGagMember = (data) => {
  return axios.request({
    url: '/socialContact/addGagMember.action',
    method: 'post',
    data: data
  })
}

// 解禁
export const removeGagMember = (data) => {
  return axios.request({
    url: '/socialContact/removeGagMember.action',
    method: 'post',
    data: data
  })
}

// 踢出群聊
export const removeMember = (data) => {
  return axios.request({
    url: '/socialContact/removeGroupMembers.action',
    method: 'post',
    data: data
  })
}

// 设为管理员
export const addAdminMember = (data) => {
  return axios.request({
    url: '/socialContact/addAdminMember.action',
    method: 'post',
    data: data
  })
}

// 取消管理员
export const deleteAdminMember = (data) => {
  return axios.request({
    url: '/socialContact/deleteAdminMember.action',
    method: 'post',
    data: data
  })
}

// 设为群主
export const transferGroup = (data) => {
  return axios.request({
    url: '/socialContact/transferGroup.action',
    method: 'post',
    data: data
  })
}
