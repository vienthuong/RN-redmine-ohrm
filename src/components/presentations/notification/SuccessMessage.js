import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Icon } from 'react-native-elements'

class SuccessMessage extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Icon color='#fff' name='check' type='material-community'/>  
        <Text style={styles.title}>
          {` ${this.props.message}`}
        </Text>
      </View>
    )
  }
}

const Dimensions = require('Dimensions')
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  wrapper: {
    flexDirection:'row',
    height: 55,
    width: deviceWidth,
    backgroundColor: 'rgba(76, 175, 80,0.7)',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
  },
  title: {
    fontSize: 18,
    color:'white',
    fontWeight:'bold',
    textAlign: 'center',
    borderColor:'#757575'
  },
})
export default SuccessMessage