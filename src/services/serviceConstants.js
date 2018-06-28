//COMMON
export const API_ROOT = "http://172.16.10.62:3000/"
export const AUTHORIZE_API = API_ROOT + "users/current.json"
export const GET_PROJECTS = API_ROOT + "projects.json"
export const GET_ISSUES = API_ROOT + "issues.json"
// Get all OPEN only issues
export const GET_ISSUES_BY_PROJECT = API_ROOT + "issues.json?sort=created_on:desc&subproject_id=!*&project_id="
export function get_membership_by_project(prjId){
    return API_ROOT + `projects/${prjId}/memberships.json`
} 

export function getIssueDetailURI(issueId){
    return API_ROOT + `issues/${issueId}.json?include=attachments,journals`
} 
//Get all OPEN/CLOSED issues
export const GET_ALL_ISSUES_BY_PROJECT = API_ROOT + "issues.json?sort=created_on:desc&subproject_id=!*&status_id=*&project_id="


//CREATE,GET LIST TIME ENTRIES (params time_entry={issue_id,project_id,spent_on,hours,activity_id,comment})
export const TIME_ENTRIES = API_ROOT + "time_entries.json"
//SHOW,UPDATE A TIME ENTRY 
export const TIME_ENTRY = API_ROOT + "time_entries/"
export const TIME_ENTRY_ACTIVITY = API_ROOT + "enumerations/time_entry_activities.json"

export const DEFAULT_ACTIVITY = 21
export const DEFAULT_PROCESS = 'Requirement'
export const DEFAULT_PRODUCT_CAT = 'SRS'

// HRM constant
export const HRM_URI = "http://172.16.10.62/hrm/symfony/web/index.php/"
export const HRM_REDIRECT_URI = "https://m.insight.3si.vn/redmine/orangehrm/"
export const HRM_CLIENT_ID = "redminemobile"
export const HRM_CLIENT_SECRET = "redminemobile"
export const HRM_RESPONSE_TYPE = "code"
export const HRM_BASE_API = `${HRM_URI}api/v1/`

export const HRM_API_LOGIN = `${HRM_BASE_API}login`
export const HRM_GET_OAUTH2_URL = `${HRM_URI}oauth/login?response_type=${HRM_RESPONSE_TYPE}&client_id=${HRM_CLIENT_ID}&redirect_uri=${HRM_REDIRECT_URI}&state=xyz` 
export const HRM_GET_ACCESS_TOKEN_URL = `${HRM_URI}oauth/issueToken`
export const getApplyLeaveAPIURL = (emp_id) => { return `${HRM_BASE_API}employee/${emp_id}/leave-request` }

export const getHRMAccessTokenParams = (auth_code) => {
    return {
        'grant_type' : 'authorization_code',
        'response_type' : HRM_RESPONSE_TYPE,
        'client_id' : HRM_CLIENT_ID,
        'client_secret' : HRM_CLIENT_SECRET,
        'code' : auth_code,
        'state' : 'xyz',
        'redirect_uri' : HRM_REDIRECT_URI
    }
}

export const getRefreshHRMAccessTokenParams = (refresh_code) => {
    return {
        'grant_type' : 'refresh_token',
        'client_id' : HRM_CLIENT_ID,
        'client_secret' : HRM_CLIENT_SECRET,
        'refresh_token' : refresh_code
    }
}

export const getLeaveTypeListAPIURL = (emp_id) => {
    return `${HRM_BASE_API}leave/type?emp_id=${emp_id}`
}