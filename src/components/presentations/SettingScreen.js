import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Alert,
    StyleSheet
  } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import t from 'tcomb-form-native'
import _ from 'lodash'

const Form = t.form.Form
const stylesheet = _.cloneDeep(Form.stylesheet)
stylesheet.formGroup.normal.flexDirection = 'row'
stylesheet.formGroup.error.flexDirection = 'row'
stylesheet.checkbox.normal.flex = 1
stylesheet.checkbox.error.flex = 1
stylesheet.checkbox.normal.justifyContent = 'flex-end'
stylesheet.checkbox.error.justifyContent = 'flex-end'

class SettingScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            stylesheet:stylesheet,
            value: {
                viewAllIssues:this.props.isViewAllIssues
            },
            options : {
            fields: {
                viewAllIssues:{
                    label:'Show closed issues ',
                    default: false,
                    stylesheet: stylesheet,
                }
            }
            }
        }
    }
    
    render(){
    const setting_form = t.struct({
        viewAllIssues: t.Boolean,
    })

    return (
        <View style={styles.wrapper}>
            <View  style={styles.settingContainer}>
                <Form ref="form" type={setting_form} options={this.state.options} onChange={this.onChange.bind(this)} value={this.state.value} />
            </View>
            <View  style={styles.settingContainer}>
                <TouchableHighlight style={styles.button} onPress={() => {this.props.logOut()}}>
                    <Text style={styles.buttonText}>Log Out</Text>
                </TouchableHighlight>
            </View>
        </View>
        )
    }

    onChange(value){
        Alert.alert(
            'Toggle display closed issues',
            'This will take a while to reload data',
            [
              {text: 'Cancel', onPress: () =>{
                  value.viewAllIssues = this.state.value.viewAllIssues
                  this.setState({value:value})        
                }, style: 'cancel'},
              {text: 'OK', onPress: () => {
                this.props.toggleViewAllIssues()
                this.setState({value:value})        
              }},
            ],
            { cancelable: true }
          )
      }
}

const styles = StyleSheet.create({
    wrapper:{
        padding:10,
        backgroundColor:'#48BBEC',
        flex:1
    },
    settingContainer: {
        backgroundColor:'#fff',
        borderWidth:1,
        borderRadius:8,
        paddingHorizontal:20,
        borderColor:'#48BBEC',
        padding: 10,
        marginBottom: 10
    },
    buttonText: {
      fontSize: 18,
      color: 'white',
      alignSelf: 'center'
    },
    button: {
        height:45,
        borderRadius:8,
        backgroundColor: '#3E5B76',
        alignSelf: 'center',
        justifyContent: 'center',
        width:'100%'
    }
  })
    
export default SettingScreen