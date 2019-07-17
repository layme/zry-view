import axios from '@/libs/request'

export const savePrice = data => {
  return axios.request({
    url: '/price/savePrice.action',
    method: 'post',
    data: data
  })
}

export const getHidePriceType = data => {
  return axios.request({
    url: '/price/getHidePriceType.action',
    method: 'post',
    data: data
  })
}

export const getPriceMinDate = data => {
  return axios.request({
    url: '/price/getPriceMinDate.action',
    method: 'post',
    data: data
  })
}

export const listAdjustType = () => {
  return axios.request({
    url: '/price/listAdjustType.action',
    method: 'get'
  })
}

export const listProjectPriceType = () => {
  return axios.request({
    url: '/price/listProjectPriceType.action',
    method: 'get'
  })
}

export const listPrice = data => {
  return axios.request({
    url: '/price/listPrice.action',
    method: 'post',
    data: data
  })
}

export const listTimePrice = () => {
  return axios.request({
    url: '/timePrice/listTimePrice.action',
    method: 'get'
  })
}

export const saveTimePrice = data => {
  return axios.request({
    url: '/timePrice/saveTimePrice.action',
    method: 'post',
    data: data
  })
}

export const listPriceChangeLog = data => {
  return axios.request({
    url: '/priceChange/listPriceChangeLog.action',
    method: 'post',
    data: data
  })
}