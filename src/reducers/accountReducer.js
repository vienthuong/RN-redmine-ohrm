import {USER_LOGGED_IN, USER_LOGGED_OUT} from '../actions/constants'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
  logged_user: {
    fullname:'anonymous',
    username:'',
    password:'',
    id:''
  } // 'login' / 'after-login'
})
//root reducer
export function accountReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return state.merge({
        logged_user: action.user
      })
    case USER_LOGGED_OUT:
      return state.merge({
        logged_user: {}
      })
    default:
    return state
  }
}
