import React, { Component } from 'react'
import registerScreens from './components/RegisterScreens'
import * as actions from "./actions/index"
import startApp from "./routes"
import store from "./store"
import { Provider } from "react-redux"
import { Linking, AsyncStorage } from "react-native"

export default class App extends Component {
  constructor(props) {
    super(props)
    registerScreens(store, Provider)
    store.subscribe(this.onStoreUpdate.bind(this))
    store.dispatch(actions.commonActions.appInitialized())
  }
  
  onStoreUpdate() {
      let { root, redirectTo } = store.getState().root
      let { logged_user } = store.getState().accountReducer

      if(logged_user.username == ''){
        AsyncStorage.getItem('logged_user').then((value)=>{
          if(value && value.length){
            logged_user = JSON.parse(value)
            store.dispatch(actions.accountActions.saveLoggedUser(logged_user))
            store.dispatch(actions.commonActions.changeAppRoot('after-login'))
            store.dispatch(actions.commonActions.initialRedmineData())
          }
        })
      }
      // handle a root change
      // if your app doesn't change roots in runtime, you can remove onStoreUpdate() altogether
      if (this.currentRoot != root) {
        this.currentRoot = root
        startApp(root, logged_user.fullname, redirectTo)
      }
    }
}

