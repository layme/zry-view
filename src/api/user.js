import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: '/security/login.action',
    method: 'post',
    data: data
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: '/security/userInfo',
    method: 'get',
    params: {
      token
    }
  })
}

export const logout = (token) => {
  return axios.request({
    url: '/security/logout',
    method: 'post',
    headers: { 'Authorization': getToken() || '', 'Content-Type': 'application/x-www-form-urlencoded' },
    params: {
      token: token
    }
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: '/remind/listRemind.action',
    method: 'get'
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
