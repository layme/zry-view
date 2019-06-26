import axios from '@/libs/request'

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

// 请求导出文件
export const requestExportFile = data => {
  return axios.request({
    url: '/system/requestExportFile.action',
    method: 'post',
    data: data
  })
}

// 查询导出文件进度
export const getExportProcess = key => {
  return axios.request({
    url: '/system/getExportProcess',
    method: 'get',
    params: {
      key: key
    }
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
