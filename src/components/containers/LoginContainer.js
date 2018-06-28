import React, { Component } from 'react'
import {connect} from 'react-redux'
import {accountActions} from '../../actions/index'
import LoginScreen from '../presentations/LoginScreen'
import { Linking, AsyncStorage } from 'react-native'

class LoginContainer extends Component {
  constructor(props){
    super(props)
    Linking.addEventListener('url', this._handleOpenURL.bind(this))

    this.state = {
      redirectTo: {}
    }
  }
  
  componentDidMount(){
  }
  
  _handleOpenURL(event) {
    const route = event.url.replace(/.*?:\/\//g, '')
    const id = route.match(/\/([^\/]+)\/?$/)[1]
    const routeName = route.split('/')[2]
    const redirectTo = {}
    redirectTo.screen = routeName
    redirectTo.id = id
    const that = this
    if(redirectTo.screen != undefined){
      AsyncStorage.getItem('logged_user').then((value)=>{
        if(value && value.length){
          that.props.navigator.push({ screen: 'Route.IssueShowContainer', backButtonHidden:false,title:"Redirecting...",passProps:{issue_id : redirectTo.id}})
        }
      })
      that.setState({redirectTo : redirectTo})
    }
  } 

  render() {
    return (
        <LoginScreen onLoginPress={(username,password) => this.onLoginPress(username,password)} isLoading={this.props.isFetching}/>
    )
  }
  onLoginPress(username,password) {
    this.props.dispatch(accountActions.login(username,password,this.state.redirectTo))
  }

  
}
function mapStateToProps(state) {
  return {isFetching:state.commonReducer.isFetching}
}

export default connect(mapStateToProps)(LoginContainer)