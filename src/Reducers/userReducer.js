import {
  FETCHING_USER,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILURE,
  FETCHING_OTHER_USER,
  FETCHING_OTHER_USER_SUCCESS,
  FETCHING_OTHER_USER_FAILURE,
} from '../Actions/userActionTypes'
import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/es/storage"

const fetchingData = {
  isFetching: false,
  fetched: false,
  error: false,
  errorMsg: '',
}

const initialState = {
  currentUser: {
    ...fetchingData,
    currentUser: {},
  },
  getOtherUserById: {
    ...fetchingData,
    otherUser: {},
  },
}

const { currentUser, getOtherUserById } = initialState

const currentUserReducer = (state = currentUser, action) => {
  switch (action.type) {
    case FETCHING_USER:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        currentUser: action.data,
      }
    case FETCHING_USER_FAILURE:
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

const getOtherUserByIdReducer = (state = getOtherUserById, action) => {
  switch (action.type) {
    case FETCHING_OTHER_USER:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_OTHER_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        otherUser: action.data,
      }
    case FETCHING_OTHER_USER_FAILURE:
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

const configPersistedReducer = { key: "userReducer", storage }

const userReducer = combineReducers({
  currentUserReducer: persistReducer(configPersistedReducer, currentUserReducer),
  getOtherUserByIdReducer,
})

export default userReducer