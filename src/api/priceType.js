import axios from '@/libs/request'

export const getRemindList = data => {
  return axios.request({
    url: '/priceType/listPriceType.action',
    method: 'get',
    params: data
  })
}
