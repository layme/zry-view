import axios from '@/libs/api.request'

// 查询维修单列表
export const getRepair = data => {
  return axios.request({
    url: '/repair/getRepairOrderList.action',
    method: 'post',
    data: data
  })
}

// 特殊用户操作
export const saveRepair = data => {
  return axios.request({
    url: '/repair/saveRepairOrder.action',
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

export const getRooms = data => {
  return axios.request({
    url: '/repair/getRoomListByProject.action',
    method: 'get',
    params: {
      projectId: data
    }
  })
}

export const getDesc = data => {
  return axios.request({
    url: '/repair/getMaintenanceVisualization.action',
    method: 'get',
    params: {
      goodsCode: data
    }
  })
}

export const getCancelReasons = () => {
  return axios.request({
    url: '/repair/getCancelReason.action',
    method: 'get'
  })
}

export const cancelRepair = (data) => {
  return axios.request({
    url: '/repair/cancel.action',
    method: 'post',
    data: data
  })
}

export const getDetail = (data) => {
  return axios.request({
    url: '/repair/getRepairOrderDetail.action',
    method: 'get',
    params: {
      billNum: data
    }
  })
}
