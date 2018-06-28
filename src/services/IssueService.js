import axios from 'axios'
import { getIssueDetailURI } from './serviceConstants'
import store from '../store'
import {auth_credentical} from './AccountService'
import {commonActions} from "../actions/index"

export async function getIssueDetail(issueId) {
    store.dispatch(commonActions.fetchingData())
    try {
        const auth = auth_credentical()
        const res = await axios.get(getIssueDetailURI(issueId), { auth })
        store.dispatch(commonActions.fetchingSuccess())
        return res.data.issue
    } catch (err) {
        store.dispatch(commonActions.fetchingError())
        return false
    }
}
