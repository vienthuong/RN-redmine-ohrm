import React, { Component } from 'react'
import {connect} from 'react-redux'
import {commonActions} from '../../actions/index'
import ProjectIndexScreen from '../presentations/ProjectIndexScreen'

class ProjectIndexContainer extends Component {
  constructor(props){
    super(props)
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

  navigateToProjectShow(project){
    this.props.navigator.push({ screen: 'Route.ProjectShowContainer', backButtonHidden:false,title:project.name,passProps:{project : project}})
  }

  render() {
    return (
      <ProjectIndexScreen projects={this.props.projects}
        navigateToProjectShow = {(project) => this.navigateToProjectShow(project)} />
    )
  }
}

function mapStateToProps(state) {
  return {
    isFetching:state.commonReducer.isFetching,
    projects:state.initDataReducer.projects
  }
}

export default connect(mapStateToProps)(ProjectIndexContainer)