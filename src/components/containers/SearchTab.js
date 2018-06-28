import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native'
import { connect } from 'react-redux'

class SearchTab extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          SEARCH!!!
        </Text>
        <Button style={styles.button} onPress={() => { this.props.navigator.pop() }} title="Back"/>
        <Button style={styles.button} onPress={() => { this.props.navigator.push({ screen: 'Route.TestComponent', backButtonHidden:false}) }} title="Next"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  button: {
    flex:0.5
  }
})
export default connect()(SearchTab)