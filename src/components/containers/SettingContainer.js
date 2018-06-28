import React, { Component } from 'react'
import {connect} from 'react-redux'
import {commonActions,accountActions} from '../../actions/index'
import SettingScreen from '../presentations/SettingScreen'

class SettingContainer extends Component {
  constructor(props){
    super(props)
  }

  logOut() { 
    this.props.navigator.popToRoot({})
    this.props.dispatch(accountActions.logout())
  }

    render() {
        return (
            <SettingScreen toggleViewAllIssues = {() => this.toggleViewAllIssues()} 
            isViewAllIssues={this.props.isViewAllIssues}
            logOut={() => this.logOut()} />
        )
  }
  
  toggleViewAllIssues() {
    this.props.dispatch(commonActions.toggleViewAllIssues())
    this.props.dispatch(commonActions.initialRedmineData())
  }
}

function mapStateToProps(state) {
  return {
    isViewAllIssues:state.toggeViewAllIssuesReducer.isViewAllIssues,
  }
}

export default connect(mapStateToProps)(SettingContainer)