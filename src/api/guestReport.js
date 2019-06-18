import axios from '@/libs/request'

//
export const getReport = data => {
  return axios.request({
    url: '/reportGuest/getReport.action',
    method: 'post',
    data: data
  })
}

//
export const getGuestInfo = data => {
  return axios.request({
    url: '/guest/getGuestDetail.action',
    method: 'get',
    params: {
      guestFid: data
    }
  })
}
