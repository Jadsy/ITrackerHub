import axios from 'axios'

const state = {
    Severities: [],
    Types: [],
    Statuses: [],
}

const getters = {
    Severities: (state) => state.Severities,
    Types: (state) => state.Types,
    Statuses:(state) => state.Statuses
}

const actions = {
    async getIssueStatus({ commit }) {
        const response = await axios
        .get('https://fadiserver.herokuapp.com/api/v1/my-status/');
        
        commit('setStatuses', response.data)
    },
    async getIssueSeverity({ commit }) {
        const response = await axios
        .get('https://fadiserver.herokuapp.com/api/v1/my-severities/')
        

        commit('setSeverities', response.data)
    },
    async getIssueType({ commit }) {
        const response = await axios
        .get('https://fadiserver.herokuapp.com/api/v1/my-types/')
        
        commit('setTypes', response.data)
    },
}

const mutations = {
    setSeverities: (state, Severities) => (state.Severities = Severities),
    setTypes: (state, Types) => (state.Types = Types),
    setStatuses: (state, Statuses) => (state.Statuses = Statuses)
}

export default {
    state,
    getters,
    actions,
    mutations
}