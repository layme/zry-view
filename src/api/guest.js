import axios from '@/libs/api.request'

//
export const getGuests = data => {
  return axios.request({
    url: '/guest/listGuest.action',
    method: 'get',
    params: data
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

// 特殊用户操作
export const addORemoveBlack = data => {
  return axios.request({
    url: '/guest/addORemoveBlack.action',
    method: 'post',
    data: data
  })
}

export const listRecord = data => {
  return axios.request({
    url: '/guest/listRecord.action',
    method: 'get',
    params: data
  })
}

export const listHobby = data => {
  return axios.request({
    url: '/guest/listHobby.action',
    method: 'get',
    params: {
      guestFid: data
    }
  })
}

export const saveTags = data => {
  return axios.request({
    url: '/guest/saveTags.action',
    method: 'post',
    data: data
  })
}

export const listEvent = data => {
  return axios.request({
    url: '/guest/listEvent.action',
    method: 'get',
    params: data
  })
}

export const addOrUpdateEvent = data => {
  return axios.request({
    url: '/guest/addOrUpdateEvent.action',
    method: 'post',
    data: data
  })
}

export const deleteEvent = data => {
  return axios.request({
    url: '/guest/deleteEvent.action',
    method: 'post',
    data: data
  })
}
