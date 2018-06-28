import {root} from './rootReducer'
import {accountReducer} from './accountReducer'
import {commonReducer,initDataReducer,toggeViewAllIssuesReducer,HRMReducer} from './commonReducer'

/*
This file exports the reducers as an object which 
will be passed onto combineReducers method at src/app.js
*/
export {
    root,
    accountReducer,
    commonReducer,
    initDataReducer,
    toggeViewAllIssuesReducer,
    HRMReducer
}