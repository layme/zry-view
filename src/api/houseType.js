import axios from '@/libs/request'
import { getToken } from '@/libs/util'

// 获取列表
export const getHouseTypes = (data) => {
  return axios.request({
    url: '/houseType/getHouseTypeList.action',
    method: 'get',
    params: {
      projectBid: data
    }
  })
}

// 获取列表 by 房型分类
export const getHouseTypesByHouseSort = (data) => {
  return axios.request({
    url: '/houseType/getHouseTypeListByParentFid',
    method: 'get',
    params: {
      hosueTypeParentFid: data
    }
  })
}

// 保存数据
export const saveHouseType = (data) => {
  return axios.request({
    url: '/houseType/addHouseType.action',
    method: 'post',
    data: data
  })
}

// 修改数据
export const updateHouseType = (data) => {
  return axios.request({
    url: '/houseType/editHouseType.action',
    method: 'post',
    data: data
  })
}

// 删除数据
export const deleteHouseType = (data) => {
  return axios.request({
    url: '/houseType/deleteHouseType.action',
    method: 'post',
    headers: { 'Authorization': getToken() || '', 'Content-Type': 'application/x-www-form-urlencoded' },
    params: {
      houseTypeBid: data
    }
  })
}

// 获取床型列表
export const getBedTypeList = () => {
  return axios.request({
    url: '/houseType/getBedTypeList.action',
    method: 'get'
  })
}

// 展示或隐藏
export const showOrNot = (houseTypeBid, isShow) => {
  return axios.request({
    url: '/houseType/updateHouseTypeValid.action',
    method: 'post',
    headers: { 'Authorization': getToken() || '', 'Content-Type': 'application/x-www-form-urlencoded' },
    params: {
      houseTypeBid: houseTypeBid,
      isShow: isShow
    }
  })
}
