import axios from '@/libs/request'

export const getOrders = data => {
  return axios.request({
    url: '/order/listOrder.action',
    method: 'post',
    data: data
  })
}

export const orderDetail = data => {
  return axios.request({
    url: '/order/orderDetail.action',
    method: 'get',
    params: {
      orderNumber: data
    }
  })
}

export const saveOrderRemark = data => {
  return axios.request({
    url: '/order/saveOrderRemark.action',
    method: 'post',
    data: data
  })
}

export const getOrderRemark = data => {
  return axios.request({
    url: '/order/getOrderRemark',
    method: 'get',
    params: {
      orderBid: data
    }
  })
}

export const saveStayPerson = data => {
  return axios.request({
    url: '/order/saveStayPerson.action',
    method: 'post',
    data: data
  })
}

export const unbindBed = data => {
  return axios.request({
    url: '/order/unbindBed.action',
    method: 'post',
    data: data
  })
}

export const changeBed = data => {
  return axios.request({
    url: '/order/changeBed.action',
    method: 'post',
    data: data
  })
}

export const cancelBookBed = data => {
  return axios.request({
    url: '/order/cancelBookBed.action',
    method: 'post',
    data: data
  })
}

export const updateOrderPhone = data => {
  return axios.request({
    url: '/order/updateOrderPhone.action',
    method: 'post',
    data: data
  })
}

export const checkInOrder = data => {
  return axios.request({
    url: '/order/checkInOrder.action',
    method: 'post',
    data: data
  })
}

export const checkOutOrder = data => {
  return axios.request({
    url: '/order/checkOutOrder.action',
    method: 'post',
    data: data
  })
}

export const generateLockPwd = data => {
  return axios.request({
    url: '/order/generateLockPwd.action',
    method: 'post',
    data: data
  })
}

export const getOrderRecord = data => {
  return axios.request({
    url: '/order/getOrderRecord.action',
    method: 'get',
    params: {
      orderBid: data
    }
  })
}

export const getOrderPayDetail = data => {
  return axios.request({
    url: '/order/getOrderPayDetail.action',
    method: 'get',
    params: data
  })
}
