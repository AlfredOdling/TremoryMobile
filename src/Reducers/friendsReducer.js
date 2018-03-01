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
} from '../Actions/friendsActionTypes'
import { combineReducers } from "redux"

const fetchingData = {
  isFetching: false,
  fetched: false,
  error: false,
  errorMsg: '',
}

const initialState = {
  sendFriendRequest: {
    ...fetchingData,
  },
  acceptFriendRequest: {
    ...fetchingData,
  },
  declineFriendRequest: {
    ...fetchingData,
  }, 
  deleteFriendRequest: {
    ...fetchingData,
  }, 
  friendList: {
    ...fetchingData,
    friends: {},
  },
}

const { sendFriendRequest, acceptFriendRequest, declineFriendRequest, deleteFriendRequest, friendList } = initialState

const sendFriendRequestReducer = (state = sendFriendRequest, action) => {
  switch(action.type) {
    case SEND_FRIEND_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case SEND_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
      }
    case SEND_FRIEND_REQUEST_FAILURE:
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

const acceptFriendRequestReducer = (state = acceptFriendRequest, action) => {
  switch(action.type) {
    case FETCHING_ACCEPT_FRIEND_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_ACCEPT_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
      }
    case FETCHING_ACCEPT_FRIEND_REQUEST_FAILURE:
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

const declineFriendRequestReducer = (state = declineFriendRequest, action) => {
  switch(action.type) {
    case FETCHING_DECLINE_FRIEND_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_DECLINE_FRIEND_REQUEST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
      }
    case FETCHING_DECLINE_FRIEND_REQUEST_FAILURE:
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

const deleteFriendRequestReducer = (state = deleteFriendRequest, action) => {
  switch(action.type) {
    case DELETING_FRIEND:
      return {
        ...state,
        isFetching: true,
      }
    case DELETE_FRIEND_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
      }
    case DELETE_FRIEND_FAILURE:
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

const friendListReducer = (state = friendList, action) => {
  switch (action.type) {
    case FETCHING_FRIENDS:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_FRIENDS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        friends: action.data,
      }
    case FETCHING_FRIENDS_FAILURE:
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

const friendsReducer = combineReducers({
  sendFriendRequestReducer,
  acceptFriendRequestReducer,
  declineFriendRequestReducer,
  deleteFriendRequestReducer,
  friendListReducer,
})

export default friendsReducer