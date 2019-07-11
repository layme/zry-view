import axios from '@/libs/request'

// 获取列表
export const getHouseTypeList = data => {
  return axios.request({
    url: '/stock/getHouseTypeList.action',
    method: 'get',
    params: {
      projectBid: data
    }
  })
}

// 获取列表
export const getStock = data => {
  return axios.request({
    url: '/stock/listStock.action',
    method: 'get',
    params: data
  })
}

// 获取工作台数据
export const getStockWorkbench = data => {
  return axios.request({
    url: '/stock/getStockWorkbench.action',
    method: 'post',
    data: data
  })
}

// 获取每天的库存数据
export const getStockOfPerDay = data => {
  return axios.request({
    url: '/stock/getStockOfPerDay.action',
    method: 'post',
    data: data
  })
}

// 锁定床位
export const lockBedStock = data => {
  return axios.request({
    url: '/stock/lockBedStock.action',
    method: 'post',
    data: data
  })
}

// 获取床位锁定信息
export const getLockBedStock = data => {
  return axios.request({
    url: '/stock/getLockBedStock.action',
    method: 'get',
    params: {
      lockBedBid: data
    }
  })
}

// 获取床位锁定信息
export const unLockBedStock = data => {
  return axios.request({
    url: '/stock/unLockBedStock.action',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: {
      lockBedBid: data
    }
  })
}

// 更新床位状态
export const updStockStatus = data => {
  return axios.request({
    url: '/stock/updStockStatus.action',
    method: 'post',
    data: data
  })
}
