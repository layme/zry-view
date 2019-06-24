import axios from '@/libs/request'
// import { getToken } from '@/libs/util'

// 获取列表
export const getHouseTypeList = (data) => {
  return axios.request({
    url: '/stock/getHouseTypeList.action',
    method: 'get',
    params: {
      projectBid: data
    }
  })
}

// 获取列表
export const getStock = (data) => {
  return axios.request({
    url: '/stock/listStock.action',
    method: 'get',
    params: data
  })
}
