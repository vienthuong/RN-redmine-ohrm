import { changeAppRoot, appInitialized, initialRedmineData, removeHRMAccessToken } from './commonActions'
import { USER_LOGGED_IN,USER_LOGGED_OUT } from './constants'
import { authorize } from '../services/AccountService'
import { AsyncStorage } from 'react-native'

export function login(username, password, redirectTo = {}) {
    return async (dispatch, getState) => {
        // login logic would go here, and when it's done, we switch app roots
        let valid_user = await authorize(username,password)
        console.log("User",valid_user)
        if (valid_user){
            let user = {
                fullname: valid_user.fullname,
                username,
                password,
                id:valid_user.id
            }
            let storeUser = JSON.stringify(user)
            AsyncStorage.setItem('logged_user', storeUser)

            dispatch(saveLoggedUser(user))
            dispatch(changeAppRoot('after-login',redirectTo))
            dispatch(initialRedmineData())  
        } else {
            dispatch(changeAppRoot('login'))      
        }
    }
}

export function logout() {
    return async function(dispatch, getState) {
        dispatch({
            type:USER_LOGGED_OUT
        })
        dispatch(removeHRMAccessToken())
        await AsyncStorage.removeItem('logged_user')
        dispatch(changeAppRoot('login'))
    }
}


export function saveLoggedUser(user) {
    return {
        type: USER_LOGGED_IN, 
        user
    }
}

