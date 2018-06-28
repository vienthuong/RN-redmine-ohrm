import React, { Component } from 'react'
import {connect} from 'react-redux'
import {commonActions} from '../../actions/index'
import OrangeHRMMyLeaveScreen from '../presentations/OrangeHRMMyLeaveScreen'
import { getLeaveRequests } from '../../services/HRMService'

class OrangeHRMMyLeaveContainer extends Component {
  constructor(props){
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this.state = {
        leaveRequests: {}
    }
    this.props.navigator.setStyle({
      navBarBackgroundColor: '#F28C38',
    })

  }
  
  componentWillMount(){
    this.getLeaveRequests()
  }

  getLeaveRequests(){
    getLeaveRequests().then(leaveRequests => {
        console.log(leaveRequests)
        this.setState({leaveRequests:leaveRequests})
    })
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


  render() {
    return (
      <OrangeHRMMyLeaveScreen leaveRequests={this.state.leaveRequests} />
    )
  }
}

function mapStateToProps(state) {
  return {
    isFetching:state.commonReducer.isFetching,
    projects:state.initDataReducer.projects
  }
}

export default connect(mapStateToProps)(OrangeHRMMyLeaveContainer)