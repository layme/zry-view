import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.devUrl : process.env.VUE_APP_BASEURL

const axios = new HttpRequest(baseUrl)
export default axios
