import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    FlatList
  } from 'react-native'
import { List, ListItem } from "react-native-elements"

class ProjectIndexScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            projects: Object.values(this.props.projects),
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
        return (
            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0, marginTop:0 }}>
                <FlatList
                    data={this.state.projects}
                    renderItem={({ item }) => (
                    <ListItem
                        onPress = {() => {this.props.navigateToProjectShow(item)}}
                        title={`${item.name}`}
                        hideChevron
                        subtitle={
                            <View style={styles.subtitleView}>
                            <Text style={styles.ratingText} numberOfLines={3}>{item.description}</Text>
                        </View>
                                }
                        containerStyle={{ borderBottomWidth: 0 }}
                    />
                    )}
                    keyExtractor={item => item.id.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </List>
        )
    }
}

const styles = StyleSheet.create({
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
      },
      ratingText: {
        paddingLeft: 10,
        color: 'grey'
      },    
  })
    
export default ProjectIndexScreen