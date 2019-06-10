import axios from '@/libs/api.request'

export const getOrders = (data) => {
  return axios.request({
    url: '/order/listOrder.action',
    method: 'get',
    params: data
  })
}
