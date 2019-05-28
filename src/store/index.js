import Vue from 'vue'
import Vuex from 'vuex'

import user from './module/user'
import app from './module/app'
import order from './module/order'
import project from './module/project'
import guest from './module/guest'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    order,
    project,
    guest
  }
})
