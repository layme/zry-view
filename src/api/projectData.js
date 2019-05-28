import axios from '@/libs/api.request'

// 获取列表
export const getData = (data) => {
  return axios.request({
    url: '/project/findProjectAtt',
    method: 'get',
    params: {
      projectBid: data
    }
  })
}

// 保存数据
export const saveData = (data) => {
  return axios.request({
    url: '/project/saveProjectData',
    method: 'post',
    data: data
  })
}

// 删除数据
export const deleteData = (data) => {
  return axios.request({
    url: '/project/delProjectAtt',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: {
      attBid: data
    }
  })
}
