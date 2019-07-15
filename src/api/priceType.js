import axios from '@/libs/request'

export const listPriceType = data => {
  return axios.request({
    url: '/priceType/listPriceType.action',
    method: 'get',
    params: data
  })
}

export const addOrUpdatePriceType = (data) => {
  return axios.request({
    url: '/priceType/addOrUpdatePriceType.action',
    method: 'post',
    data: data
  })
}

export const searchPriceType = (data) => {
  return axios.request({
    url: '/priceType/listPriceType.action',
    method: 'get',
    params: data
  })
}
