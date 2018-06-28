import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Icon } from 'react-native-elements'

class ErrorMessage extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Icon color="#fff" name='alert-circle-outline' type='material-community'/>
        <Text style={styles.title}>
            {' ' + this.props.message}
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
    flexWrap:'wrap',
    height: 55,
    width: deviceWidth,
    backgroundColor: 'rgba(244, 67, 54,0.7)',
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center'
  },
  title: {
    fontSize: 14,
    color:'white',
    fontWeight:'bold',
    textAlign: 'center',
    borderColor:'#757575'
  },
})
export default ErrorMessage