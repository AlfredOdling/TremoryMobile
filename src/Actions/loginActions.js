import {
  FETCHING_LOGIN_DATA,
  FETCHING_LOGIN_DATA_SUCCESS,
  FETCHING_LOGIN_DATA_FAILURE,
} from "./actionTypes"
import { AsyncStorage } from 'react-native'
import { login } from '../../utils/static/Auth'

export function loginUser(email, password) {
  return async (dispatch) => {
    dispatch(getLoginData())

    await login(email, password).then((data) => {
      if (!data.error) {
        handleAuthData(data)
        dispatch(getLoginDataSuccess())
      }
    }).catch((error) => {
      dispatch(getLoginDataFailure(error))
    })
  }
}

async function handleAuthData(user) {
  await AsyncStorage.setItem('user', JSON.stringify(user)).catch((error) => { console.error(error); });
  await AsyncStorage.setItem('authID', user.authID).catch((error) => { console.error(error); });
  await AsyncStorage.setItem('userID', user.id.toString()).catch((error) => { console.error(error); });
}

export function getLoginData() {
  return {
    type: FETCHING_LOGIN_DATA
  }
}

export function getLoginDataSuccess() {
  return {
    type: FETCHING_LOGIN_DATA_SUCCESS,
    // data, // No need to save data atm
  }
}

export function getLoginDataFailure(errorMsg) {
  return {
    type: FETCHING_LOGIN_DATA_FAILURE,
    errorMsg
  }
}

export {
  FETCHING_LOGIN_DATA,
  FETCHING_LOGIN_DATA_SUCCESS,
  FETCHING_LOGIN_DATA_FAILURE,
}
