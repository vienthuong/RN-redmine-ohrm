import React, { Component } from 'react'
import { connect } from 'react-redux'
import { accountActions,commonActions } from '../../actions/index'
import TimeEntriesScreen from '../presentations/TimeEntriesScreen'
import { getTimeEntryActivities,getTimeEntryProcess,getTimeEntryProductCat } from '../../services/CustomFieldService'
import { DEFAULT_ACTIVITY,DEFAULT_PROCESS,DEFAULT_PRODUCT_CAT } from '../../services/serviceConstants'
import { getProjects,getIssuesByProjectId } from '../../services/ProjectService'
import { getTimeEntries, deleteTimeEntry } from '../../services/TimeEntriesService'
import moment from 'moment'

class TimeEntriesContainer extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        title:'Add new   ',
        id: 'add', 
        showAsAction: 'always',
        buttonColor: 'white', 
      }
    ]
  }

  constructor(props){
    super(props)    
    const projects = {}
    for (const obj of Object.values(this.props.projects)) {
        projects[obj.id] = obj.name
    }
    
    this.state = {
      projects: projects,
      time_entries:[]
    }
  }
  onNavigatorEvent(event) {
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true, 
        animationType: 'fade', 
      })
    }
  }

  componentDidMount(){
      // const initFilter = {
      //     "spent_from" : moment().format("YYYY-MM-DD"),
      //     "spent_to" : moment().format("YYYY-MM-DD"),
      // }
      
      // this.getTimeEntries(initFilter).then(time_entries => {
      //     this.setState({time_entries:time_entries})
      // })
  }

  async getTimeEntries(data){
    return await getTimeEntries(data).then(res => {
      return res.time_entries
    })
  }
  
  async deleteTimeEntry(id){
    return await deleteTimeEntry(id).then(status => {
      return status
    })
  }

  render() {
    return (
        <TimeEntriesScreen projects={this.state.projects}
          getTimeEntries ={(data) => this.getTimeEntries(data)}
          deleteTimeEntry ={(id) => this.deleteTimeEntry(id)}
          navigator={this.props.navigator}
          time_entries={this.state.time_entries}
        />
    )
  }
}

function mapStateToProps(state) {
  return {
    projects:state.initDataReducer.projects,
    user_id:state.accountReducer.logged_user.id,
  }
}

export default connect(mapStateToProps)(TimeEntriesContainer)