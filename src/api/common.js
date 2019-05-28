import axios from '@/libs/api.request'

// 获取城市列表
export const getCityList = () => {
  return axios.request({
    url: '/project/getCity.action',
    method: 'get'
  })
}

// 获取区域列表
export const getAreaList = (data) => {
  return axios.request({
    url: '/project/getAreaByCity.action',
    method: 'get',
    params: {
      cityCode: data
    }
  })
}

// 获取业主列表
export const getOwnerList = () => {
  return axios.request({
    url: '/owner/ownerList',
    method: 'get'
  })
}

// 获取结算公司 暂时不用
export const getCompanyList = () => {
  return axios.request({
    url: '/**/**.action',
    method: 'get'
  })
}

// 示例：自定义 Content-Type
export const something = (data) => {
  return axios.request({
    url: '/api/*',
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: {
      key: data
    }
  })
}
