import {FETCHING_ERROR, FETCHING_SUCCESS, FETCHING_REQUEST, INIT_DATA, TOGGLE_VIEW_ALL_ISSUES, SAVE_HRM_TOKEN, REMOVE_HRM_TOKEN, SAVE_HRM_USER } from '../actions/constants'

export function commonReducer(state = {
    isFetching: false,message: ''
  }, action) {
  switch (action.type) {
    case FETCHING_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCHING_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false
      })
    case FETCHING_ERROR:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

export function initDataReducer(state = { projects: {}}, action) {
  switch (action.type) {
    case INIT_DATA:
      return Object.assign({}, state, {
        projects: action.projects
      })
    default:
      return state
  }
}

export function toggeViewAllIssuesReducer(state = { isViewAllIssues: false}, action) {
  switch (action.type) {
    case TOGGLE_VIEW_ALL_ISSUES:
      return Object.assign({}, state, {
        isViewAllIssues: !state.isViewAllIssues
      })
    default:
      return state
  }
}

export function HRMReducer(state = {
  tokens: undefined,
  user:{}
}, action) {
switch (action.type) {
  case SAVE_HRM_TOKEN:
    return Object.assign({}, state, {
      tokens: action.tokens
    })
  case REMOVE_HRM_TOKEN:
    return Object.assign({}, state, {
      tokens: undefined
    })
  case SAVE_HRM_USER:
    return Object.assign({}, state, {
      user:action.user
    })
  default:
    return state
}
}