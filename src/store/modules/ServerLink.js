import axios from 'axios'
import router from '@/router/index.js'
import defaultState from '@/store/modules/DefaultState.js'

const state = {
    Severities: [],
    Types: [],
    Statuses: [],
    Issue: '',
    Projects: [],
    issuesList: [],
    myIssues: [],
    QuickIssues: [],
    Project: '',
    Issue_Comments: [],
    Open: [],
    InProgress: [],
    Completed: [],

    ProjectTypes: [],

    isAuthenticated: false,
    User: null,
    userName: '',
}

const getters = {
    Project_Issues: (state) => state.issuesList,
    My_Issues: (state) => state.myIssues,
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

    User: (state) => state.User,
    UserName: (state) => state.userName,

}

const actions = {
    async fetchProjectIssueList({ commit }, projectid) {
        const response = await axios.get('https://fadiserver.herokuapp.com/api/v1/my-issues-titles/?projectid=' + projectid).catch(error => {
            console.log(error)
        })
        commit('setProjectIssues', response.data)
    },

    async fetchMyIssues({ commit, state }) {
        const response = await axios.get('https://fadiserver.herokuapp.com/api/v1/my-issues-titles/?userid=' + state.User.id).catch(error => { console.log(error) })
        commit('setMyIssues', response.data)
    },

    async fetchProject({ commit }, projectid) {
        const response = await axios.get('https://fadiserver.herokuapp.com/api/v1/my-projects/?id=' + projectid).catch(error => {
            console.log(error)
        })
        commit('setProject', response.data)
    },

    async getProjectList({ commit, state }) {
        return await axios.get('https://fadiserver.herokuapp.com/api/v1/my-projects/?userid=' + state.User.id).then(response => {
            commit('setProjects', response.data)
        })
            .catch(error => {
                console.log(error)
            })
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
        return await axios
            .get('https://fadiserver.herokuapp.com/api/v1/my-status/').then(response => {
                commit('setStatuses', response.data)
            }).catch(error => {
                console.log(error)
            });

    },

    async getIssueSeverity({ commit }) {
        return await axios
            .get('https://fadiserver.herokuapp.com/api/v1/my-severities/').then(response => {
                commit('setSeverities', response.data)
            }).catch(error => {
                console.log(error)
            })

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

    async addIssue({ commit, state }, { _title, _description, _time_estimate, _projectid, _issue_type, _issue_status, _issue_severity, _is_complete }) {
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
        return response.data.id
    },

    async addIssueAssignee({ commit }, { issue_id, user_id }) {
        console.log(issue_id, user_id)
        await axios.post('https://fadiserver.herokuapp.com/api/v1/my-assignees/', {
            issueId: issue_id,
            userId: user_id
        }).catch(error => {
            console.log(error)
        })
    },

    async getIssueAssignees({ commit }, issue_id) {
        const response = await axios
            .get('https://fadiserver.herokuapp.com/api/v1/my-assignees/?issueId=' + issue_id).catch(error => {
                console.log(error)
            })
        return response.data
    },

    async deleteIssue({ commit }, issue_id) {
        await axios
            .delete('https://fadiserver.herokuapp.com/api/v1/my-issues/?id=' + issue_id).catch(error => {
                console.log(error)
            })
        commit('deleteIssue', issue_id)
    },

    async addProject({ commit, state }, { _name, _repo_link, _members }) {
        _members.push(state.User.id)
        const response = await axios.post('https://fadiserver.herokuapp.com/api/v1/my-projects/', {
            title: _name,
            repo_link: _repo_link,
            admin: state.User.id,
            members: _members
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

    async addProjectMembers({ commit }, { project_id, _members }) {
        await axios.post('https://fadiserver.herokuapp.com/api/v1/my-projects/?id=' + project_id, {
            members: _members,
        }).catch(error => { console.log(error) })

        commit('addProjectMembers', _members)
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
    async SignUp({ commit }, { username, password, firstName, lastName, email }) {
        console.log(firstName, lastName, email)
        var res = '';
        var err = 'no error';
        await axios.post('https://fadiserver.herokuapp.com/api/v1/users/', {
            username: username,
            password: password
        }).then(async response => {
            console.log('then 1')
            console.log(response)
            res = await axios.post('https://fadiserver.herokuapp.com/api/v1/my-profile/', {
                user: response.data.id,
                first_name: firstName,
                last_name: lastName,
                email: email
            })
            console.log(res.data)
        })
            .catch(error => {
                console.log('catch')
                console.log(error)
                err = error.response.data
            })
        commit('setUser', { user: res.data, rememberMe: false })
        return err
    },

    async SignIn({ commit }, { username, password, rememberMe }) {
        var err = 'No Error';
        await axios.post('https://fadiserver.herokuapp.com/api/v1/auth/', {
            username: username,
            password: password
        }).then(async response => {
            commit('setUser', { user: response.data, rememberMe: rememberMe })
        }).catch(error => {
            err = error.response.data
        })
        return err
    },

    async fetchUser({ commit }, user_id) {
        var user = '';
        await axios.get('https://fadiserver.herokuapp.com/api/v1/my-profile/?id=' + user_id
        ).then(async response => {
            user = response.data
        }).catch(error => {
            user = error.response.data
        });
        return user
    },
    async fetchUserByEmail({ commit }, user_email) {
        var user = '';
        await axios.get('https://fadiserver.herokuapp.com/api/v1/my-profile/?email=' + user_email
        ).then(async response => {
            user = response.data
        }).catch(error => {
            user = error.response.data
        });
        return user
    }
}

const mutations = {
    setProjectIssues: (state, issuesList) => (state.issuesList = issuesList),
    setMyIssues: (state, issuesList) => (state.myIssues = issuesList),
    ResetProjectIssues: (state) => (state.issuesList = []),

    setProject: (state, Project) => (state.Project = Project[0]),
    addProjectMembers: (state, members) => (state.Project.members.push(members)),
    ResetProject: (state) => (state.Project = {}),
    SetCurrentProject: (state, Project) => {
        state.Project = Project
        localStorage.setItem('currentProject', JSON.stringify(Project))
    },

    setProjects: (state, Projects) => (state.Projects = Projects),
    addProject: (state, Project) => {
        if (state.Projects === undefined || state.Projects.length == 0) {
            state.Projects.push(Project)
            state.Project = Project
            localStorage.setItem('currentProject', JSON.stringify(Project))
        }
        else state.Projects.push(Project)

    },
    deleteProject: (state, Project_ID) => { state.Projects = state.Projects.filter(project => project.id !== Project_ID) },

    addIssue: (state, Issue) => (state.issuesList.push(Issue)),
    deleteIssue: (state, Issue_ID) => state.issuesList = state.issuesList.filter(issue => issue.id !== Issue_ID),
    addQuickIssue: (state, Issue) => {
        sessionStorage.setItem('QuickIssues', JSON.stringify(Issue))
    },
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

    resetOpenIssues: (state) => { state.Open = [] },
    resetInProgressIssues: (state) => { state.InProgress = [] },
    resetClosedIssues: (state) => { state.Completed = [] },

    addQuickIssue: (state, Issue) => {
        state.Open.push(Issue)
        if (sessionStorage.getItem('QuickIssues')) {
            var quickIssues = JSON.parse(sessionStorage.getItem('QuickIssues'))
            quickIssues.push(Issue)
            sessionStorage.setItem('QuickIssues', JSON.stringify(quickIssues))
        } else {
            const quickIssues = []
            quickIssues.push(Issue)
            sessionStorage.setItem('QuickIssues', JSON.stringify(quickIssues))
        }
    },

    loadQuickIssues: (state) => {
        if (sessionStorage.getItem('QuickIssues')) {
            JSON.parse(sessionStorage.getItem('QuickIssues')).forEach(issue => { if (issue.project.id == state.Project.id) state.Open.push(issue) })
        }
    },

    CompletedQuickIssue: (state, Issue) => {
        var quickIssues = JSON.parse(sessionStorage.getItem('QuickIssues'))
        quickIssues = quickIssues.filter(issue => issue.id !== Issue.id)
        state.Open = state.Open.filter(issue => issue.id !== Issue.id)
        sessionStorage.setItem('QuickIssues', JSON.stringify(quickIssues))
    },

    UpdateOpenIssues: (state, Open) => { state.Open = Open },
    UpdateInProgressIssues: (state, InProgress) => { state.InProgress = InProgress },
    UpdateCompletedIssues: (state, Completed) => { state.Completed = Completed },

    setUser: (state, { user, rememberMe }) => {
        state.User = user
        state.isAuthenticated = true
        if (rememberMe) {
            localStorage.setItem('user', JSON.stringify(user))
        }
        else {
            sessionStorage.setItem('user', JSON.stringify(user))
        }

        router.push('/dashboard')

    },

    setUserName: (state, userName) => (state.userName = userName),

    SignOut: (state) => {
        localStorage.removeItem('currentProject')
        localStorage.removeItem('user')
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('QuickIssues')
        Object.assign(state, defaultState())
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}