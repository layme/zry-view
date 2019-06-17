import HttpRequest from '@/libs/axios'
import config from '@/config'
// import store from '@/store'

const baseUrl = process.env.NODE_ENV === 'development' ? config.devUrl : process.env.VUE_APP_BASEURL
const axios = new HttpRequest(baseUrl)
// store.commit('setBaseUrl', baseUrl)
export default axios