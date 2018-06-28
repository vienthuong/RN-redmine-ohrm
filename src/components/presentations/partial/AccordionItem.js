import React from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet
  } from 'react-native'
import moment from 'moment'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

const AccordionItem = (props) => {
    const item = props.item
    const SECTIONS = [
        {
          title: (<Text>#{item.id}-{item.subject}</Text>),
          content: (<View style={styles.subtitleView}>
          <Text>Status: {item.status.name}</Text>
          <Text style={styles.ratingText}>Assignee: {item.assigned_to.name}</Text>
          { item.due_date != undefined && 
          <Text style={item.due_date > moment().format("YYYY-MM-DD") ? styles.ratingText : styles.errorText}>Due Date: {item.due_date}</Text>
          }
      </View>)
        }
      ]
    return (
        <View>
            { props.openIssues != item.id ?
            (            
            <View>
                <View>
                    <Text style={styles.titleNormal}>#{item.id} - {item.subject}</Text>
                </View>
                <View style={styles.subtitleView}>
                    <Text>Status: {item.status.name}</Text>
                    <Text style={styles.ratingText}>Assignee: {item.assigned_to.name}</Text>
                    { item.due_date != undefined && 
                    <Text style={item.due_date > moment().format("YYYY-MM-DD") ? styles.ratingText : styles.errorText}>Due Date: {item.due_date}</Text>
                    }
                </View>
            </View>):(
                <View>
                    <View>
                        <Text style={styles.titleBold}>#{item.id} - {item.subject}</Text>
                    </View>
                    <View>
                        <Text>{item.description}</Text>
                        <View style={styles.subtitleView}>
                            <Text>Status: {item.status.name}</Text>
                            <Text style={styles.ratingText}>Assignee: {item.assigned_to.name}</Text>
                            { item.due_date != undefined && 
                            <Text style={item.due_date > moment().format("YYYY-MM-DD") ? styles.ratingText : styles.errorText}>Due Date: {item.due_date}</Text>
                            }
                        </View>
                        <View style={{width:'100%',display:'flex',flexDirection:'row',marginLeft:-15,marginTop:10}}>
                            <Button
                                raised
                                onPress={()=> props.navigator.push({ screen: 'Route.IssueShowContainer', backButtonHidden:false,title:`#${item.id} - ${item.subject}`,passProps:{issue : item,issue_id : item.id}}) }
                                buttonStyle={{flex:0.5}}
                                borderRadius={8}
                                backgroundColor='#0D47A1'
                                icon={{name: 'details'}}
                                title='Detail' />
                            <Button
                                raised
                                onPress={()=> props.navigator.push({ screen: 'Route.LogTimeSheetContainer', backButtonHidden:false,title:`#${item.id} - Spent Time`,passProps:{selectedIssue : item}}) }
                                buttonStyle={{flex:0.5}}
                                borderRadius={8}
                                backgroundColor='#F44336'
                                icon={{name: 'access-alarms'}}
                                title='Log Time' />
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    titleBold:{
        padding:5,
        borderRadius:8,
        fontSize:16,
        backgroundColor:'#3E5B76',
        color:'white'
    },
    titleNormal:{
        padding:5,
        borderRadius:8,
        fontSize:14,
        backgroundColor:'#ddd',
    },
    subtitleView: {
      flexDirection: 'row',
      paddingTop: 5
    },
    ratingText: {
      paddingLeft: 10,
      color: 'grey'
    },
    errorText: {
      paddingLeft: 10,
      color: 'red'
    },  
    buttonBox:{
      flex:0.5,
      flexDirection:'column',
      justifyContent: 'space-between'
    },
    button:{
      paddingTop:'10',
      paddingBottom:'10'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    welcome: {
      flex:0.2,
      fontSize: 20,
      textAlign: 'center',
      margin: 10
    }
  })
  
  
export default AccordionItem