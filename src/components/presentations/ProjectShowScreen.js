import React, { Component } from 'react'
import {
    View,
    Text,
    FlatList
  } from 'react-native'
import { List, ListItem } from "react-native-elements"
import AccordionItem from './partial/AccordionItem'

class ProjectShowScreen extends Component{
  constructor(props){
    super(props)
    this.state = {
        issues: Object.values(this.props.issues),
        openIssues:undefined
    }
}

componentWillReceiveProps(nextProps){
  const issues = Object.values(nextProps.issues)
  if(issues.length > 0){
    this.setState({issues:issues})
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

render(){
  if(this.state.issues && this.state.issues.length == 0) {
    return (
      <View>
        <Text style={{padding:20,fontSize:15,fontStyle:'italic'}}>No issue to be displayed.</Text>
      </View>
    )
  }else{
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop:0 }}>
        <FlatList
              extraData={this.state}
              data={this.state.issues}
              renderItem={({ item }) => {
                return (
                <ListItem
                    onPress = {() => {
                      let openIssues = this.state.openIssues == item.id ? undefined : item.id
                      this.setState({openIssues:openIssues})
                    }}
                    hideChevron
                    title={
                    <AccordionItem item={item} openIssues={this.state.openIssues} 
                    navigator={this.props.navigator} />
                    }
                    containerStyle={{ borderBottomWidth: 0 }}
                />
                )}}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={this.renderSeparator}
            />
        </List>
      )
    }
  }
}
    
export default ProjectShowScreen