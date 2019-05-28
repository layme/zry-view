import axios from '@/libs/api.request'

// 获取列表
export const getHouseSorts = (data) => {
  return axios.request({
    url: '/houseTypeParent/getHouseTypeParentList',
    method: 'get',
    params: {
      projectBid: data
    }
  })
}

// 保存数据
export const saveHouseSort = (data) => {
  return axios.request({
    url: '/houseTypeParent/addHouseTypeParent',
    method: 'post',
    data: data
  })
}

// 修改数据
export const updateHouseSort = (data) => {
  return axios.request({
    url: '/houseTypeParent/updateHouseTypeParent.action',
    method: 'post',
    data: data
  })
}

// 删除数据
export const deleteHouseSort = (data) => {
  return axios.request({
    url: '/houseTypeParent/deleteHouseTypeParent',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: {
      houseTypeParentBid: data
    }
  })
}

// 展示或隐藏
export const showOrNot = (bid, isShow) => {
  return axios.request({
    url: '/houseTypeParent/isShow.action',
    method: 'post',
    params: {
      bid: bid,
      isShow: isShow
    }
  })
}
