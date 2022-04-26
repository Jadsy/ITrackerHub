import axios from 'axios'
import router from '@/router/index.js'
import { ref } from '@vue/composition-api'

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

    ProjectTypes: [],

    isAuthenticated: false,
    token: '',

    User: null,
    registerError: ref(),
}

const getters = {
    Project_Issues: (state) => state.issuesList,
    Project: (state) => state.Project,

    Severities: (state) => state.Severities,
    Types: (state) => state.Types,
    Statuses: (state) => state.Statuses,

    ProjectTypes: (state) => state.ProjectTypes,

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

    async getProjectTypes({ commit }, project_id) {
        const response = await axios
            .get('https://fadiserver.herokuapp.com/api/v1/my-types/?projectid=' + project_id).catch(error => {
                console.log(error)
            })

        commit('setProjectTypes', response.data)
    },
    async addCustomType({ commit }, { type, project_id }) {
        await axios.post('https://fadiserver.herokuapp.com/api/v1/my-types/?projectid=' + project_id, {
            title: type.title,
            needSeverity: type.hasSeverity,
            projectid: project_id,
            color: type.color
        }).catch(error => {
            console.log(error)
        })
    },

    async EditProjectType({ commit }, { type, project_id }) {
        await axios.post('https://fadiserver.herokuapp.com/api/v1/my-types/?id=' + type.id, {
            title: type.title,
            needSeverity: type.needSeverity,
            projectid: project_id,
            color: type.color
        }).catch(error => {
            console.log(error)
        })
        commit('updateProjectType', type)
    },

    async getIssueType({ commit }, project_id) {
        const response = await axios
            .get('https://fadiserver.herokuapp.com/api/v1/my-types/?projectid=' + project_id).catch(error => {
                console.log(error)
            })

        commit('setTypes', response.data)
    },

    async addIssue({ commit }, { _title, _description, _time_estimate, _projectid, _issue_type, _issue_status, _issue_severity, _is_complete }) {
        const response = await axios.post('https://fadiserver.herokuapp.com/api/v1/my-issues/', {
            title: _title,
            description: _description,
            time_estimate: _time_estimate,
            userid: state.User.id,
            projectid: _projectid,
            issueTypeId: _issue_type,
            issueStatusId: _issue_status,
            issueSeverityId: _issue_severity,
            isComplete: _is_complete
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

    //create an async method for signing up to an account
    async SignUp({ commit }, { username, password }) {
        const res = '';
        var err = 'no error';
        await axios.post('https://fadiserver.herokuapp.com/api/v1/users/', {
            username: username,
            password: password
        }).then(async response => {
            await axios.post('https://fadiserver.herokuapp.com/api/v1/my-profile/', {
                user: response.data.id
            })
        }).then(async response => {
            res = await axios.get('https://fadiserver.herokuapp.com/api/v1/my-profile/?id=' + response.data.id)
        }).catch(error => {
            err = error.response.data
        })
        commit('setUser', res.data)
        return err
    },

    async SignIn({ commit }, { username, password }) {
        var err = 'No Error';
        await axios.post('https://fadiserver.herokuapp.com/api/v1/auth/', {
            username: username,
            password: password
        }).then(async response => {
            commit('setUser', response.data)
        }).catch(error => {
            err = error.response.data
        })
        return err
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

    setProjectTypes: (state, ProjectTypes) => (state.ProjectTypes = ProjectTypes),
    updateProjectType: (state, ProjectType) => {
        const index = state.ProjectTypes.findIndex(type => type.id == ProjectType.id)
        if (index !== -1) {
            state.ProjectTypes.splice(index, 1, ProjectType)
        }
    },

    setStatuses: (state, Statuses) => (state.Statuses = Statuses),

    addComment: (state, IssueComments) => state.Issue_Comments.push(IssueComments),
    setIssueComments: (state, IssueComments) => state.Issue_Comments = IssueComments,
    resetIssueComments: (state) => state.Issue_Comments = [],
    deleteIssueComment: (state, Comment_ID) => state.Issue_Comments = state.Issue_Comments.filter(comment => comment.id !== Comment_ID),

    SetOpenIssues: (state) => { state.Open = state.issuesList.filter(x => x.issueStatus.title == 'Open') },
    SetInProgressIssues: (state) => { state.InProgress = state.issuesList.filter(x => x.issueStatus.title == 'In Progress') },
    SetClosedIssues: (state) => { state.Completed = state.issuesList.filter(x => x.issueStatus.title == 'Closed') },

    UpdateOpenIssues: (state, Open) => { state.Open = Open },
    UpdateInProgressIssues: (state, InProgress) => { state.InProgress = InProgress },
    UpdateCompletedIssues: (state, Completed) => { state.Completed = Completed },

    setUser: (state, user) => {
        state.User = user
        state.isAuthenticated = true
        state.registerError = ''
        localStorage.setItem('user', JSON.stringify(user))
        router.push('/dashboard')

    },

    //create a mutation for signing out
    SignOut: (state) => {
        state.User = null
        state.isAuthenticated = false
        localStorage.removeItem('user')
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}