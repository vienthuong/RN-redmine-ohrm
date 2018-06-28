import React, {Component} from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    StyleSheet,
    Image
  } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

class LoginScreen extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      username:"",
      password:""
    }
  }

  render(){
    return (
      <View style={styles.wrapper}>
          <Spinner visible={this.props.isLoading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
          <View style={styles.logoWrapper}>
          <Image
          source={require('../../img/3s_logo_8976x8976.png')} style={styles.logo}
        />
        </View>
        <View style={styles.container}>
          <TextInput onChangeText={text => this.setState({username:text})} placeholder="Username" />
          <TextInput onChangeText={text => this.setState({password:text})} secureTextEntry={true} placeholder="Password" />
        </View>
        <TouchableHighlight underlayColor='#48BBEC' style={styles.button} onPress={ () => {this.props.onLoginPress(this.state.username,this.state.password)}}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    logoWrapper:{
      flex: 0.35,
      justifyContent: 'center',
      alignSelf:'center'
    },
    logo:{
    },
    wrapper:{
      backgroundColor:'#48BBEC',
      flex:1,
      justifyContent: 'center',
      paddingHorizontal:10
    },
    container: {
      borderWidth:1,
      borderRadius:8,
      borderColor:'#ffffff',
      backgroundColor:'#ffffff',
      flex: 0.35,
      justifyContent: 'center',
      paddingHorizontal: 10
    },
    buttonText: {
      fontSize: 25,
      color: 'white',
      alignSelf: 'center'
    },
    button: {
        height: 60,
        backgroundColor: '#3E5B76',
        borderColor: '#3E5B76',
        borderRadius:8,
        marginTop: 20,
        marginBottom: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        width:'100%'
    }
  })
  
export default LoginScreen
