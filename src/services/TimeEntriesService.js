import axios from 'axios'
import { TIME_ENTRY, TIME_ENTRIES } from './serviceConstants'
import store from '../store'
import { auth_credentical } from './AccountService'
import { commonActions } from "../actions/index"

export async function createTimesheet(data) {
    store.dispatch(commonActions.fetchingData())
    try {
        const auth = auth_credentical()
        const res = await axios.post(TIME_ENTRIES, {time_entry:data},{ auth })
        store.dispatch(commonActions.fetchingSuccess())
        return res.data
    } catch (err) {
        console.log(err.response)
        store.dispatch(commonActions.fetchingError())
        return false
    }
}

getParamsFromFilter = (filter) => {
    const user_id = store.getState().accountReducer.logged_user.id
    let params = "?period_type=2&limit=100&user_id=" + user_id + "&"
    if(filter.project_id){
        params += `project_id=${filter.project_id}&`
    }
    if(filter.spent_from){
        params += `&from=${filter.spent_from}`
    }
    if(filter.spent_to){
        params += `&to=${filter.spent_to}`
    }
    return params
}

export async function getTimeEntries(filter) {
    store.dispatch(commonActions.fetchingData())
    try {
        const auth = auth_credentical()
        const params = getParamsFromFilter(filter)
        const res = await axios.get(TIME_ENTRIES + params,{ auth })
        store.dispatch(commonActions.fetchingSuccess())
        return res.data
    } catch (err) {
        console.log(err)
        store.dispatch(commonActions.fetchingError())
        return false
    }
}

export async function deleteTimeEntry(id) {
    store.dispatch(commonActions.fetchingData())
    try {
        const auth = auth_credentical()
        const res = await axios.delete(TIME_ENTRY + id + ".json",{ auth })
        store.dispatch(commonActions.fetchingSuccess())
        return res.status
    } catch (err) {
        console.log(err.response)
        store.dispatch(commonActions.fetchingError())
        return false
    }
}