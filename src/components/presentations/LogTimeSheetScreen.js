import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
  } from 'react-native'
import t from 'tcomb-form-native'
import moment from 'moment'
import _ from 'lodash'

const Form = t.form.Form
const stylesheet = _.cloneDeep(Form.stylesheet)
const stylesheetInline = _.cloneDeep(Form.stylesheet)
const predicate = function (x) { return x > 0 }

stylesheet.textbox.normal.borderWidth = 0
stylesheet.textbox.error.borderWidth = 0
stylesheet.textbox.normal.marginBottom = 0
stylesheet.textbox.error.marginBottom = 0
stylesheet.select.normal.borderColor = '#48BBEC'
stylesheet.select.normal.borderWidth = 2
stylesheet.select.normal.borderRadius = 3
stylesheet.select.error.borderWidth = 2
stylesheet.select.error.borderRadius = 3
stylesheet.textboxView.normal.borderWidth = 0
stylesheet.textboxView.error.borderWidth = 0
stylesheet.textboxView.normal.borderRadius = 0
stylesheet.textboxView.error.borderRadius = 0
stylesheet.textboxView.normal.borderBottomWidth = 1
stylesheet.textboxView.error.borderBottomWidth = 1
stylesheet.textboxView.error.borderColor = '#48BBEC'
stylesheet.textboxView.normal.borderColor = '#48BBEC'
stylesheet.textbox.normal.marginBottom = 5
stylesheet.textbox.error.marginBottom = 5
stylesheetInline.formGroup.normal.flexDirection = 'row'
stylesheetInline.formGroup.error.flexDirection = 'row'
stylesheetInline.checkbox.normal.flex = 1
stylesheetInline.checkbox.error.flex = 1

class LogTimeSheetScreen extends Component {
    constructor(props) {
      super(props)
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))

      this.state = {
        value: this.props.defaultValue,
        projects: this.props.projects,
        activities: this.props.activities,
        processes: this.props.processes,
        issues: this.props.issues == undefined ? {} : this.props.issues,
        productCats: this.props.productCats,
        options : {
          stylesheet:stylesheet,
          fields: {
            date: {
              label: 'Date *',
              mode: 'date',
              config: {
                format: (date) => moment(date).format('YYYY-MM-DD'),
                dialogMode:'calendar'
              },
            },
            project:{
              label:'Project *',
              nullOption:Object.keys(this.props.projects).length == 1 ? false : {value: '', text: 'Please choose a project'},
              editable:!this.props.defaultValue.selectedIssue
            },
            issue:{
              label: 'Issue',
              nullOption:false,
              hidden:this.props.defaultValue.project == undefined,
              editable:!this.props.defaultValue.selectedIssue
            },
            hours:{
              label: 'Hours *',
              error: 'Enter a valid spent hours'
            },
            comment:{
              label: 'Comment'
            },
            activity:{
              label: 'Activity *',
              nullOption:false
            },
            process:{
              label: 'Process *',
              nullOption:false
            },
            productCat:{
              label: 'Product Category *',
              nullOption:false
            },
            assignToMe:{
              label: 'Filter issues assigned to me',
              default:false,
              hidden:this.props.defaultValue.project == undefined || this.props.defaultValue.selectedIssue,
              stylesheet:stylesheetInline
            }
          },
        }
      }
    }
    
    onNavigatorEvent(event) {
      if (event.id === 'bottomTabSelected') {
        console.log('Tab selected!')
      }
      if (event.id === 'bottomTabReselected') {
        this.props.navigator.popToRoot({
          animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
          animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
        })
      }
      if (event.id == 'create') {
        this.onPress()
      }
    }
  
    componentWillReceiveProps(nextProps) {
      if((this.props.defaultValue != nextProps.defaultValue) || (nextProps.defaultValue && nextProps.defaultValue.project == undefined)) {
        const options = t.update(this.state.options, {
          fields: {
            issue: {
              hidden: {'$set': nextProps.defaultValue.project == undefined},
              nullOption:{'$set': nextProps.defaultValue.issue == undefined ? {value: undefined, text: 'Issues not found',disabled:true} : false} 
            },
            assignToMe: {
              hidden: {'$set': nextProps.defaultValue.project == undefined}
            }
          }
        })

        this.setState({
          projects: nextProps.projects,
          issues: nextProps.issues,
          value: nextProps.defaultValue,
          options:options
        })
      }
    }
    
    render(){
      const time_entries_form = t.struct({
        project: t.enums(this.state.projects),
        assignToMe: t.Boolean,
        issue: t.enums(this.state.issues),
        hours: t.refinement(t.Number, predicate),
        date: t.Date,
        comment: t.maybe(t.String),
        activity: t.enums(this.state.activities),
        process: t.enums(this.state.processes),
        productCat: t.enums(this.state.productCats)
      })
      return (
          <ScrollView style={styles.wrapper}>
              <View  style={styles.container}>
                <Form ref="form" type={time_entries_form} options={this.state.options} onChange={this.onChange.bind(this)} value={this.state.value} styles={styles.tForm}/>
              </View>
              <View>
              </View>
          </ScrollView>
      )
    }
    onChange(value){
      if(value.project != undefined && value.project != '' && (this.state.value.project != value.project||this.state.value.assignToMe != value.assignToMe) ){
        this.props.getIssuesByProjectId(value)
        return;
      }
      
      if(this.state.value.project != value.project || this.state.assignToMe != value.assignToMe){
        let options = t.update(this.state.options, {
          fields: {
            issue: {
              hidden: {'$set': value.project == ''}
            },
            assignToMe: {
              hidden: {'$set': value.project == ''}
            }
          }
        })
      
        if(!value.issue && Object.keys(this.state.issues).length > 0){
          value.issue = Object.keys(this.state.issues)[0]
        }
        this.setState({value:value,options: options})
     
      }else{
        this.setState({value:value})
      }
      // console.log(value)
    }
    onPress() {
      const result = this.refs.form.getValue()
      console.log(result)

      // ..with e isValid() method
      if (result) {
        console.log(result)
        const time_entry = {
          issue_id: result.issue,
          spent_on: moment(result.date).format('YYYY-MM-DD'),
          hours: result.hours,
          activity_id: result.activity,
          comments: result.comment,
          custom_field_values: {21 : result.process},
          custom_field_values: {22 : result.productCat}
        }

        this.props.createTimesheet(time_entry).then(res => {
            if(!res){
              this.props.navigator.showInAppNotification({
                screen: "Notification.ErrorMessage", 
                passProps: {message:'Error! Please try again!'}, 
                autoDismissTimerSec: 3 
               })
            }else{
              this.props.navigator.showInAppNotification({
                screen: "Notification.SuccessMessage", 
                passProps: {message:'Create Timesheet Successfully'}, 
                autoDismissTimerSec: 3 
               })
              this.props.navigator.pop()
            }
        })
      } 
    }
}

const styles = StyleSheet.create({
    wrapper:{
        padding:10,
        backgroundColor:'#48BBEC',
        paddingBottom:100,
    },
    container: {
        backgroundColor:'#fff',
        borderWidth:1,
        borderRadius:8,
        borderColor:'#48BBEC',
        justifyContent: 'center',
        padding: 10,
        marginBottom:30
    },
    buttonText: {
        fontSize: 25,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 60,
        borderRadius:8,
        backgroundColor: '#3E5B76',
        borderColor: '#3E5B76',
        marginTop: 20,
        marginBottom: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        width:'100%'
    }
  })
  
export default LogTimeSheetScreen