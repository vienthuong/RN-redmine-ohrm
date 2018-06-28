import React, { Component } from 'react'
import { connect } from 'react-redux'
import { accountActions,commonActions } from '../../actions/index'
import LogTimeSheetScreen from '../presentations/LogTimeSheetScreen'
import { getTimeEntryActivities,getTimeEntryProcess,getTimeEntryProductCat } from '../../services/CustomFieldService'
import { DEFAULT_ACTIVITY,DEFAULT_PROCESS,DEFAULT_PRODUCT_CAT } from '../../services/serviceConstants'
import { getProjects,getIssuesByProjectId } from '../../services/ProjectService'
import { createTimesheet } from '../../services/TimeEntriesService'

class LogTimeSheetContainer extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title:'Create   ',
        id: 'create', 
        showAsAction: 'always',
        buttonColor: 'white', 
      }
    ]
  }

  constructor(props){
    super(props)
    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))

    const issues = {}
    const projects = {}
    const defaultValue = {
      activity:DEFAULT_ACTIVITY,
      process:DEFAULT_PROCESS,
      productCat:DEFAULT_PRODUCT_CAT,
      date: new Date()
    }
    if(props.selectedIssue != undefined){
      projects[props.selectedIssue.project.id] = props.selectedIssue.project.name
      issues[props.selectedIssue.id] = props.selectedIssue.subject
      defaultValue.project = props.selectedIssue.project.id
      defaultValue.issue = props.selectedIssue.id
      defaultValue.selectedIssue = true
    }else{
      for (const obj of Object.values(this.props.projects)) {
          projects[obj.id] = obj.name
      }
    }
    

    this.state = {
      activities : getTimeEntryActivities(),
      processes : getTimeEntryProcess(),
      productCats : getTimeEntryProductCat(),
      defaultValue : defaultValue,
      projects: projects,
      issues: issues,
      isViewAllIssues:this.props.isViewAllIssues
    }
  }

  getIssuesByProjectId(value){
    if(value.project != '' && value.project != undefined){
      const user_id = this.props.user_id
      getIssuesByProjectId(value.project).then(data => {
          let issues = data.reduce(function(obj,item){
            if(!value.assignToMe || (item.assigned_to && item.assigned_to.id == user_id)){
              obj[' ' + item.id] = item.subject // add ' ' to prevent auto object reorder!!!
            }
            return obj
          }, {})
          const defaultValue = value
          defaultValue.issue = Object.keys(issues).length > 0 ? Object.keys(issues)[0] : undefined
        this.setState({issues:issues,defaultValue:defaultValue})
      }).catch(err => {
        console.log(err)
      })
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.state.isViewAllIssues != nextProps.isViewAllIssues){
      const defaultValue = this.state.defaultValue
      defaultValue.project = undefined
      defaultValue.issue = undefined
      this.setState({defaultValue : defaultValue,isViewAllIssues:!this.state.isViewAllIssues})
    }
  }

  async createTimesheet(data){
    return await createTimesheet(data).then(res => {
      return res
    })
  }
  
  render() {
    return (
        <LogTimeSheetScreen activities={this.state.activities} processes={this.state.processes} productCats={this.state.productCats}
          defaultValue={this.state.defaultValue} getIssuesByProjectId={(value) => this.getIssuesByProjectId(value)} projects={this.state.projects}
          issues={this.state.issues} createTimesheet={(data) => this.createTimesheet(data)}
          navigator={this.props.navigator}
        />
    )
  }
}

function mapStateToProps(state) {
  return {
    projects:state.initDataReducer.projects,
    user_id:state.accountReducer.logged_user.id,
    isViewAllIssues:state.toggeViewAllIssuesReducer.isViewAllIssues
  }
}

export default connect(mapStateToProps)(LogTimeSheetContainer)