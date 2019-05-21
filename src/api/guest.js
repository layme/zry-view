import axios from '@/libs/api.request'

// 特殊用户操作
export const getGuestInfo = data => {
  return axios.request({
    url: '/guest/getGuestDetail.action',
    method: 'get',
    params: {
      guestFid: data
    }
  })
}

// 特殊用户操作
export const addORemoveBlack = data => {
  return axios.request({
    url: '/guest/addORemoveBlack.action',
    method: 'post',
    data: data
  })
}

export const removeEvent = data => {
  return axios.request({
    url: '',
    method: 'post',
    data: data
  })
}
