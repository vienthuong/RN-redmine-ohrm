import React, { Component } from 'react'
import {connect} from 'react-redux'
import {commonActions} from '../../actions/index'
import IssueShowScreen from '../presentations/IssueShowScreen'
import {getIssueDetail} from '../../services/IssueService'

class IssueShowContainer extends Component {
  static navigatorButtons = {
    fab: {
      collapsedId: 'create',
      collapsedIcon: require('../../img/clock.png'),
      collapsedIconColor: 'white', // optional
      backgroundColor: 'red'
    }
  }
  
    constructor(props){
        super(props)
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
        this.state = {
            issue : this.props.issue ? this.props.issue : {},
          }
    }

    onNavigatorEvent(event) {
      console.log(event.id)
      if (event.id === 'bottomTabReselected') {
        this.props.navigator.popToRoot({
          animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
          animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
        })
      }

      if(event.id === 'create'){
        const issue = this.state.issue
        this.props.navigator.push({ screen: 'Route.LogTimeSheetContainer', backButtonHidden:false,title:`#${issue.id} - Spent Time`,passProps:{selectedIssue : issue}})
      }
    }
    
    componentDidMount(){
      this.getIssueDetail(this.props.issue_id)
    }
    
    getIssueDetail(issue_id){
      const that = this
      if(issue_id != '' && issue_id != undefined){
        getIssueDetail(issue_id).then(data => {
          if(data.id){
            that.props.navigator.setTitle({
              title: data.subject
            })
            that.setState({issue:data})
          }else{
            that.props.navigator.popToRoot({
              animated: true, 
              animationType: 'fade',
            })    
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }

    render() {
        return (
            <IssueShowScreen issue={this.state.issue}
            navigator = {this.props.navigator}
            />
        )
  }
}

function mapStateToProps(state) {
  return {
    isFetching:state.commonReducer.isFetching,
  }
}

export default connect(mapStateToProps)(IssueShowContainer)