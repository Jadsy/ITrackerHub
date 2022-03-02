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
            console.log(error)
        })
        commit('setIssues', response.data)
    },

    async updateIssueStatus({ commit }, issue) {
        const response = await axios.post('https://fadiserver.herokuapp.com/api/v1/my-issues/?id=' + issue.id, issue).catch(error => {
            console.log(error)
        })

        commit('updateIssueStatus', response.data)
    },
}

const mutations = {
    setIssues: (state, Issues) => (state.Issues = Issues),
    updateIssueStatus: (state, Issue) => {
        const index = state.Issues.findIndex(is => is.id == Issue.id)
        if(index !== -1){
            state.Issue.splice(index, 1, Issue)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}