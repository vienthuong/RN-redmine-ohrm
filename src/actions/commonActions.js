import { ROOT_CHANGED,FETCHING_REQUEST,FETCHING_ERROR,FETCHING_SUCCESS,INIT_DATA,TOGGLE_VIEW_ALL_ISSUES, SAVE_HRM_TOKEN, REMOVE_HRM_TOKEN, SAVE_HRM_USER} from './constants'
import { getProjects,getIssuesByProjectId } from '../services/ProjectService'
import { AsyncStorage } from 'react-native'
import moment from 'moment'

export function appInitialized() {
    return async function(dispatch, getState) {
        dispatch(changeAppRoot('login'))
    }
}

export function changeAppRoot(root,redirectTo = {}) {
    return {
        type: ROOT_CHANGED, 
        root: root,
        redirectTo
    }
}

export function fetchingData(){
    return {
        type: FETCHING_REQUEST
    }
}

export function fetchingSuccess(){
    return {
        type: FETCHING_SUCCESS
    }
}

export function fetchingError(){
    return {
        type: FETCHING_ERROR
    }
}

export function toggleViewAllIssues(){
    return {
        type: TOGGLE_VIEW_ALL_ISSUES
    }
}

export function initialRedmineData(){
    return async function (dispatch, getState) {
        dispatch(fetchingData())
        let projects = await getProjects()
        projects = projects.reduce(function(obj,item){
            obj[item.id] = item
            return obj
          }, {})
        // await Promise.all(Object.values(projects).map(async (prj) => {
        //     prj.issues = await getIssuesByProjectId(prj.id)
        // }))
        dispatch(fetchingSuccess())
        dispatch({
            type: INIT_DATA,
            projects: projects
        })
    }
}

export function saveHRMAccessToken(tokens){
    const access_token_expire = moment().add(tokens.expires_in,'s').format().toString()
    AsyncStorage.setItem('access_token', tokens.access_token)
    AsyncStorage.setItem('access_token_expire', access_token_expire)
    AsyncStorage.setItem('refresh_token', tokens.refresh_token)
    tokens.access_token_expire = access_token_expire
    return {
        type: SAVE_HRM_TOKEN,
        tokens: tokens
    }
}

export function removeHRMAccessToken(){
    return async function(dispatch, getState) {
        await AsyncStorage.removeItem('access_token')
        await AsyncStorage.removeItem('access_token_expire')
        await AsyncStorage.removeItem('refresh_token')    
        await AsyncStorage.removeItem('employee_id')

        dispatch({
            type: REMOVE_HRM_TOKEN
        })
    }
}


export function saveHRMUserCredentical(user){
    AsyncStorage.setItem('employee_id', user.employeeId)

    return {
        type: SAVE_HRM_USER,
        user: user
    }
}
