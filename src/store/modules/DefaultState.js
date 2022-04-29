const defaultState = () => {
    return {
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
        userName: ''
    }
}
export default defaultState;