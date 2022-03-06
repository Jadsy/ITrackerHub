import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Kanban from './modules/Kanban.js'
import Project_Page from './modules/Project_Page.js'
import NavBar from './modules/NavBar.js'
import Add_Issue from './modules/Add_Issue.js'


Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Kanban,
    Project_Page,
    NavBar,
    Add_Issue
  },
})
