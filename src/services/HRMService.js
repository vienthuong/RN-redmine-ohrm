import axios from 'axios'
import store from '../store'
import { commonActions } from "../actions/index"
import { HRM_GET_ACCESS_TOKEN_URL, getHRMAccessTokenParams, getLeaveTypeListAPIURL, getRefreshHRMAccessTokenParams, HRM_API_LOGIN, getApplyLeaveAPIURL } from './serviceConstants'
import { AsyncStorage } from 'react-native'
import moment from 'moment'
import {auth_credentical} from "./AccountService"

export async function getOauth2RequestHeader(token = undefined) {
    if(!token){
        const token = await getAccessToken()
        return {
            headers: {'Authorization': "Bearer " + token,'Content-Type': 'application/json'}
        }
    }
    return {
        headers: {'Authorization': "Bearer " + token,'Content-Type': 'application/json'}
    }
}

export function getFormData(data) {
    let params = new FormData()
    Object.keys(data).forEach((key,index) => {
        params.append(key,Object.values(data)[index])
    })
    return params
}
export async function getHRMAccessToken(auth_token) {
    store.dispatch(commonActions.fetchingData())
    try {
        const res = await axios.post(HRM_GET_ACCESS_TOKEN_URL, getHRMAccessTokenParams(auth_token))
        if(!res.data.error){
            store.dispatch(commonActions.saveHRMAccessToken(res.data))
            const auth = auth_credentical()
            // auth.password = "12345678"
            let params = getFormData(auth)

            const login = await axios.post(HRM_API_LOGIN,params,await getOauth2RequestHeader(res.data.access_token))
            store.dispatch(commonActions.saveHRMUserCredentical(login.data.user))
            store.dispatch(commonActions.fetchingSuccess())
            return res.data.access_token    
        }else{
            store.dispatch(commonActions.fetchingError())
            return false    
        }
    } catch (err) {
        store.dispatch(commonActions.fetchingError())
        console.log(err)
        return false
    }
}


export async function getAccessToken(){
    try {
        const tokens = store.getState().HRMReducer.tokens

        if(!tokens){
            const access_token = await AsyncStorage.getItem('access_token')
            const access_token_expire = await AsyncStorage.getItem('access_token_expire')
            const refresh_token = await AsyncStorage.getItem('refresh_token')

            if(access_token && access_token_expire && refresh_token){
                const curTime = moment().format().toString()
                if(access_token_expire < curTime){
                    access_token = await refreshAccessToken(refresh_token)
                }    
                return access_token
            }
        } else {
            const { access_token, access_token_expire, refresh_token}  = tokens
            if(access_token && access_token_expire && refresh_token){
                const curTime = moment().format().toString()
                if(access_token_expire < curTime){
                    access_token = await refreshAccessToken(refresh_token)
                }    
                return access_token
            }
        }
    } catch (err) {
        console.log(err)
        return false
    }
    return false
}

export async function refreshAccessToken(refresh_token){
    try {
        const res = await axios.post(HRM_GET_ACCESS_TOKEN_URL,getRefreshHRMAccessTokenParams(refresh_token))
        res.data.refresh_token = refresh_token
        store.dispatch(commonActions.saveHRMAccessToken(res.data))
        return res.data.access_token
    } catch (err) {
        console.log(err)
        return false
    }
}

export function removeAccessToken(){
    store.dispatch(commonActions.removeHRMAccessToken())
}

export async function getLeaveTypeListByEmpId(empId){
    store.dispatch(commonActions.fetchingData())
    try {
        if(!empId){
            const empId = await AsyncStorage.getItem('employee_id')
            const res = await axios.get(getLeaveTypeListAPIURL(empId), await getOauth2RequestHeader())
            store.dispatch(commonActions.fetchingSuccess())
            return res.data.data
        }    
        const res = await axios.get(getLeaveTypeListAPIURL(empId), await getOauth2RequestHeader())
        store.dispatch(commonActions.fetchingSuccess())

        return res.data.data
    } catch (err) {
        store.dispatch(commonActions.fetchingError())
        console.log("Err",err)
        return false
    }
}

export async function applyLeaveRequest(request){
    store.dispatch(commonActions.fetchingData())
    try {
        if(!request.id){
            request.id = await AsyncStorage.getItem('employee_id')
            const res = await axios.post(getApplyLeaveAPIURL(request.id),getFormData(request), await getOauth2RequestHeader())
            console.log(res.data)
            store.dispatch(commonActions.fetchingSuccess())
            return res.data
        } 
        const res = await axios.post(getApplyLeaveAPIURL(request.id),getFormData(request), await getOauth2RequestHeader())
        console.log(res.data)
        store.dispatch(commonActions.fetchingSuccess())
        return res.data
    } catch (err) {
        store.dispatch(commonActions.fetchingError())
        console.log("Err",err.response.data)
        return err.response.data
    }
}

export async function getLeaveRequests(){
    store.dispatch(commonActions.fetchingData())
    try {
        const empId = await AsyncStorage.getItem('employee_id')
        const res = await axios.get(getApplyLeaveAPIURL(empId) + "?fromDate=" + moment().startOf('year').format("YYYY-MM-DD"), await getOauth2RequestHeader())
        store.dispatch(commonActions.fetchingSuccess())
        return res.data.data
    } catch (err) {
        store.dispatch(commonActions.fetchingError())
        console.log("Err",err.response)
        return err.response
    }
}