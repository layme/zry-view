import axios from '@/libs/api.request'

export const getOrders = (data) => {
  return axios.request({
    url: '/order/listOrder.action',
    method: 'get',
    params: data
  })
}

export const orderDetail = (data) => {
  return axios.request({
    url: '/order/orderDetail.action',
    method: 'get',
    params: {
      orderNumber: data
    }
  })
}

export const saveOrderRemark = (data) => {
  return axios.request({
    url: '/order/saveOrderRemark.action',
    method: 'post',
    data: data
  })
}

export const getOrderRemark = (data) => {
  return axios.request({
    url: '/order/getOrderRemark',
    method: 'get',
    params: {
      orderBid: data
    }
  })
}

export const saveStayPerson = (data) => {
  return axios.request({
    url: '/order/saveStayPerson.action',
    method: 'post',
    data: data
  })
}
