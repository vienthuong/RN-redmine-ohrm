import React from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Linking
  } from 'react-native'
import moment from 'moment'
import { Badge,Icon } from "react-native-elements"

renderCustomFields = (cfs) => {
    const cfs_text = []
    if(cfs && cfs.length > 0){
        cfs.map(function(cf){
            if(cf.value){
                cfs_text.push(<Text key={cf.id} style={styles.issue_info}>{cf.name}: {cf.value}</Text>)
            }
        })
    }
    return cfs_text
}

renderAttachments = (attachments) => {
    const atts = []
    attachments.map(att => {
        atts.push(<TouchableOpacity onPress={() => Linking.openURL(att.content_url)} key={att.id} style={styles.issue_info_wrapper}><Icon style={{flex:0.2}} name='attachment' type='material-community'/><Text style={styles.timestamp}> {att.filename} - {att.author.name} - {moment(att.created_on).fromNow()}</Text></TouchableOpacity>)
    })
    return atts
}

renderJournals = (journals) => {
    const journals_text = []
    journals.map(journal => {
        if(journal.notes != ""){
        journals_text.push(
        <View key={journal.id} style={styles.containerSmall}>
           <Text style={styles.timestamp}> 
            Updated by {journal.user.name} {moment(journal.created_on).fromNow()}
           </Text>
           <Text>
                {journal.notes}   
            </Text>
        </View>)
        }
    })
    return journals_text
}

const IssueShowScreen = (props) => {
    const issue = props.issue
    console.log(props.issue)
    if(Object.keys(issue).length > 0) {
    return (
      <ScrollView style={styles.wrapper}>
        <View style={styles.container}>
            <Text style={styles.subject}>{issue.subject}</Text>
            <Text style={styles.timestamp}><Text>Created by </Text><Text style={styles.username}>{issue.author.name}</Text><Text> at {moment(issue.created_on).fromNow()}. {issue.created_on != issue.updated_on ? `Updated on ${moment(issue.updated_on).fromNow()} ago.`: ""}</Text></Text>
        </View>
        <View style={styles.container}>
            <View style={styles.issue_info_wrapper}>
                <View style={{width:'50%',flexDirection:'row', flexWrap:'wrap'}}>
                    <Text>Status: </Text>
                    { issue.status.name == 'Closed' && 
                    <Badge containerStyle={{ backgroundColor: '#3E5B76'}} textStyle={styles.badgeText} value={issue.status.name}></Badge>
                    }
                    { issue.status.name == 'Corrected' && 
                    <Badge containerStyle={{ backgroundColor: 'purple'}} textStyle={styles.badgeText} value={issue.status.name}></Badge>
                    }
                    { issue.status.name == 'Assigned' && 
                    <Badge containerStyle={{ backgroundColor: 'green'}} textStyle={styles.badgeText} value={issue.status.name}></Badge>
                    }
                    { issue.status.name == 'Confirming' && 
                    <Badge containerStyle={{ backgroundColor: 'orange'}} textStyle={styles.badgeText} value={issue.status.name}></Badge>
                    }
                </View>
                {issue.start_date && 
                <Text style={styles.issue_info}>Start date: {issue.start_date}</Text>
                }
                <Text style={styles.issue_info}>Priority: {issue.priority.name}</Text>
                {issue.due_date && 
                <Text style={styles.issue_info}>Due date: {issue.due_date}</Text>
                }
                <Text style={styles.issue_info}><Text>Assignee: </Text><Text style={styles.username}>{issue.assigned_to.name}</Text></Text>
                <Text style={styles.issue_info}>% Done: {issue.done_ratio}%</Text>
                {issue.category && 
                <Text style={styles.issue_info}>Category: {issue.category.name}</Text>
                }
                {issue.estimated_hours && 
                <Text style={styles.issue_info}>Estimated Time: {issue.estimated_hours} hours</Text>
                }
                <View style={{width:'50%',display:'flex',flexDirection:'row', flexWrap:'wrap'}}>
                    <Text>Tracker: </Text>
                    { issue.tracker.name == 'Bug' && 
                    <Badge containerStyle={{ backgroundColor: 'red'}} textStyle={styles.badgeText} value={issue.tracker.name}></Badge>
                    }
                    { issue.tracker.name == 'Task' && 
                    <Badge containerStyle={{ backgroundColor: '#3E5B76'}} textStyle={styles.badgeText} value={issue.tracker.name}></Badge>
                    }
                </View>
                {renderCustomFields(issue.custom_fields)}
            </View>
        </View>
        { issue.description != "" &&
        <View style={styles.container}>
            <Text style={styles.description}>Description: </Text>
            <Text>{issue.description}</Text>
        </View>
        }
        { (issue.attachments && issue.attachments.length > 0) &&
        <View style={styles.container}>
            <Text style={styles.description}>Attachments: </Text>
            {renderAttachments(issue.attachments)}
        </View>
        }
        { (issue.journals && issue.journals.length > 0) &&
        <View style={styles.container}>
            <Text style={styles.description}>Comment: </Text>
            {renderJournals(issue.journals)}
        </View>
        }
      </ScrollView>
    )
    }else{
        return (
            <View>
                <Text style={{padding:20,fontSize:15,fontStyle:'italic'}}>No data to be displayed.</Text>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    badgeText:{
        color:'white',
        fontSize:12
    },
    username:{
        fontWeight:'bold',
    },
    issue_info:{
        textAlign:'left',
        width:'50%'
    },
    issue_info_wrapper:{
        flexDirection:'row', 
        flexWrap:'wrap',
        width:'100%',
        alignItems:'center',
        flex:1
    },
    subject:{
        fontSize:20,
        fontWeight:'bold'
    },
    trackerText:{
        width:20,
        color:'white',
        backgroundColor:'#3E5B76'
    },
    description:{
        fontWeight:'bold'
    },
    timestamp:{
        flex:0.8,
        fontSize:12,
        fontStyle:'italic'
    },
    wrapper:{
        padding:10,
        backgroundColor:'#48BBEC'
    },
    lightboxOuter: {
		justifyContent: 'center',
		alignItems: 'center',
	},
    container: {
        backgroundColor:'#fff',
        borderWidth:1,
        borderRadius:8,
        borderColor:'#48BBEC',
        flex:0.6,
        justifyContent: 'center',
        padding: 10
    },
    containerSmall:{
        backgroundColor:'#fff',
        borderWidth:1,
        borderRadius:8,
        borderColor:'#48BBEC',
        flex:0.6,
        justifyContent: 'center',
        padding: 10,
        marginTop:10
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
  
export default IssueShowScreen