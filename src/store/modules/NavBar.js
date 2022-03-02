import axios from 'axios'

const state = {
  Projects: [],
  // ProjectsIssuesList: []
}

const getters = {
  ProjectList: (state) => state.Projects,

}

const actions = {
  async getProjectList({ commit }) {

    var projectList = []

    await axios
      .get('https://fadiserver.herokuapp.com/api/v1/my-projects/')
      .then(response => {
        projectList = response.data
      })

      .catch(error => {
        console.log(error)
      })

    commit('setProjects', projectList)
  },
}

const mutations = {
  setProjects: (state, Projects) => (state.Projects = Projects),
}

export default {
  state,
  getters,
  actions,
  mutations
}