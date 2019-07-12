import { listAdjustType, listProjectPriceType } from '@/api/price'
import { getCurrentHouseTypeList } from '@/api/houseType'

export default {
  state: {
    currentHouseTypeList: [],
    priceTypeList: [],
    checkedPriceType: [],
    adjustType: {}
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
    setCheckedPriceType (state, checkedPriceType) {
      state.checkedPriceType = checkedPriceType
    },
    pushCheckedPriceType (state, checkedPriceType) {
      state.checkedPriceType.push(checkedPriceType)
    },
    setAdjustType (state, adjustType) {
      state.adjustType = adjustType
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
    getPriceTypeList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        listProjectPriceType().then(res => {
          commit('setPriceTypeList', res.body)
          let count = 0
          let aa = []
          state.priceTypeList.forEach(v => {
            if (v.isHideHousePrice === 0) {
              if (count++ < 3) { aa.push(v.code) }
            }
          })
          commit('setCheckedPriceType', aa)
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
    }
  }
}
