const defaultState =  () => {
    return  {
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
    ProjectMembers: [],

    isAuthenticated: false,
    User: null,
    }
}
export default defaultState;