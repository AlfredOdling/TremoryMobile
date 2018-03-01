import {
  FETCHING_ACCEPT_FRIEND_REQUEST,
  FETCHING_ACCEPT_FRIEND_REQUEST_SUCCESS,
  FETCHING_ACCEPT_FRIEND_REQUEST_FAILURE,
  FETCHING_DECLINE_FRIEND_REQUEST,
  FETCHING_DECLINE_FRIEND_REQUEST_SUCCESS,
  FETCHING_DECLINE_FRIEND_REQUEST_FAILURE,
  FETCHING_FRIENDS,
  FETCHING_FRIENDS_SUCCESS,
  FETCHING_FRIENDS_FAILURE,
  SEND_FRIEND_REQUEST,
  SEND_FRIEND_REQUEST_SUCCESS,
  SEND_FRIEND_REQUEST_FAILURE,
  DELETING_FRIEND,
  DELETE_FRIEND_SUCCESS,
  DELETE_FRIEND_FAILURE,
} from "./friendsActionTypes"

import { fetch, fetchSuccess, fetchFailure } from './fetchActions'
import { respondRequest } from '../../utils/static/FriendFetch'
import { getNotificationData, getNotificationStatus } from '../../src/Actions/notificationActions'
import { getFriends, sendFriendRequest, deleteFriend } from '../../utils/static/FriendFetch'

export function _getFriends(id) {
  return async (dispatch, getState) => {
    dispatch(fetch(FETCHING_FRIENDS))
    id = id ? id : await getState().userReducer.currentUserReducer.currentUser.id

    let response = await getFriends(id)

    if (response) {
      dispatch(fetchSuccess(FETCHING_FRIENDS_SUCCESS, response ))
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_FRIENDS_FAILURE))
    }
  }
}

export function _sendFriendRequest(id) {
  return async (dispatch) => {
    dispatch(fetch(SEND_FRIEND_REQUEST))
    
    let response = await sendFriendRequest(id)

    console.log('====================================');
    console.log('response', response);
    console.log('====================================');

    if (response) {
      dispatch(fetchSuccess(SEND_FRIEND_REQUEST_SUCCESS, response ))
    } else if (!response) {
      dispatch(fetchFailure(SEND_FRIEND_REQUEST_FAILURE))
    }
  }
}

export function _acceptFriendRequest(request_id) {
  return async (dispatch) => {
    dispatch(fetch(FETCHING_ACCEPT_FRIEND_REQUEST))

    let response = await respondRequest(request_id, 3)

    if (response) {
      dispatch(fetchSuccess(FETCHING_ACCEPT_FRIEND_REQUEST_SUCCESS))
      dispatch(getNotificationData())
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_ACCEPT_FRIEND_REQUEST_FAILURE, response))
    }
  }
}

export function _declineFriendRequest(request_id) {
  return async (dispatch) => {
    dispatch(fetch(FETCHING_DECLINE_FRIEND_REQUEST))

    let response = await respondRequest(request_id, 2)

    if (response) {
      dispatch(fetchSuccess(FETCHING_DECLINE_FRIEND_REQUEST_SUCCESS))
      dispatch(getNotificationData())
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_DECLINE_FRIEND_REQUEST_FAILURE, response))
    }
  }
}

export function _deleteFriend(user_id) {
  return async (dispatch) => {
    dispatch(fetch(DELETING_FRIEND))

    let response = await deleteFriend(user_id)

    if (response) {
      dispatch(fetchSuccess(DELETE_FRIEND_SUCCESS))
    } else if (!response) {
      dispatch(fetchFailure(DELETE_FRIEND_FAILURE, response))
    }
  }
}

export {
  FETCHING_ACCEPT_FRIEND_REQUEST,
  FETCHING_ACCEPT_FRIEND_REQUEST_SUCCESS,
  FETCHING_ACCEPT_FRIEND_REQUEST_FAILURE,
  FETCHING_DECLINE_FRIEND_REQUEST,
  FETCHING_DECLINE_FRIEND_REQUEST_SUCCESS,
  FETCHING_DECLINE_FRIEND_REQUEST_FAILURE,
  FETCHING_FRIENDS,
  FETCHING_FRIENDS_SUCCESS,
  FETCHING_FRIENDS_FAILURE,
  SEND_FRIEND_REQUEST,
  SEND_FRIEND_REQUEST_SUCCESS,
  SEND_FRIEND_REQUEST_FAILURE,
  DELETING_FRIEND,
  DELETE_FRIEND_SUCCESS,
  DELETE_FRIEND_FAILURE,
}