import { listAdjustType, listProjectPriceType } from '@/api/price'
import { getPriceTypeNames } from '@/api/priceType'
import { getCurrentHouseTypeList } from '@/api/houseType'

export default {
  state: {
    currentHouseTypeList: [],
    priceTypeList: [],
    adjustType: {},
    weekOptions: [
      {
        label: '周一',
        value: 2
      },
      {
        label: '周二',
        value: 3
      },
      {
        label: '周三',
        value: 4
      },
      {
        label: '周四',
        value: 5
      },
      {
        label: '周五',
        value: 6
      },
      {
        label: '周六',
        value: 7
      },
      {
        label: '周日',
        value: 1
      }
    ],
    priceTypeNames: []
  },
  mutations: {
    setCurrentHouseTypeList (state, currentHouseTypeList) {
      state.currentHouseTypeList = currentHouseTypeList
    },
    setPriceTypeList (state, priceTypeList) {
      state.priceTypeList = priceTypeList
    },
    pushPriceTypeList (state, priceTypeList) {
      state.priceTypeList.push(priceTypeList)
    },
    setAdjustType (state, adjustType) {
      state.adjustType = adjustType
    },
    setPriceTypeNames (state, priceTypeNames) {
      state.priceTypeNames = priceTypeNames
    }
  },
  actions: {
    getCurrentHouseType ({ commit }) {
      return new Promise((resolve, reject) => {
        getCurrentHouseTypeList().then(res => {
          commit('setCurrentHouseTypeList', res.body)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getPriceTypeList ({ commit }) {
      return new Promise((resolve, reject) => {
        listProjectPriceType().then(res => {
          commit('setPriceTypeList', res.body)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getAdjustTypeList ({ commit }) {
      return new Promise((resolve, reject) => {
        listAdjustType().then(res => {
          commit('setAdjustType', res.body)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getPriceTypeNames ({ commit }) {
      return new Promise((resolve, reject) => {
        getPriceTypeNames().then(res => {
          commit('setPriceTypeNames', res.body)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
