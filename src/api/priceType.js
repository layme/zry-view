import axios from '@/libs/request'

export const listPriceType = data => {
  return axios.request({
    url: '/priceType/listPriceType.action',
    method: 'post',
    data: data
  })
}

export const addOrUpdatePriceType = data => {
  return axios.request({
    url: '/priceType/addOrUpdatePriceType.action',
    method: 'post',
    data: data
  })
}

export const getPriceTypeNames = () => {
  return axios.request({
    url: '/priceType/getPriceTypeNames.action',
    method: 'get'
  })
}

export const setIsInvalid = (fid, status) => {
  return axios.request({
    url: '/priceType/setIsInvalid.action',
    method: 'post',
    data: {
      fid: fid,
      status: status
    }
  })
}

export const generatePrice = data => {
  return axios.request({
    url: '/priceType/generatePrice.action',
    method: 'post',
    data: data
  })
}
