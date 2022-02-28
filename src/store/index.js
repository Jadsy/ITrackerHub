import Vue from 'vue'
import Vuex from 'vuex'
import Kanban from './modules/Kanban.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Kanban
  },
})
