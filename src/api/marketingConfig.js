import axios from '@/libs/request'

export const labelList = (params) => {
  return axios.request({
    url: '/labelConfig/list',
    method: 'get',
    params
  })
}

export const labelremove = (params) => {
  return axios.request({
    url: '/labelConfig/remove',
    method: 'get',
    params
  })
}

export const getConfigImg = (params) => {
  return axios.request({
    url: '/labelConfig/getConfigImg',
    method: 'get',
    params
  })
}

export const editConfigImg = (data) => {
  return axios.request({
    url: '/labelConfig/editConfigImg',
    method: 'post',
    data: data
  })
}

export const projectConfigList = (params) => {
  return axios.request({
    url: '/projectConfig/projectConfigList',
    method: 'get',
    params
  })
}

export const editAddImgConfig = (data) => {
  return axios.request({
    url: '/labelConfig/edit',
    method: 'post',
    data: data
  })
}

export const selectProjectFacilities = (params) => {
  return axios.request({
    url: '/projectConfig/selectProjectFacilities',
    method: 'get',
    params
  })
}

export const saveProjectFacilities = (data) => {
  return axios.request({
    url: '/projectConfig/saveProjectFacilities',
    method: 'post',
    data: data
  })
}

export const getProjectConfigInfo = (data) => {
  return axios.request({
    url: '/projectConfig/getProjectConfigInfo',
    method: 'post',
    params: data
  })
}

export const updateProjectConfigInfo = (data) => {
  return axios.request({
    url: '/projectConfig/updateProjectConfigInfo',
    method: 'post',
    data: data
  })
}

export const getHouseTypeConfigList = (params) => {
  return axios.request({
    url: '/houseTypeConfig/getHouseTypeConfigList',
    method: 'get',
    params
  })
}
