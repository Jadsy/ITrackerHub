import Vue from 'vue'
import Vuex from 'vuex'
import store from '../store'
import createPersistedState from 'vuex-persistedstate'
import ServerLink from './modules/ServerLink.js'


Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {},
  mutations: {},
  actions: {},
  modules: {
    ServerLink
  },
})
