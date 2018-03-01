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
} from "./actionTypes"

import { 
  getUnseenNotificationsAmount, 
  getNotifications, 
  markNotificationAsSeen
} from '../../utils/static/NotificationFetch'

export function getNotificationStatus() {
  return async (dispatch) => {
    dispatch(fetch(FETCHING_NOTIFICATION_STATUS))
    
    let response = await getUnseenNotificationsAmount()
    let hasNotifications = response.unseen_notifications > 0 ? true : false

    if (response) {
      dispatch(fetchSuccess(FETCHING_NOTIFICATION_STATUS_SUCCESS, hasNotifications))
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_NOTIFICATION_STATUS_FAILURE))
    }

  }
}

export function getNotificationData() {
  return async (dispatch) => {
    dispatch(fetch(FETCHING_NOTIFICATION_DATA))
    
    let response = await getNotifications()
    
    if (response) {
      dispatch(fetchSuccess(FETCHING_NOTIFICATION_DATA_SUCCESS, response))
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_NOTIFICATION_DATA_FAILURE, response))
    }
  }
}

export function markNotificationsAsSeen() {
  return async (dispatch) => {
    dispatch(fetch(FETCHING_MARK_NOTIFICATION_AS_UNSEEN))
    
    let response = await markNotificationAsSeen()

    if (response) {
      dispatch(fetchSuccess(FETCHING_MARK_NOTIFICATION_AS_UNSEEN_SUCCESS))
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_MARK_NOTIFICATION_AS_UNSEEN_FAILURE, response))
    }
  }
}

// ---- Reused functions ---- //
export function fetch(type) {
  return {
    type
  }
}

export function fetchSuccess(type, data) {
  if (data) {return { type, data }} 
  else {return { type }}
}

export function fetchFailure(type, errorMsg) {
  return {
    type,
    errorMsg
  }
}

export {
  FETCHING_NOTIFICATION_STATUS, // NOTIFICATION
  FETCHING_NOTIFICATION_STATUS_SUCCESS,
  FETCHING_NOTIFICATION_STATUS_FAILURE,
  FETCHING_NOTIFICATION_DATA, // NOTIFICATION
  FETCHING_NOTIFICATION_DATA_SUCCESS,
  FETCHING_NOTIFICATION_DATA_FAILURE,
  FETCHING_MARK_NOTIFICATION_AS_UNSEEN, // NOTIFICATION
  FETCHING_MARK_NOTIFICATION_AS_UNSEEN_SUCCESS,
  FETCHING_MARK_NOTIFICATION_AS_UNSEEN_FAILURE
}