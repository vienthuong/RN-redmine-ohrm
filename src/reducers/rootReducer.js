import {ROOT_CHANGED} from '../actions/constants'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
  root: undefined, // 'login' / 'after-login'
  redirectTo: {}
})
//root reducer
export function root(state = initialState, action = {}) {
  switch (action.type) {
    case ROOT_CHANGED:
      return state.merge({
        root: action.root,
        redirectTo: action.redirectTo 
      })
    default:
      return state
  }
}
