import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native'
import { connect } from 'react-redux'
import { accountActions } from '../../actions/index'
import OrangeHRMIndexScreen from '../presentations/OrangeHRMIndexScreen'
import { Linking } from "react-native"
import { HRM_GET_OAUTH2_URL } from '../../services/serviceConstants'
import { getHRMAccessToken, getAccessToken, removeAccessToken } from '../../services/HRMService'

class OrangeHRMIndexContainer extends Component {
  constructor(props){
    super(props)
    this.props.navigator.setStyle({
      navBarBackgroundColor: '#F28C38',
    })
    
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  
  onNavigatorEvent(event) {
    if (event.id === 'bottomTabSelected') {
      console.log('Tab selected!')
    }
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true,
        animationType: 'fade',
      })
    }
  }
  
  logOutHRM() {
    removeAccessToken()
  }

  render() {
    return (
      <OrangeHRMIndexScreen isLoading={this.props.isFetching} logOut={() => this.logOutHRM()} navigator = {this.props.navigator}/>
    )
  }
  
}

function mapStateToProps(state) {
  return {
    isFetching:state.commonReducer.isFetching,
    projects:state.initDataReducer.projects
  }
}

export default connect(mapStateToProps)(OrangeHRMIndexContainer)