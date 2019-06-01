import axios from '@/libs/api.request'

// 查询评价
export const getEvaluate = data => {
  return axios.request({
    url: '/evaluate/batch.action',
    method: 'get',
    params: data
  })
}

// 查询项目评分
export const getProjectScore = data => {
  return axios.request({
    url: '/evaluate/v1.action',
    method: 'get',
    params: {
      projectBid: data
    }
  })
}

// 屏蔽or展示评价
export const shieldValuate = data => {
  return axios.request({
    url: `/evaluate/${data.recordId}.action`,
    method: 'post',
    data: data
  })
}

// 回复评价
export const reply = data => {
  return axios.request({
    url: `/evaluate/${data.lowEvaluateRecordCode}.action`,
    method: 'post',
    data: data
  })
}

export const getLowEvaluate = data => {
  return axios.request({
    url: '/lowEvaluate/batch.action',
    method: 'get',
    params: data
  })
}

export const getFollowUp = data => {
  return axios.request({
    url: `/lowEvaluate/${data.lowEvaluateBid}.action`,
    method: 'get',
    params: data
  })
}

export const saveFollowUp = data => {
  return axios.request({
    url: `/lowEvaluate/${data.lowEvaluateBid}.action`,
    method: 'post',
    params: data
  })
}
