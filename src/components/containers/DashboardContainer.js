import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native'
import { connect } from 'react-redux'
import { accountActions } from '../../actions/index'
import DashboardScreen from '../presentations/DashboardScreen'
import { Linking } from "react-native"
import { HRM_GET_OAUTH2_URL } from '../../services/serviceConstants'
import { getHRMAccessToken, getAccessToken } from '../../services/HRMService'

class DashboardContainer extends Component {
  constructor(props){
    super(props)
    if(Object.keys(this.props.redirectTo).length > 0){
      this.navigateToRedirect(this.props.redirectTo)
    }
    Linking.addEventListener('url', this._handleOpenURL.bind(this))
  }

  checkHRMAccess(authorize_code = null){
    if(authorize_code){
      getHRMAccessToken(authorize_code).then( access_token => {
        console.log("HAVE PROPS",access_token)
        this.props.navigator.push({ screen: 'Route.OrangeHRMIndexContainer', backButtonHidden:false,title:"OrangeHRM", navigatorStyle:{tabBarBackgroundColor: '#F28C38', tabBarSelectedButtonColor: 'white'}})
        })
    }else{
      getAccessToken().then(access_token => {
        if(access_token){
            console.log("NOT HAVE PROPS",access_token)
          this.props.navigator.push({ screen: 'Route.OrangeHRMIndexContainer', backButtonHidden:false,title:"OrangeHRM", navigatorStyle:{tabBarBackgroundColor: '#F28C38', tabBarSelectedButtonColor: 'white'}})    
        }else{
          Linking.openURL(HRM_GET_OAUTH2_URL)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
  
  getParameterByName(name, url) {
    if (!url) url = window.location.href
    name = name.replace(/[\[\]]/g, "\\$&")
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, " "))
  }
  
  _handleOpenURL(event) {
    const route = event.url.replace(/.*?:\/\//g, '')
    const id = route.match(/\/([^\/]+)\/?$/)[1]
    const routeName = route.split('/')[2]
    const redirectTo = {}
    redirectTo.screen = routeName
    redirectTo.id = id

    this.navigateToRedirect(redirectTo)
  } 
  
  navigateToRedirect(redirectTo){    
    if(redirectTo.screen == 'projects'){
      if(redirectTo.id == 'projects'){
        this.props.navigator.push({ screen: 'Route.ProjectIndexContainer', backButtonHidden:false,title:'Projects',passProps:{project : this.props.projects}})
      }else{
        this.props.navigator.push({ screen: 'Route.ProjectShowContainer', backButtonHidden:false,title:"Redirecting...",passProps:{project : this.props.projects[redirectTo.id]}})
      }
    }else if(redirectTo.screen == 'orangehrm'){
      const authorize_code = this.getParameterByName("code",redirectTo.id)
      Linking.removeEventListener('url', this._handleOpenURL.bind(this))
      this.props.navigator.popToRoot()
      this.checkHRMAccess(authorize_code)
      // this.props.navigator.push({ screen: 'Route.OrangeHRMIndexContainer', backButtonHidden:false,title:"OrangeHRM", passProps:{authorize_code:authorize_code}, navigatorStyle:{tabBarBackgroundColor: '#F28C38', tabBarSelectedButtonColor: 'white'}})
    }else if(redirectTo.screen == 'issues') {
      this.props.navigator.push({ screen: 'Route.IssueShowContainer', backButtonHidden:false,title:"Redirecting...",passProps:{issue_id : redirectTo.id}})
    }
  }

  render() {
    return (
      <DashboardScreen isLoading={this.props.isFetching} navigator = {this.props.navigator}
       checkHRMAccess = {() => this.checkHRMAccess()}/>
    )
  }
  
}

function mapStateToProps(state) {
  return {
    tokens:state.HRMReducer.tokens,
    isFetching:state.commonReducer.isFetching,
    projects:state.initDataReducer.projects
  }
}

export default connect(mapStateToProps)(DashboardContainer)