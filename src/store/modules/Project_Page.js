import axios from 'axios'

const state = {
    issuesList: [],
    Project: ''
}

const getters = {
    Project_Issues: (state) => state.issuesList,
    Project: (state) => state.Project
}

const actions = {
    async fetchProjectIssueList({ commit }, projectid) {
        const response = await axios.get('https://fadiserver.herokuapp.com/api/v1/my-issues-titles/?projectid=' + projectid)
    
        commit('setProjectIssues', response.data)
    },

    async fetchProject({ commit }, projectid) {
        const response = await axios.get('https://fadiserver.herokuapp.com/api/v1/my-projects/?id=' + projectid)
    
        commit('setProject', response.data)
    },    
}

const mutations = {
    setProjectIssues: (state, issuesList) => (state.issuesList = issuesList),
    setProject: (state, Project) => (state.Project = Project[0])
}

export default {
    state,
    getters,
    actions,
    mutations
}