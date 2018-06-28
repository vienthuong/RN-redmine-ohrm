import thunk from "redux-thunk"
import {createStore, applyMiddleware, combineReducers} from "redux"
import * as reducers from "./reducers/index"

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const reducer = combineReducers(reducers)
const store = createStoreWithMiddleware(reducer)

export default store