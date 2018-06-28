import axios from 'axios'
import { GET_PROJECTS, GET_ALL_ISSUES_BY_PROJECT, GET_ISSUES_BY_PROJECT,get_membership_by_project } from './serviceConstants'
import {Alert} from 'react-native'
import store from '../store'
import {auth_credentical} from './AccountService'
import {commonActions} from "../actions/index"

export async function getProjects() {
    try {
        const auth = auth_credentical()
        const res = await axios.get(GET_PROJECTS, { auth })
        return res.data.projects
    } catch (err) {
        Alert.alert(
            'Fetching projects has failed',
            `${err}`,
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: true }
          )          
        return false
    }
}

export async function getIssuesByProjectId(prjId){
    store.dispatch(commonActions.fetchingData())
    try {
        const auth = auth_credentical()
        const viewAllIssues = store.getState().toggeViewAllIssuesReducer.isViewAllIssues
        const getIssuesURI = viewAllIssues ? GET_ALL_ISSUES_BY_PROJECT : GET_ISSUES_BY_PROJECT
        const res = await axios.get(getIssuesURI + prjId, { auth })
        store.dispatch(commonActions.fetchingSuccess())
        return res.data.issues
    } catch (err) {
        console.log("err",err)
        store.dispatch(commonActions.fetchingError())
        return []
    }
}

export async function getMembershipByProjectId(prjId){
    store.dispatch(commonActions.fetchingData())
    try {
        const auth = auth_credentical()
        const res = await axios.get(get_membership_by_project(prjId), { auth })
        store.dispatch(commonActions.fetchingSuccess())
        return res.data.memberships
    } catch (err) {
        console.log("err",err)
        store.dispatch(commonActions.fetchingError())
        return []
    }
}

