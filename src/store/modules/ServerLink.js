import axios from 'axios'

const state = {
    Severities: [],
    Types: [],
    Statuses: [],
    Issue: '',
    Projects: [],
    issuesList: [],
    Project: '',
    Issue_Comments: [],
    Open: [],
    InProgress: [],
    Completed: [],

    isAuthenticated: false,
    token: '',


}

const getters = {
    Project_Issues: (state) => state.issuesList,
    Project: (state) => state.Project,

    Severities: (state) => state.Severities,
    Types: (state) => state.Types,
    Statuses: (state) => state.Statuses,

    Open: (state) => state.Open,
    InProgress: (state) => state.InProgress,
    Completed: (state) => state.Completed,

    Issue: (state) => state.Issue,
    ProjectList: (state) => state.Projects,

    IssueComments: (state) => state.Issue_Comments,
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



    async updateIssue({ commit }, issue) {
        const response = await axios.post('https://fadiserver.herokuapp.com/api/v1/my-issues/?id=' + issue.id, issue).catch(error => {
            console.log(error)
        })
        console.log(issue)
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
            title: _title,
            description: _description,
            time_estimate: _time_estimate,
            userid: 'f3260d22-8b5b-4c40-be1e-d93ba732c576',
            projectid: _projectid,
            issueTypeId: _issue_type,
            issueStatusId: _issue_status,
            issueSeverityId: _issue_severity,
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

    async addProject({ commit }, { _name, _repo_link, _members }) {
        const response = await axios.post('https://fadiserver.herokuapp.com/api/v1/my-projects/', {
            title: _name,
            repo_link: _repo_link,
            admin: 'f3260d22-8b5b-4c40-be1e-d93ba732c576',
            members: _members,
        })
            .catch(error => {
                console.log(error)
            })

        commit('addProject', response.data)
        return response.data.id
    },

    async deleteProject({ commit }, project_id) {
        await axios
            .delete('https://fadiserver.herokuapp.com/api/v1/my-projects/?id=' + project_id).catch(error => {
                console.log(error)
            })
        commit('deleteProject', project_id)
    },

    async addComment({ commit }, { _comment, _user_id, _issue_id }) {
        const response = await axios.post('https://fadiserver.herokuapp.com/api/v1/my-comments/', {
            userId: _user_id,
            issueId: _issue_id,
            comment: _comment
        })
            .catch(error => {
                console.log(error)
            })

        commit('addComment', response.data)
    },

    async fetchIssueComments({ commit }, _issue_id) {
        const response = await axios.get('https://fadiserver.herokuapp.com/api/v1/my-comments/?issueId=' + _issue_id)
            .catch(error => {
                console.log(error)
            })

        commit('setIssueComments', response.data)
    },

    async deleteIssueComment({ commit }, _comment_id) {
        await axios.delete('https://fadiserver.herokuapp.com/api/v1/my-comments/?id=' + _comment_id).catch(error => {
            console.log(error)
        })

        commit('deleteIssueComment', _comment_id)
    },

    async addUser({ commit }, { _username, _password, _email, _first_name, _last_name }) {
        const response = await axios.post('https://fadiserver.herokuapp.com/api/v1/users/', {
            username: _username,
            password: _password,
            email: _email,
            first_name: _first_name,
            last_name: _last_name
        })
            .catch(error => {
                console.log(error)
            })
        router.push('dashboard')
        //commit('addUser', response.data)
    },

    async LogIn({ commit }, { _email, _password }) {

        axios.defaults.headers.common["Authorization"] = ""
        localStorage.removeItem("token")
        const formData = {
            username: _email,
            password: _password
        }

        await axios
            .post('https://fadiserver.herokuapp.com/api/v1/token/login/', formData)
            .then(response => {
                const token = response.data.auth_token
                commit('setToken', token)
                console.log(localStorage.getItem("userid"))
                axios.defaults.headers.common["Authorization"] = "Token " + token
                localStorage.setItem("token", token)
                const toPath = this.$router.query.to || 'dashboard'
                this.$router.push(toPath)
            })
    }
}

const mutations = {
    setProjectIssues: (state, issuesList) => (state.issuesList = issuesList),
    ResetProjectIssues: (state) => (state.issuesList = []),

    setProject: (state, Project) => (state.Project = Project[0]),
    ResetProject: (state) => (state.Project = {}),
    SetCurrentProject: (state, Project) => {
        state.Project = Project
        localStorage.setItem('currentProject', JSON.stringify(Project))
    },

    setProjects: (state, Projects) => (state.Projects = Projects),
    addProject: (state, Project) => (state.Projects.push(Project)),
    deleteProject: (state, Project_ID) => { state.Projects.filter(project => project.id !== Project_ID) },

    addIssue: (state, Issue) => (state.issuesList.push(Issue)),
    deleteIssue: (state, Issue_ID) => state.issuesList.filter(issue => issue.id !== Issue_ID),
    setIssue: (state, Issue) => { state.Issue = Issue },
    resetIssue: (state) => (state.Issue = {}),
    updateIssue: (state, Issue) => {
        const index = state.issuesList.findIndex(is => is.id == Issue.id)
        if (index !== -1) {
            state.issuesList.splice(index, 1, Issue)
        }
    },

    setSeverities: (state, Severities) => (state.Severities = Severities),
    setTypes: (state, Types) => (state.Types = Types),
    setStatuses: (state, Statuses) => (state.Statuses = Statuses),

    addComment: (state, IssueComments) => state.Issue_Comments.push(IssueComments),
    setIssueComments: (state, IssueComments) => state.Issue_Comments = IssueComments,
    resetIssueComments: (state) => state.Issue_Comments = [],
    deleteIssueComment: (state, Comment_ID) => state.Issue_Comments.filter(comment => comment.id !== Comment_ID),

    SetOpenIssues: (state) => { console.log("Set Open Issues"), state.Open = state.issuesList.filter(x => x.issueStatus == 'Open') },
    SetInProgressIssues: (state) => { console.log("Set In Progress Issues"), state.InProgress = state.issuesList.filter(x => x.issueStatus == 'In Progress') },
    SetClosedIssues: (state) => { console.log("Set Closed Issue"), state.Completed = state.issuesList.filter(x => x.issueStatus == 'Closed') },

    UpdateOpenIssues: (state, Open) => { console.log("Updated Open Issues"), state.Open = Open },
    UpdateInProgressIssues: (state, InProgress) => { console.log("Updated In Progress Issues"), state.InProgress = InProgress },
    UpdateCompletedIssues: (state, Completed) => { console.log("Updated Completed Issues"), state.Completed = Completed },

    ResetOpenIssues: (state) => { console.log("Reset Open Issues"), state.Open = [] },
    ResetInProgressIssues: (state) => { console.log("Reset In Progress Issues"), state.InProgress = [] },
    ResetCompletedIssues: (state) => { console.log("Reset Completed Issues"), state.Completed = [] },

    initializeStore(state) {
        if (localStorage.getItem('token')) {
            state.token = localStorage.getItem('token')
            state.isAuthenticated = true
        } else {
            state.token = ''
            state.isAuthenticated = false
        }

    },

    setToken(state, token) {
        state.token = token
        state.isAuthenticated = true
    },

    removeToken(state) {
        state.token = ''
        state.isAuthenticated = false
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}