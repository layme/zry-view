import axios from '@/libs/request'
import { getToken } from '@/libs/util'

export const login = ({ userName, password }) => {
  return axios.request({
    url: '/security/login',
    method: 'post',
    data: { userName, password }
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: '/security/userInfo',
    method: 'get'
  })
}

export const changeCurrentProject = (projectBid) => {
  return axios.request({
    url: '/security/changeCurrentProject',
    method: 'post',
    headers: { 'Authorization': getToken() || '', 'Content-Type': 'application/x-www-form-urlencoded' },
    params: {
      projectBid: projectBid
    }
  })
}

export const logout = () => {
  return axios.request({
    url: '/security/logout',
    method: 'post'
  })
}

export const getUnreadCount = data => {
  return axios.request({
    url: '/remind/listRemind.action',
    method: 'get',
    params: data
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const getUser = userName => {
  return axios.request({
    url: '/projectZO/getUser.action',
    method: 'get',
    params: {
      userName: userName
    }
  })
}

export const savePermission = data => {
  return axios.request({
    url: '/projectZO/save.action',
    method: 'post',
    data: data
  })
}

export const getPermission = data => {
  return axios.request({
    url: '/projectZO/getProjectZOList.action',
    method: 'post',
    data: data
  })
}

export const delPermission = data => {
  return axios.request({
    url: '/projectZO/delete.action',
    method: 'post',
    headers: { 'Authorization': getToken() || '', 'Content-Type': 'application/x-www-form-urlencoded' },
    params: {
      id: data
    }
  })
}
