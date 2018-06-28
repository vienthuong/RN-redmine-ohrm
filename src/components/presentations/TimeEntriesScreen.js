import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    SectionList,
    Alert
  } from 'react-native'
import t from 'tcomb-form-native'
import moment from 'moment'
import _ from 'lodash'
import { List, ListItem, Badge, Icon } from "react-native-elements"

const Form = t.form.Form

class TimeEntriesScreen extends Component {
    constructor(props) {
      super(props)
      this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))

      this.state = {
        value: {
            spent_from: new Date(),
            spent_to: new Date()
        },
        projects: this.props.projects,
        spent_from: undefined,
        spent_to: undefined,
        time_entries:this.props.time_entries,
        options : {
          fields: {
            spent_from: {
              label: 'Spent From ',
              mode: 'date',
              config: {
                format: (date) => moment(date).format('YYYY-MM-DD'),
                dialogMode:'spinner'
              },
            },
            spent_to: {
                label: 'Spent To ',
                mode: 'date',
                config: {
                  format: (date) => moment(date).format('YYYY-MM-DD'),
                  dialogMode:'spinner'
                },
              },
            project:{
              label:'Project ',
              nullOption:Object.keys(this.props.projects).length == 1 ? false : {value: '', text: 'Any projects'},
            },
          },
        }
      }
    }
    
    onNavigatorEvent(event) {
        if (event.id === 'bottomTabReselected') {
            this.props.navigator.popToRoot({
                animated: true, 
                animationType: 'fade', 
            })
        }
        if (event.id === 'add') {
            this.props.navigator.push({ screen: 'Route.LogTimeSheetContainer', backButtonHidden:false,title:'Spent Time'})
        }

        if (event.id == 'willAppear'){
            const initFilter = {
                "spent_from" : moment().format("YYYY-MM-DD"),
                "spent_to" : moment().format("YYYY-MM-DD"),
            }
            console.log(initFilter)

            this.props.getTimeEntries(initFilter).then(res => {
                console.log(res)
                if(res){
                    this.setState({time_entries:res})
                }
            })    
        }
    }
      
      
    componentWillReceiveProps(nextProps){
        if(this.state.time_entries.length == 0 && nextProps.time_entries.length > 0){
            this.setState({time_entries:nextProps.time_entries})
        }
    }
    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#3E5B76",
            }}
          />
        )
    }
    
    mapDataBySection(data){
        if(Object.keys(data).length == 0) return [] 
        const reduced = data.reduce((rv, item, index) => {
            item['index'] = index;
            (rv[item['spent_on']] = rv[item['spent_on']] || []).push(item)
            rv[item['spent_on']]['total_hours'] = rv[item['spent_on']]['total_hours'] || 0
            rv[item['spent_on']]['total_hours'] += item.hours
            return rv
          }, {})
        const sections = []
        Object.keys(reduced).map((value, index) => {
            sections.push({title:value,data:reduced[value],total_hours:reduced[value]['total_hours']})
        })
        return sections
    }

    deleteTimeEntry(id,index){
        Alert.alert(
            'Are you sure to delete this timesheet?',
            false,
            [
                {text: 'Yes', onPress: () => {
                    this.props.deleteTimeEntry(id).then(status => {
                        if(status == 200){
                            this.props.navigator.showInAppNotification({
                                screen: "Notification.SuccessMessage", 
                                passProps: {message:'Delete Timesheet Successfully'}, 
                                autoDismissTimerSec: 2 
                            })
                            const newList= this.state.time_entries
                            newList.splice(index, 1)
                            this.setState({time_entries:newList})
                        }else{
                            this.props.navigator.showInAppNotification({
                                screen: "Notification.ErrorMessage", 
                                passProps: {message:'Delete Timesheet Unsuccessfully'}, 
                                autoDismissTimerSec: 2 
                            })
                        }
                    }).catch(err => {
                        console.log(err)
                        this.props.navigator.showInAppNotification({
                            screen: "Notification.ErrorMessage", 
                            passProps: {message:'Delete timesheet unsuccessfully'}, 
                            autoDismissTimerSec: 2 
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

render(){
    const time_entries_form = t.struct({
    project: t.maybe(t.enums(this.state.projects)),
    spent_from: t.maybe(t.Date),
    spent_to: t.maybe(t.Date)
    })
    
    return (
        <ScrollView style={styles.wrapper}>
            <View  style={styles.container}>
                <Form ref="form" type={time_entries_form} options={this.state.options} value={this.state.value} styles={styles.tForm}/>
                <TouchableHighlight style={styles.button} onPress={this.onPress.bind(this)} underlayColor='#48BBEC'>
                    <Text style={styles.buttonText}>Filter</Text>
                </TouchableHighlight>
            </View>
            <Text style={styles.highlightText}>Time Entries History</Text>
            <View style={styles.timeEntriesContainer}>
                <ScrollView>
                    <View>
                        <List containerStyle={styles.listWrapper}>
                            <SectionList
                                ListHeaderComponent={() => {
                                    return (
                                        <View style={styles.listItemWrapperHeader}>
                                            <Text style={{flex:1.5,textAlign:'center',fontWeight:'bold',color:'#fff'}}>Activity</Text>                           
                                            <Text style={{flex:3.5,textAlign:'center',fontWeight:'bold',color:'#fff'}}>Project</Text>
                                            <Text style={{flex:2,textAlign:'center',fontWeight:'bold',color:'#fff'}}>Issue</Text>
                                            <Text style={{flex:1.5,textAlign:'center',fontWeight:'bold',color:'#fff'}}>Hours</Text>
                                            <Text style={{flex:1.5,textAlign:'center',fontWeight:'bold',color:'#fff'}}>Action</Text>
                                        </View>
                                    )
                                }}
                                renderSectionHeader={({section: {title,total_hours}}) => (
                                    <View style={styles.sectionHeaderBar}>
                                        <Text style={styles.sectionHeaderTextTitle}>{title}</Text>
                                        <Text style={styles.sectionHeaderTextSubtitle}>({moment(title).format("YYYY-MM-DD") == moment().format("YYYY-MM-DD") ? "Today" : moment(title).add(1,"d").fromNow()})</Text>
                                        <Text style={styles.sectionHeaderTextHours}>{total_hours}</Text>
                                        <View style={styles.sectionHeaderBlank}></View>
                                    </View>
                                )}
                                ListEmptyComponent={() => {
                                    return (
                                        <View style={{padding:10}}>
                                            <Text>No data to be displayed</Text>
                                        </View>
                                    )
                                }}
                                sections={this.mapDataBySection(this.state.time_entries)}                    
                                renderItem={({ item }) => (
                                <ListItem
                                    title={
                                    <View style={styles.listItemWrapper}>
                                        <Badge containerStyle={{ backgroundColor: '#3E5B76',flex:1.5, padding:6,margin:0,width:60,marginRight:5}} textStyle={styles.badgeText} value={item.activity.name}></Badge>                            
                                        <TouchableHighlight underlayColor="transparent" style={{flex:3.5}} onPress={() => this.props.navigator.push({ screen: 'Route.ProjectShowContainer', backButtonHidden:false,title:item.project.name,passProps:{project : item.project}})}><Text style={{textAlign:'left'}}>{item.project.name}</Text></TouchableHighlight>
                                        <TouchableHighlight underlayColor="transparent" style={{flex:2}} onPress={() => this.props.navigator.push({ screen: 'Route.IssueShowContainer', backButtonHidden:false,title:`#${item.issue.id}`,passProps:{issue_id : item.issue.id}})}><Text style={{textAlign:'left'}}>{`#${item.issue.id}`}</Text></TouchableHighlight>
                                        <Text style={{flex:1.5,textAlign:'center'}}>{item.hours}</Text>
                                        <Icon onPress={() => this.deleteTimeEntry(item.id,item.index)} containerStyle={{flex:1.5,justifyContent:'center',alignContent:'center',alignItems:'center'}} name='delete' type='material-community' color="#3E5B76"/>
                                    </View>
                                }
                                hideChevron
                                containerStyle={{ borderBottomWidth: 0,width:'100%' }}
                                />
                                )}
                                keyExtractor={(item,index) => item.id}
                                ItemSeparatorComponent={this.renderSeparator}
                            />
                        </List>
                    </View>
                </ScrollView>
            </View>
            <View>
            </View>
        </ScrollView>
      )
    }

    onPress() {
      const result = this.refs.form.getValue()
      if (result) {
        const filter = {
          project_id: result.project,
          spent_from: moment(result.spent_from).format('YYYY-MM-DD'),
          spent_to: moment(result.spent_to).format('YYYY-MM-DD'),
        }

        this.props.getTimeEntries(filter).then(res => {
            if(res){
                this.setState({time_entries:res,value:result})
            }
        })
      } 
    }
}

const styles = StyleSheet.create({
    sectionHeaderBar:{
        paddingHorizontal:10,
        paddingVertical:5,
        backgroundColor:'#3E5B76',
        borderWidth:1,
        flexDirection:'row'
    },
    sectionHeaderTextTitle:{
        fontSize:14,
        textAlign:'left',
        color:'#fff',
        flex:2.2
    },
    sectionHeaderTextSubtitle:{
        fontSize:14,
        textAlign:'left',
        color:'#fff',
        flex:4.8
    },
    sectionHeaderTextHours:{
        fontSize:14,
        color:'#fff',
        textAlign:'center',
        flex:1.5
    },
    sectionHeaderBlank:{
        flex:1.5
    },
    badgeText:{
        fontSize:12,
        textAlign:'center'
    },
    listWrapper:{
        marginTop: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderBottomColor: "transparent",
        borderTopRightRadius:8,
        borderTopLeftRadius:8
    },
    listItemWrapperHeader:{
        flexDirection:'row', 
        flexWrap:'wrap',
        padding:8,
        backgroundColor:'#3E5B76',
        justifyContent:'center',
        borderTopRightRadius:8,
        borderTopLeftRadius:8
    },
    listItemWrapper:{
        width:'100%',
        flexDirection:'row', 
        flexWrap:'wrap',
        justifyContent:'center',
        paddingRight:0,
    },
    highlightText:{
        fontSize:20,
        color:'#000',
        marginVertical:5,
        fontWeight:'bold'
    },
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
    },
    timeEntriesContainer:{
        backgroundColor:'#fff',
        borderColor:'#48BBEC',
        justifyContent: 'flex-start',
        marginBottom:30,
        borderRadius:8,
        borderRadius:8
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 40,
        borderRadius:8,
        backgroundColor: '#3E5B76',
        borderColor: '#3E5B76',
        alignSelf: 'center',
        justifyContent: 'center',
        width:'100%'
    }
  })
  
export default TimeEntriesScreen