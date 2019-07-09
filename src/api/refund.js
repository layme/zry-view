import axios from '@/libs/request'
import { getToken } from '@/libs/util'

export const getRefundList = data => {
  return axios.request({
    url: '/refund/listNewRefund.action',
    method: 'post',
    data: data
  })
}

export const getRefundCountByStatusAndFlag = data => {
  return axios.request({
    url: '/refund/getRefundCountByStatusAndFlag.action',
    method: 'get',
    params: {
      flag: data
    }
  })
}

export const getOrderRefund = data => {
  return axios.request({
    url: '/order/getOrderRefund.action',
    method: 'get',
    params: {
      orderBid: data
    }
  })
}

export const getCheckOutData = data => {
  return axios.request({
    url: '/order/getCheckOutData.action',
    method: 'get',
    params: data
  })
}

export const updateRefundDetailByBid = data => {
  return axios.request({
    url: '/refund/updateRefundDetailByBid.action',
    method: 'post',
    data: data
  })
}

export const editFeeAmount = data => {
  return axios.request({
    url: '/refund/editFeeAmount.action',
    method: 'post',
    data: data
  })
}

export const getAllFeeAmount = data => {
  return axios.request({
    url: '/order/getAllFeeAmount.action',
    method: 'get',
    params: {
      orderBid: data
    }
  })
}

export const saveOrderRefundInfo = data => {
  return axios.request({
    url: '/order/saveOrderRefundInfo.action',
    method: 'post',
    data: data
  })
}

export const submitRefundCheck = (orderBid, orderStatus) => {
  return axios.request({
    url: '/order/submitRefundCheck.action',
    method: 'post',
    headers: { 'Authorization': getToken() || '', 'Content-Type': 'application/x-www-form-urlencoded' },
    params: {
      orderBid: orderBid,
      orderStatus: orderStatus
    }
  })
}
