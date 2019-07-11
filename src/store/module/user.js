import {
  login,
  logout,
  getUserInfo,
  changeCurrentProject
} from '@/api/user'
import { getRemindList } from '@/api/remind'
import { setToken, getToken } from '@/libs/util'
import { Message } from 'iview'

export default {
  state: {
    name: '',
    username: '',
    hlUser: '',
    phoneMobile: '',
    token: getToken(),
    access: [],
    unreadCount: 0,
    projectList: [],
    currentProject: {}
  },
  mutations: {
    setName (state, name) {
      state.name = name
    },
    setUsername (state, username) {
      state.username = username
    },
    setHlUser (state, hlUser) {
      state.hlUser = hlUser
    },
    setPhoneMobile (state, phoneMobile) {
      state.phoneMobile = phoneMobile
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setMessageCount (state, count) {
      state.unreadCount = count
    },
    setProjectList (state, projectList) {
      state.projectList = projectList
    },
    setCurrentProject (state, currentProject) {
      state.currentProject = currentProject
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password }) {
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          commit('setToken', res.body)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('setToken', '')
          commit('setName', '')
          commit('setUsername', '')
          commit('setHlUser', '')
          commit('setPhoneMobile', '')
          commit('setAccess', [])
          commit('setProjectList', [])
          commit('setCurrentProject', {})
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          const data = res.body
          commit('setName', data.name)
          commit('setUsername', data.username)
          commit('setHlUser', data.hlUser)
          commit('setPhoneMobile', data.phoneMobile)
          commit('setAccess', data.access)
          commit('setProjectList', data.projectList)
          commit('setCurrentProject', data.currentProject)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    changeCurrentProject ({ state, commit }, projectBid) {
      return new Promise((resolve, reject) => {
        changeCurrentProject(projectBid).then(res => {
          commit('setCurrentProject', state.projectList.find(item => item.bid === projectBid))
          Message.success('项目切换成功')
        })
      })
    },
    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    getUnreadMessageCount ({ state, commit }) {
      let dto = {
        isConfirm: 0,
        taskType: 1,
        pageIndex: 1,
        pageSize: 1
      }
      getRemindList(dto).then(res => {
        commit('setMessageCount', res.body.total)
      })
    }
  }
}
