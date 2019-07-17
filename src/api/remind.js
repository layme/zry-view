import axios from '@/libs/request'

export const getRemindList = data => {
  return axios.request({
    url: '/remind/listRemind.action',
    method: 'get',
    params: data
  })
}

export const confirmRemind = data => {
  return axios.request({
    url: '/remind/confirmRemind.action',
    method: 'post',
    data: data
  })
}
