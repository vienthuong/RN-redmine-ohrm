import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    ScrollView,
    Alert
  } from 'react-native'
import t from 'tcomb-form-native'
import moment from 'moment'
import _ from 'lodash'

const Form = t.form.Form
const stylesheet = _.cloneDeep(Form.stylesheet)
const stylesheetInline = _.cloneDeep(Form.stylesheet)
const predicate = function (x) { return x > 0 }
const Dimensions = require('Dimensions')
const deviceWidth = Dimensions.get('window').width - 40

stylesheet.textbox.normal.borderWidth = 0
stylesheet.textbox.error.borderWidth = 0
stylesheet.textbox.normal.marginBottom = 0
stylesheet.textbox.error.marginBottom = 0
stylesheet.select.normal.borderColor = '#F28C38'
stylesheet.select.normal.borderWidth = 2
stylesheet.select.normal.borderRadius = 3
stylesheet.select.error.borderWidth = 2
stylesheet.select.error.borderRadius = 3
stylesheet.textboxView.normal.borderWidth = 0
stylesheet.textboxView.error.borderWidth = 0
stylesheet.textboxView.normal.borderRadius = 0
stylesheet.textboxView.error.borderRadius = 0
stylesheet.textboxView.normal.borderBottomWidth = 2
stylesheet.textboxView.error.borderBottomWidth = 2
stylesheet.textboxView.error.borderColor = '#F28C38'
stylesheet.textboxView.normal.borderColor = '#F28C38'
stylesheet.textbox.normal.marginBottom = 5
stylesheet.textbox.error.marginBottom = 5
stylesheetInline.formGroup.normal.flexDirection = 'row'
stylesheetInline.formGroup.error.flexDirection = 'row'
stylesheetInline.checkbox.normal.flex = 1
stylesheetInline.checkbox.error.flex = 1
stylesheetInline.dateValue.normal.borderColor = '#F28C38'
stylesheetInline.dateValue.normal.borderWidth = 1
stylesheetInline.dateValue.normal.borderRadius = 8
stylesheetInline.dateValue.normal.width = deviceWidth
stylesheetInline.dateValue.error.borderColor = '#c1551f'
stylesheetInline.dateValue.error.borderWidth = 1
stylesheetInline.dateValue.error.borderRadius = 8
stylesheetInline.dateValue.error.width = deviceWidth

class OrangeHRMApplyLeaveScreen extends Component {
    constructor(props) {
      super(props)
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
      const value = {}
      value.togglePartialDay = false
      value.fromDate = new Date()
      value.toDate = new Date()
      value.singleFromTime = new Date(moment("09:00","HH:mm").format())
      value.singleToTime = new Date(moment("18:00","HH:mm").format())
      this.state = {
        value:value,
        leaveTypeList: this.props.leaveTypeList,
        options : {
          stylesheet:stylesheet,
          fields: {
            type:{
                label:'Leave Type *',
                nullOption:Object.keys(this.props.leaveTypeList).length == 1 ? false : {value: undefined, text: 'Choose a leave type'},
              },  
            fromDate: {
              label: 'From Date *',
              mode: 'date',
              stylesheet:stylesheetInline,
              config: {
                format: (date) => moment(date).format('YYYY-MM-DD').toString(),
                dialogMode:'spinner'
              },
            },
            toDate: {
                label: 'To Date *',
                mode: 'date',
                stylesheet:stylesheetInline,
                config: {
                  format: (date) => moment(date).format('YYYY-MM-DD').toString(),
                  dialogMode:'spinner'
                },
              },
            togglePartialDay:{
              label: 'Partial Day Leaving?',
              default:false,
              stylesheet:stylesheetInline
            },  
            singleFromTime:{
              label: 'From',
              mode: 'time',
              hidden:true,
              hour: 14,
              stylesheet:stylesheetInline,
              config: {
                format: (date) => moment("09:00","HH:mm").format('HH:mm'),
              },
            },
            singleToTime:{
              label: 'To',
              mode: 'time',
              hidden:true,
              stylesheet:stylesheetInline,
              config: {
                format: (date) => moment("18:00","HH:mm").format('HH:mm'),
              },
            },
            comment:{
              label: 'Comment'
            },
          },
        }
      }
    }

    componentWillReceiveProps(nextProps) {
      if(Object.keys(nextProps.leaveTypeList).length > 1){
        this.setState({
          leaveTypeList:nextProps.leaveTypeList
        })
      }
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
      if (event.id == 'apply') {
        this.onPress()
      }
    }

    render(){
      const apply_leave_form = t.struct({
        type: t.enums(this.state.leaveTypeList),
        fromDate: t.Date,
        toDate: t.Date,
        togglePartialDay: t.Boolean,
        singleFromTime: t.maybe(t.Date),
        singleToTime: t.maybe(t.Date),
        comment: t.maybe(t.String),
      })

      return (
          <ScrollView style={styles.wrapper}>
              <View key={`1`} style={styles.container}>
                <Form ref="form" type={apply_leave_form} options={this.state.options} onChange={this.onChange.bind(this)} styles={styles.tForm} value={this.state.value}/>
              </View>
              <View key={`2`}>
              </View>
              {/* <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#c1551f'>
              <Text style={styles.buttonText}>Apply</Text>
              </TouchableHighlight> */}
          </ScrollView>
      )
    }
    onChange(value){
        let options = t.update(this.state.options, {
          fields: {
            singleFromTime: {
              hidden: {'$set': value.togglePartialDay == false},
              config: {
                '$set' : {format: (date) => moment((value.singleFromTime == undefined ? "09:00" : value.singleFromTime),"HH:mm").format('HH:mm')},
              },
            },
            singleToTime: {
              hidden: {'$set': value.togglePartialDay == false},
              config: {
                '$set' : {format: (date) => moment((value.singleToTime == undefined ? "18:00" : value.singleToTime),"HH:mm").format('HH:mm')},
              },
            }
          }
        })
      
        this.setState({value:value,options: options})
    }
    onPress() {
      const result = this.refs.form.getValue()
      // ..with e isValid() method
      if (result) {
        const value = {}
        value.comment = result.comment == null ? "" : result.comment
        value.type = result.type
        value.partialOption	= "none"
        value.fromDate = moment(result.fromDate).format("YYYY-MM-DD").toString()
        value.toDate = moment(result.toDate).format("YYYY-MM-DD").toString()
        value.action = "PENDING"
        if(!result.togglePartialDay){
          value.singleType = "full_day"
        }else{
          value.singleType = "specify_time"
          value.singleFromTime = moment(result.singleFromTime).format("HH:mm").toString()
          value.singleToTime = moment(result.singleToTime).format("HH:mm").toString()
        }

        Alert.alert(
          'Do you want to apply leave?',
          false,
          [
              {text: 'Yes', onPress: () => {
                this.props.applyLeaveRequest(value).then( value => {
                  if(value.error){
                    const errorText = value.error[0] ? value.error[0] : value.error.text
                    this.props.navigator.showInAppNotification({
                      screen: "Notification.ErrorMessage", 
                      passProps: {message:errorText.toUpperCase()}, 
                      autoDismissTimerSec: 3 
                     })
                  }else{
                    this.props.navigator.showInAppNotification({
                      screen: "Notification.SuccessMessage", 
                      passProps: {message:'Apply Leave Request Successfully'}, 
                      autoDismissTimerSec: 3 
                     })
                    this.props.navigator.pop()
                  }
              }).catch(err => {
                    const errorText = value.error[0] ? value.error[0] : value.error.text
                    this.props.navigator.showInAppNotification({
                      screen: "Notification.ErrorMessage", 
                      passProps: {message:errorText.toUpperCase()}, 
                      autoDismissTimerSec: 3 
                     })
                  })
              }},
              {text: 'No', onPress: () => {
                  console.log('Cancel Clicked')
              }}
          ],
          { cancelable: true }
        ) 
      } 
    }
}

const styles = StyleSheet.create({
    wrapper:{
        padding:10,
        paddingTop:20,
        backgroundColor:'#555657'
    },
    container: {
        backgroundColor:'#fff',
        borderWidth:1,
        borderRadius:8,
        borderColor:'#555657',
        flex:0.6,
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
        backgroundColor: '#F28C38',
        borderColor: '#F28C38',
        marginTop: 20,
        marginBottom: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        width:'100%',
    }
  })
  
export default OrangeHRMApplyLeaveScreen