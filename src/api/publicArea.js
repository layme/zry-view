import axios from '@/libs/request'
import { getToken } from '@/libs/util'

// 获取列表
export const getAreas = (data) => {
  return axios.request({
    url: '/area/getListRoomPage.action',
    method: 'post',
    data: data
  })
}

// 保存数据
export const saveArea = (data) => {
  return axios.request({
    url: '/area/save.action',
    method: 'post',
    data: data
  })
}

// 修改数据
export const updateArea = (data) => {
  return axios.request({
    url: '/area/updateArea.action',
    method: 'post',
    data: data
  })
}

// 删除数据
export const deleteArea = (data) => {
  return axios.request({
    url: '/area/deleteByBid.action',
    method: 'post',
    headers: { 'Authorization': getToken() || '', 'Content-Type': 'application/x-www-form-urlencoded' },
    params: {
      bid: data
    }
  })
}

// 启用或停用
export const validOrNot = (bid, isValid) => {
  return axios.request({
    url: '/area/validOrNot.action',
    method: 'post',
    headers: { 'Authorization': getToken() || '', 'Content-Type': 'application/x-www-form-urlencoded' },
    params: {
      bid: bid,
      isValid: isValid
    }
  })
}
