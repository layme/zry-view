import axios from 'axios'
import store from '@/store'
import { getToken } from '@/libs/util'
import { LoadingBar, Message, Modal } from 'iview'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'Authorization': getToken() || ''
      }
    }
    return config
  }
  destroy (url, isSuccess) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      if (isSuccess) {
        LoadingBar.finish()
      } else {
        LoadingBar.error()
      }
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的LoadingBar...
      if (!Object.keys(this.queue).length) {
        LoadingBar.start()
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(resp => {
      this.destroy(url, true)
      if (resp.data.code !== 200) {
        let message = resp.data.message ? resp.data.message : '系统异常'
        Message.warning(message)
      }
      return resp.data
    }, error => {
      this.destroy(url, false)
      this.catchError(error)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
  catchError (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          Modal.info({
            title: '通知',
            content: '登录已失效，传送至登录页面···',
            onOk: () => {
              delToken()
              store.dispatch('handleLogout')
              router.push({ name: 'login' })
            }
          })
          break
        case 403:
          Message.error('无访问权限，请联系企业管理员')
          break
        case 404:
          Message.error('请求资源不存在')
          break
        default:
          Message.error('服务异常，请稍后重试')
      }
    } else if (error.message === 'Network Error') {
      Message.error('网络错误')
    } else if (error.message.indexOf('timeout') !== -1) {
      Message.error('网络超时')
    } else {
      Message.error('未知错误')
    }
  }
}
export default HttpRequest
