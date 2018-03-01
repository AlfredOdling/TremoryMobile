import {
  FETCHING_GET_POINT_FROM_CURRENT_USER,
  FETCHING_GET_POINT_FROM_CURRENT_USER_SUCCESS,
  FETCHING_GET_POINT_FROM_CURRENT_USER_FAILURE,
  FETCHING_GET_POINTS_FROM_USER_BY_ID,
  FETCHING_GET_POINTS_FROM_USER_BY_ID_SUCCESS,
  FETCHING_GET_POINTS_FROM_USER_BY_ID_FAILURE,
  FETCHING_GET_ALBUM_POINTS,
  FETCHING_GET_ALBUM_POINTS_SUCCESS,
  FETCHING_GET_ALBUM_POINTS_FAILURE,
} from '../Actions/imagesActionTypes'
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
  getPointsFromCurrentUser: {
    ...fetchingData,
    currentUserImages: [],
  },
  getPointsFromUserById: {
    ...fetchingData,
    userByIdImages: [],
  },
  getAlbumPoints: {
    ...fetchingData,
    albumPoints: [],
  },
}

const {
  getPointsFromCurrentUser,
  getPointsFromUserById,
  getAlbumPoints
} = initialState

const getPointsFromCurrentUserReducer = (state = getPointsFromCurrentUser, action) => {
  switch (action.type) {
    case FETCHING_GET_POINT_FROM_CURRENT_USER:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_GET_POINT_FROM_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        currentUserImages: action.data,
      }
    case FETCHING_GET_POINT_FROM_CURRENT_USER_FAILURE:
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

const getPointsFromUserByIdReducer = (state = getPointsFromUserById, action) => {
  switch (action.type) {
    case FETCHING_GET_POINTS_FROM_USER_BY_ID:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_GET_POINTS_FROM_USER_BY_ID_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        userByIdImages: action.data,
      }
    case FETCHING_GET_POINTS_FROM_USER_BY_ID_FAILURE:
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

const getAlbumPointsReducer = (state = getAlbumPoints, action) => {
  switch (action.type) {
    case FETCHING_GET_ALBUM_POINTS:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_GET_ALBUM_POINTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        albumPoints: action.data,
      }
    case FETCHING_GET_ALBUM_POINTS_FAILURE:
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

const imagesReducer = combineReducers({
  getPointsFromCurrentUserReducer: persistReducer(configPersistedReducer, getPointsFromCurrentUserReducer),
  getPointsFromUserByIdReducer,
  getAlbumPointsReducer,
})

export default imagesReducer