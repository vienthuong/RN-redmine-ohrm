import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    SectionList
  } from 'react-native'
import { List, ListItem, Badge } from "react-native-elements"
import moment from 'moment'

class OrangeHRMMyLeaveScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            leaveRequests : this.props.leaveRequests
        }
    }

    componentWillReceiveProps(nextProps){
        console.log("nextProps",nextProps.leaveRequests)
        if(this.props.leaveRequests != nextProps.leaveRequests){
            this.setState({leaveRequests:nextProps.leaveRequests})
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

    getStatusesBadge = (status, days) => {
        console.log(status == 'TAKEN')
        switch(status) {
            case 'PENDING APPROVAL':
                return (<Badge containerStyle={{ backgroundColor: '#3E5B76'}} textStyle={styles.badgeText} value={`PENDING (${days})`}></Badge>)
            case 'SCHEDULED':
            case 'TAKEN':
                return (<Badge containerStyle={{ backgroundColor: 'green'}} textStyle={styles.badgeText} value={`SCHEDULED (${days})`}></Badge>)
            case 'REJECTED':
                return (<Badge containerStyle={{ backgroundColor: 'red'}} textStyle={styles.badgeText} value={`REJECTED (${days})`}></Badge>)
            case 'CANCELLED':
                return (<Badge containerStyle={{ backgroundColor: '#7986CB'}} textStyle={styles.badgeText} value={`CANCELLED (${days})`}></Badge>)
            default:
                return (<Badge containerStyle={{ backgroundColor: '#757575'}} textStyle={styles.badgeText} value={`PENDING (${days})`}></Badge>)
        }        
    }

    renderDateFromTo(from,to){
        if(from == to){
            return from
        }
        return `${from} to ${to}`
    }

    mapDataBySection(data){
        if(Object.keys(data).length == 0) return [] 
        const reduced = data.reduce((rv, item) => {
            (rv[item['type']] = rv[item['type']] || []).push(item)
            return rv
          }, {})
        const sections = []
        Object.keys(reduced).map((value, index) => {
            sections.push({title:value,data:reduced[value]})
        })
        return sections
    }
    render(){
        if(this.state.leaveRequests && this.state.leaveRequests.length > 0){
        return (
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop:0 }}>
                <SectionList
                    renderSectionHeader={({section: {title}}) => (
                        <View style={styles.sectionHeaderBar}>
                        <Text style={styles.sectionHeaderText}>{title}</Text>
                        </View>
                      )}
                    sections={this.mapDataBySection(this.state.leaveRequests)}                    
                    renderItem={({ item }) => (
                    <ListItem
                        title={
                            <View  style={{flexDirection:'row', flexWrap:'wrap'}}>
                            {this.getStatusesBadge(item.days[0].status, item.numberOfDays)}
                            <Text>  {this.renderDateFromTo(item.fromDate,item.toDate)} {item.days[0].durationString}</Text>
                            </View>
                        }
                        hideChevron
                        subtitle={
                            item.comments.comment &&
                            <Text style={styles.ratingText}>{item.comments.comment}</Text>
                                }
                        containerStyle={{ borderBottomWidth: 0 }}
                    />
                    )}
                    keyExtractor={(item,index) => item.id}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </List>
        )}else{
            return (
                <View>
                    <Text>No data to be displayed</Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    sectionHeaderBar:{
        paddingHorizontal:10,
        paddingVertical:8,
        backgroundColor:'#E65100',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
    },
    sectionHeaderText:{
        fontSize:18,
        color:'#fff'
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
      },
      ratingText: {
        paddingLeft: 10,
        color: 'grey'
      },
      badgeText: {
        color:'white',
        fontSize:10
      }
  })
    
export default OrangeHRMMyLeaveScreen