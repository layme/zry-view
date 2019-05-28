import axios from '@/libs/api.request'

// 获取列表
export const getBuildings = (data) => {
  return axios.request({
    url: '/building/getBuildingList',
    method: 'get',
    params: {
      projectFid: data
    }
  })
}

// 保存数据
export const saveBuilding = (data) => {
  return axios.request({
    url: '/building/saveBuilding',
    method: 'post',
    data: data
  })
}

// 修改数据
export const updateBuilding = (data) => {
  return axios.request({
    url: '/building/updateBuilding',
    method: 'post',
    data: data
  })
}

// 删除数据
export const deleteBuilding = (data) => {
  return axios.request({
    url: '/building/deleteBuilding',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: {
      buildingFid: data
    }
  })
}
