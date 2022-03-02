import axios from 'axios'

const state = {
    issuesList: [],
}

const getters = {
    Project_Issues: (state) => state.issuesList
}

const actions = {
    async fetchProjectIssueList({ commit }, projectid) {
        const response = await axios.get('https://fadiserver.herokuapp.com/api/v1/my-issues-titles/?projectid=' + projectid)
    
        commit('setProjectIssues', response.data)
    },
}

const mutations = {
    setProjectIssues: (state, issuesList) => (state.issuesList = issuesList)
}

export default {
    state,
    getters,
    actions,
    mutations
}