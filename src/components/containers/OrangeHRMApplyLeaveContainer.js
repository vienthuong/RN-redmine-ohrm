import React, { Component } from 'react'
import { connect } from 'react-redux'
import { commonActions } from '../../actions/index'
import OrangeHRMApplyLeaveScreen from '../presentations/OrangeHRMApplyLeaveScreen'
import { getLeaveTypeListByEmpId, applyLeaveRequest } from '../../services/HRMService'

class OrangeHrmApplyLeaveContainer extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title:'Apply   ',
        id: 'apply', 
        showAsAction: 'always',
        buttonColor: 'white', 
      }
    ]
  }

  constructor(props){
      super(props)
      this.props.navigator.setStyle({
        navBarBackgroundColor: '#F28C38',
      })
  
      this.state = {
        leaveTypeList: {}
      }
  }

  componentDidMount(){
    this.getLeaveTypeListByEmpId(this.props.user.employeeId)
  }
    
  getLeaveTypeListByEmpId(employeeId){
    getLeaveTypeListByEmpId(employeeId).then(data => {
      let leaveTypeList = data.reduce(function(obj,item){
          obj[item.id] = item.type
          return obj
      }, {})
        this.setState({leaveTypeList:leaveTypeList})
      }).catch(err => {
        console.log(err)
      })
  }

  async applyLeaveRequest(request){
    request.id = this.props.user.employeeId
    return await applyLeaveRequest(request).then(res => {
      return res
    })
  }

  render() {
      return (
          <OrangeHRMApplyLeaveScreen
          leaveTypeList = {this.state.leaveTypeList} 
          navigator = {this.props.navigator}
          isLoading = {this.props.isFetching}
          applyLeaveRequest = {(request) => this.applyLeaveRequest(request)}
          />
      )
  }
}

function mapStateToProps(state) {
  return {
    isFetching:state.commonReducer.isFetching,
    user:state.HRMReducer.user
  }
}

export default connect(mapStateToProps)(OrangeHrmApplyLeaveContainer)