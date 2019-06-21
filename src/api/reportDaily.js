import axios from '@/libs/request'

// 查询单日运营指标
export const getReportDaily = data => {
  return axios.request({
    url: '/reportDaily/reportDailyIndex.action',
    method: 'get',
    params: data
  })
}
