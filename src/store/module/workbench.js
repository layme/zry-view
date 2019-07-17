import { getConfEnum } from '@/api/order'
import { getPassword, getBedCountByStatus } from '@/api/project'
import { getHouseTypeList, getStockWorkbench, getStockOfPerDay } from '@/api/stock'
import { getRefundCountByStatusAndFlag } from '@/api/refund'
import store from '@/store'

export default {
  state: {
    passwords: [],
    cleanCount: 0,
    stockOrderCount: 0,
    unStockOrderCount: 0,
    currentHouseType: {
      houseTypeName: '全部房型',
      houseTypeBid: ''
    },
    houseTypeList: [],
    stockData: [],
    workData: [],
    orderEnums: {},
    loading: false
  },
  mutations: {
    setPasswords (state, passwords) {
      state.passwords = passwords
    },
    setCleanCount (state, cleanCount) {
      state.cleanCount = cleanCount
    },
    setStockOrderCount (state, stockOrderCount) {
      state.stockOrderCount = stockOrderCount
    },
    setUnStockOrderCount (state, unStockOrderCount) {
      state.unStockOrderCount = unStockOrderCount
    },
    setCurrentHouseType (state, currentHouseType) {
      state.currentHouseType = currentHouseType
    },
    setHouseTypeList (state, houseTypeList) {
      state.houseTypeList = houseTypeList
    },
    setStockData (state, stockData) {
      state.stockData = stockData
    },
    setWorkData (state, workData) {
      state.workData = workData
    },
    setOrderEnums (state, orderEnums) {
      state.orderEnums = orderEnums
    },
    setLoading (state, loading) {
      state.loading = loading
    }
  },
  actions: {
    // 获取密码
    getPassword ({ commit }) {
      getPassword().then(res => {
        commit('setPasswords', res.body)
      })
    },
    // 待保洁数量
    getBedCountByStatus ({ commit }) {
      getBedCountByStatus().then(res => {
        commit('setCleanCount', res.body)
      })
    },
    getStockOrderCount ({ commit }) {
      getRefundCountByStatusAndFlag('yes').then(res => {
        commit('setStockOrderCount', res.body)
      })
      getRefundCountByStatusAndFlag('no').then(res => {
        commit('setUnStockOrderCount', res.body)
      })
    },
    // 房型列表
    getHouseTypeList ({ commit }) {
      getHouseTypeList(store.state.user.currentProject.bid).then(res => {
        commit('setHouseTypeList', res.body)
      })
    },
    // 每日库存
    getStockOfPerDay ({ commit }, dto) {
      getStockOfPerDay(dto).then(res => {
        commit('setStockData', res.body)
      })
    },
    // 工作台数据
    getStockWorkbench ({ commit }, dto) {
      commit('setLoading', true)
      getStockWorkbench(dto).then(res => {
        commit('setWorkData', res.body)
        commit('setLoading', false)
      }).catch(() => {
        commit('setLoading', false)
      })
    },
    // 订单渠道枚举值
    getOrderEnums ({ commit }) {
      getConfEnum().then(res => {
        commit('setOrderEnums', res.body)
      })
    }
  }
}