import axios from 'axios'

const state = {
    Severities: [],
    Types: [],
    Statuses: [],
    Issues: [],
    Issue: '',
    Projects: [],
    issuesList: [],
    Project: ''
}

const getters = {
    Project_Issues: (state) => state.issuesList,
    Project: (state) => state.Project,

    Severities: (state) => state.Severities,
    Types: (state) => state.Types,
    Statuses: (state) => state.Statuses,

    Open: (state) => state.Issues.filter(x => x.issueStatus == 'Open'),
    InProgress: (state) => state.Issues.filter(x => x.issueStatus == 'In Progress'),
    Completed: (state) => state.Issues.filter(x => x.issueStatus == 'Closed'),

    Issue: (state) => state.Issue,
    ProjectList: (state) => state.Projects
}

const actions = {
    async fetchProjectIssueList({ commit }, projectid) {
        const response = await axios.get('https://fadiserver.herokuapp.com/api/v1/my-issues-titles/?projectid=' + projectid).catch(error => {
            console.log(error)
        })
        commit('setProjectIssues', response.data)
    },

    async fetchProject({ commit }, projectid) {
        const response = await axios.get('https://fadiserver.herokuapp.com/api/v1/my-projects/?id=' + projectid).catch(error => {
            console.log(error)
        })
        commit('setProject', response.data)
    },

    async getProjectList({ commit }) {
        var projectList = await axios.get('https://fadiserver.herokuapp.com/api/v1/my-projects/')
            .catch(error => {
                console.log(error)
            })
        commit('setProjects', projectList.data)
    },

    async fetchIssue({ commit }, issue_id) {
        const response = await axios.get('https://fadiserver.herokuapp.com/api/v1/my-issues-titles/?id=' + issue_id).catch(error => {
            console.log(error)
        })
        commit('setIssue', response.data[0])
    },

    async fetchIssuesofProject({ commit }, projectid) {
        const response = await axios.get('https://fadiserver.herokuapp.com/api/v1/my-issues-titles/?projectid=' + projectid).catch(error => {
            console.log(error)
        })
        commit('setIssues', response.data)
    },

    async updateIssue({ commit }, issue) {
        const response = await axios.post('https://fadiserver.herokuapp.com/api/v1/my-issues/?id=' + issue.id, issue).catch(error => {
            console.log(error)
        })
        console.log(response.data)
        commit('updateIssue', response.data)
    },

    async getIssueStatus({ commit }) {
        const response = await axios
            .get('https://fadiserver.herokuapp.com/api/v1/my-status/').catch(error => {
                console.log(error)
            });

        commit('setStatuses', response.data)
    },

    async getIssueSeverity({ commit }) {
        const response = await axios
            .get('https://fadiserver.herokuapp.com/api/v1/my-severities/').catch(error => {
                console.log(error)
            })


        commit('setSeverities', response.data)
    },
    async getIssueType({ commit }) {
        const response = await axios
            .get('https://fadiserver.herokuapp.com/api/v1/my-types/').catch(error => {
                console.log(error)
            })

        commit('setTypes', response.data)
    },

    async addIssue({ commit }, { _title, _description, _time_estimate, _projectid, _issue_type, _issue_status, _issue_severity }) {
        const response = await axios.post('https://fadiserver.herokuapp.com/api/v1/my-issues/', {
            title:_title,
            description:_description,
            time_estimate:_time_estimate,
            userid: 'f3260d22-8b5b-4c40-be1e-d93ba732c576',
            projectid:_projectid,
            issueTypeId:_issue_type,
            issueStatusId:_issue_status,
            issueSeverityId:_issue_severity,
          })
            .catch(error => {
                console.log(error)
            })

        commit('addIssue', response.data)
    },

    async deleteIssue({ commit }, issue_id) {
        await axios
            .delete('https://fadiserver.herokuapp.com/api/v1/my-issues/?id=' + issue_id).catch(error => {
                console.log(error)
            })
        commit('deleteIssue', issue_id)
    },
}

const mutations = {
    setProjectIssues: (state, issuesList) => (state.issuesList = issuesList),
    setProject: (state, Project) => (state.Project = Project[0]),
    setIssues: (state, Issues) => (state.Issues = Issues),
    setIssue: (state, Issue) => (state.Issue = Issue),

    updateIssue: (state, Issue) => {
        const index = state.Issues.findIndex(is => is.id == Issue.id)
        if (index !== -1) {
            state.Issues.splice(index, 1, Issue)
        }
    },

    setProjects: (state, Projects) => (state.Projects = Projects),
    setSeverities: (state, Severities) => (state.Severities = Severities),
    setTypes: (state, Types) => (state.Types = Types),
    setStatuses: (state, Statuses) => (state.Statuses = Statuses),
    addIssue: (state, Issue) => (state.Issues.push(Issue)),
    deleteIssue: (state, Issue_ID) => state.Issues.filter(issue => issue.id !== Issue_ID)
}

export default {
    state,
    getters,
    actions,
    mutations
}