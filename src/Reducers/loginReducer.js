import {   
  FETCHING_LOGIN_DATA,
  FETCHING_LOGIN_DATA_SUCCESS,
  FETCHING_LOGIN_DATA_FAILURE, } from '../Actions/actionTypes'

const initialState = { 
  isLoggedIn: false,
  isFetching: false,
  fetched: false,
  error: false,
  errorMsg: '',
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_LOGIN_DATA:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_LOGIN_DATA_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isFetching: false,
        fetched: true,
      }
    case FETCHING_LOGIN_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.errorMsg,
      }

    default:
      return state
  }
}

export default loginReducer