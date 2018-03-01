import {
  FETCHING_NOTIFICATION_STATUS, // NOTIFICATION
  FETCHING_NOTIFICATION_STATUS_SUCCESS,
  FETCHING_NOTIFICATION_STATUS_FAILURE,
  FETCHING_NOTIFICATION_DATA, // NOTIFICATION
  FETCHING_NOTIFICATION_DATA_SUCCESS,
  FETCHING_NOTIFICATION_DATA_FAILURE,
  FETCHING_MARK_NOTIFICATION_AS_UNSEEN, // NOTIFICATION
  FETCHING_MARK_NOTIFICATION_AS_UNSEEN_SUCCESS,
  FETCHING_MARK_NOTIFICATION_AS_UNSEEN_FAILURE
} from '../Actions/actionTypes'
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
  notificationStatus: {
    ...fetchingData,
    hasNotifications: false,
  },
  notificationData: {
    ...fetchingData,
    data: [],
  }, 
  markNotification: {
    ...fetchingData,
    isUnseen: false,
  }, 
}

const { notificationStatus, notificationData, markNotification } = initialState

const notificationStatusReducer = (state = notificationStatus, action) => {
  switch(action.type) {
    case FETCHING_NOTIFICATION_STATUS:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_NOTIFICATION_STATUS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        hasNotifications: action.data,
      }
    case FETCHING_NOTIFICATION_STATUS_FAILURE:
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

const notificationDataReducer = (state = notificationData, action) => {
  switch(action.type) {
    case FETCHING_NOTIFICATION_DATA:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_NOTIFICATION_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        data: action.data,
      }
    case FETCHING_NOTIFICATION_DATA_FAILURE:
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

const markNotificationReducer = (state = markNotification, action) => {
  switch(action.type) {
    case FETCHING_MARK_NOTIFICATION_AS_UNSEEN:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_MARK_NOTIFICATION_AS_UNSEEN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        isUnseen: true,
      }
    case FETCHING_MARK_NOTIFICATION_AS_UNSEEN_FAILURE:
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

const configPersistedReducer = { key: "primary", storage }

const notificationReducer = combineReducers({
  notificationStatusReducer: persistReducer(configPersistedReducer, notificationStatusReducer),
  notificationDataReducer: persistReducer(configPersistedReducer, notificationDataReducer),
  markNotificationReducer: persistReducer(configPersistedReducer, markNotificationReducer) 
})

export default notificationReducer