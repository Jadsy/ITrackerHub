import axios from 'axios'

const state = {
    Issues: [],
}

const getters = {
    Open: (state) => state.Issues.filter(x => x.issueStatus == 'Open'),
    InProgress: (state) => state.Issues.filter(x => x.issueStatus == 'In Progress'),
    Completed: (state) => state.Issues.filter(x => x.issueStatus == 'Closed'),
}

const actions = {
    async fetchIssuesofProject({ commit }, projectid) {
        const response = await axios.get('https://fadiserver.herokuapp.com/api/v1/my-issues-titles/?projectid=' + projectid).catch(error => {
            console.log(erroe)
        })
        commit('setIssues', response.data)
    },
}

const mutations = {
    setIssues: (state, Issues) => (state.Issues = Issues)
}

export default {
    state,
    getters,
    actions,
    mutations
}