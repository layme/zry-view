import axios from '@/libs/request'

// 获取优惠券列表
export const listCoupon = (data) => {
  return axios.request({
    url: '/coupon/search.action',
    method: 'post',
    data: data
  })
}

// 获取优惠券详情
export const getTicketDetail = (data) => {
  return axios.request({
    url: '/coupon/getTicketDetail',
    method: 'get',
    params: {
      ticketBid: data
    }
  })
}
