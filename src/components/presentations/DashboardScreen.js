import React from 'react'
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity
  } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

const DashboardScreen = (props) => {
    return (
      <ScrollView>
      <View style={styles.container}>
        <Spinner visible={props.isLoading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        <View style={styles.welcomeWrapper}>
          <Text style={styles.welcome}>
              HOME
          </Text>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity style={styles.button} onPress={() => { props.navigator.push({ screen: 'Route.LogTimeSheetContainer', backButtonHidden:false,title:'Spent Time'}) }}><Text style={styles.buttonText}>Log Time</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { props.navigator.push({ screen: 'Route.ProjectIndexContainer', backButtonHidden:false,title:'Projects'}) }}><Text style={styles.buttonText}>Projects</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { props.navigator.push({ screen: 'Route.TimeEntriesContainer', backButtonHidden:false,title:'Time Entries'}) }}><Text style={styles.buttonText}>Time Entries</Text></TouchableOpacity>
          <TouchableOpacity style={styles.buttonHRM} onPress={() => { props.checkHRMAccess() }}><Text style={styles.buttonText}>Orange HRM</Text></TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    buttonBox:{
      flex:0.5,
      justifyContent:'space-between',
      flexDirection:'column',
    },
    buttonText: {
      fontSize: 24,
      color: 'white',
      alignSelf: 'center'
    },
    button: {
      padding:10,
      height: 60,
      marginBottom:30,
      borderRadius:8,
      backgroundColor: '#3E5B76',
      borderColor: '#3E5B76',
      alignSelf: 'center',
      justifyContent: 'center',
      width:300
    },
    buttonHRM: {
      padding:10,
      height: 60,
      marginBottom:30,
      borderRadius:8,
      backgroundColor: '#F28C38',
      borderColor: '#3E5B76',
      alignSelf: 'center',
      justifyContent: 'center',
      width:300
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF'
    },
    welcomeWrapper: {
      height:160,
      justifyContent:'center',
      margin: 10
    },
    welcome:{
      fontSize: 30,
      textAlign: 'center',
      fontWeight:'bold'
    }
  })
    
export default DashboardScreen