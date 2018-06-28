import axios from 'axios'
import { AUTHORIZE_API} from './serviceConstants'
import { Alert } from 'react-native'
import {commonActions} from "../actions/index"
import store from '../store'

export async function authorize(username, password) {
    let auth = {
        username,
        password
    }
    store.dispatch(commonActions.fetchingData())
    try {
        let res = await axios.get(AUTHORIZE_API, { auth })
        let user = res.data.user
        store.dispatch(commonActions.fetchingSuccess())
        user.fullname = user.firstname + " " + user.lastname
        return user
    } catch (err) {
        store.dispatch(commonActions.fetchingError())
        Alert.alert(
            'Authenticate has failed',
            `${err}`,
            [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: true }
          )          
        return false
    }
}

export function auth_credentical() {
    return {
        username: store.getState().accountReducer.logged_user.username,
        password: store.getState().accountReducer.logged_user.password
    }
}

