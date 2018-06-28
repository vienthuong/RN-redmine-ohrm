import React, { Component } from 'react'
import {connect} from 'react-redux'
import {commonActions} from '../../actions/index'
import ProjectShowScreen from '../presentations/ProjectShowScreen'
import {getProjects,getIssuesByProjectId,getMembershipByProjectId} from '../../services/ProjectService'

class ProjectShowContainer extends Component {
  static navigatorButtons = {
    rightButtons: [
      {
        id: 'info', 
        disableIconTint: true, 
        showAsAction: 'always',
        buttonColor: 'white', 
      },
      {
        icon: require('../../img/info.png'), 
        id: 'info',
        alignItems:'right'
      }
    ]
  }

  constructor(props){
      super(props)
      this.state = {
          project : this.props.project,
          issues : {}
          // membership:this.getMembershipByProjectId(this.props.project.id)
        }
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  componentDidMount(){
    this.getIssuesByProjectId(this.props.project.id)
  }

  getMembershipByProjectId(prjId){
    if(prjId != '' && prjId != undefined){
      getMembershipByProjectId(prjId).then(data => {
      }).catch(err => {
        console.log(err)
      })
    }
  }
    
  getIssuesByProjectId(prjId,filter = {}){
    const that = this
    if(prjId != '' && prjId != undefined){
      getIssuesByProjectId(prjId).then(data => {
        that.setState({issues:data})
      }).catch(err => {
        console.log(err)
      })
    }
  }
  onNavigatorEvent(event) { 
    if (event.type == 'NavBarButtonPress') { 
      if (event.id == 'info') { 
        this.props.navigator.showLightBox({
          screen: "Route.ShowProjectInfoLightBox", 
          passProps: {project:this.props.project}, 
          style: {
            backgroundBlur: "light",
            backgroundColor: "rgba(0,0,0,0.5)", 
            tapBackgroundToDismiss: true 
          },
          adjustSoftInput: "resize", 
          })
        
      }
    }
    
    if (event.id === 'bottomTabReselected') {
      this.props.navigator.popToRoot({
        animated: true, 
        animationType: 'fade', 
      })
    }  
  }
  
  render() {
    if(Object.values(this.state.issues).length > 0){
      return (
          <ProjectShowScreen project={this.state.project} showProjectInfo={this.state.showProjectInfo}
          issues={this.state.issues}
          navigator = {this.props.navigator}
          />
      )
    }else{
      return (<ProjectShowScreen project={this.state.project} showProjectInfo={this.state.showProjectInfo}
          issues={this.state.issues}
          />)
    }
  }
}

function mapStateToProps(state) {
  return {
    isFetching:state.commonReducer.isFetching,
    projects:state.initDataReducer.projects
  }
}

export default connect(mapStateToProps)(ProjectShowContainer)