import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  Button,
  View,
  ScrollView,
  FlatList
} from 'react-native'
import { List, ListItem } from "react-native-elements"

class ShowProjectInfoLightBox extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          {this.props.project.name.toUpperCase()}
        </Text>
        <Text style={styles.description}>{this.props.project.description}</Text>
      <ScrollView style={styles.scrollViewrapper}>
      <View style={styles.lightboxOuter}>
        <List style={{backgroundColor:'red'}}>
        <FlatList
            data={this.props.project.custom_fields}
            renderItem={({ item }) => (
            <View style={{flexDirection:'row', flexWrap:'wrap',width:'100%',flex:1}}>
              <Text style={{textAlign:'left',width:'50%'}}>{item.name}:</Text>
              <Text style={{textAlign:'right',width:'50%'}}>{item.value}</Text>
            </View>
            )}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={this.renderSeparator}
        />
    </List>
      </View>
      </ScrollView>
      </View>
    )
  }
}

const Dimensions = require('Dimensions')
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    height: deviceHeight - 160,
    width: deviceWidth - 60,
    backgroundColor: 'white'
  },
  scrollViewrapper:{
    width: '100%'
  },
  subtitleView: {
    paddingLeft: 10,
    paddingTop: 5
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },    
  lightboxOuter: {
		justifyContent: 'center',
		alignItems: 'center',
	},
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
		borderRadius: 5,
		backgroundColor: 'white'
  },
  title: {
    fontSize: 40,
    fontWeight:'bold',
    textAlign: 'center',
    borderBottomWidth: 5,
    paddingBottom:10,
    borderColor:'#757575'
  },
  description: {
    fontSize: 12,
    fontStyle:'italic',
    textAlign: 'center',
  },
  button: {
    flex:0.5
  }
})
export default ShowProjectInfoLightBox