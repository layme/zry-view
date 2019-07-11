import axios from '@/libs/request'

// 获取列表
export const getRooms = (data) => {
  return axios.request({
    url: '/room/getListRoomPage.action',
    method: 'post',
    data: data
  })
}

// 保存数据
export const saveRoom = (data) => {
  return axios.request({
    url: '/room/save.action',
    method: 'post',
    data: data
  })
}

// 修改数据
export const updateRoom = (data) => {
  return axios.request({
    url: '/room/updateRoom.action',
    method: 'post',
    data: data
  })
}

// 删除数据
export const deleteRoom = (data) => {
  return axios.request({
    url: '/room/deleteByBid.action',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: {
      bid: data
    }
  })
}
