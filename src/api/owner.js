import axios from '@/libs/api.request'

export const getOwners = (data) => {
  return axios.request({
    url: '/owner/ownerPageList.action',
    method: 'get',
    params: data
  })
}

export const saveOwner = (data) => {
  return axios.request({
    url: '/owner/saveOwner.action',
    method: 'post',
    data: data
  })
}

export const updateOwner = (data) => {
  return axios.request({
    url: '/owner/updateOwner.action',
    method: 'post',
    data: data
  })
}

export const removeOwner = (data) => {
  return axios.request({
    url: '/owner/updateOwner.action',
    method: 'post',
    data: data
  })
}
