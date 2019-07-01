import axios from '@/libs/request'

export const getRefundList = (data) => {
  return axios.request({
    url: '/refund/listNewRefund.action',
    method: 'get',
    params: {
      data
    }
  })
}

export const getOrderss = (data) => {
  return axios.request({
    url: '/order/listOrder.action',
    method: 'post',
    data: data
  })
}
