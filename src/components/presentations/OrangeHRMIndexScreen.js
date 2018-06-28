import React from 'react'
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image
  } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

const OrangeHRMIndexScreen = (props) => {
    return (
      <ScrollView>
      <View style={styles.container}>
        <Spinner visible={props.isLoading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        <View style={styles.welcomeWrapper}>
        <View style={styles.logoWrapper}>
          <Image
          source={require('../../img/hrm_logo.png')} style={styles.logo}
        />
        </View>
        </View>
        <View style={styles.buttonBox}>
          <TouchableOpacity style={styles.button} onPress={() => { props.navigator.push({ screen: 'Route.OrangeHRMApplyLeaveContainer', backButtonHidden:false,title:'Apply Leave', navigatorStyle:{tabBarBackgroundColor: '#F28C38', tabBarSelectedButtonColor: 'white'}}) }}><Text style={styles.buttonText}>Apply Leave</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { props.navigator.push({ screen: 'Route.OrangeHRMMyLeaveContainer', backButtonHidden:false,title:'My Leave', navigatorStyle:{tabBarBackgroundColor: '#F28C38', tabBarSelectedButtonColor: 'white'}}) }}><Text style={styles.buttonText}>My Leave</Text></TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    logoWrapper:{
      flex: 0.35,
      justifyContent: 'center',
      alignSelf:'center'
    },
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
      height:200,
      justifyContent:'center',
      margin: 10
    },
    welcome:{
      fontSize: 30,
      textAlign: 'center',
      fontWeight:'bold'
    }
  })
    
export default OrangeHRMIndexScreen