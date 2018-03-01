import {
  FETCHING_CREATE_ALBUM,
  FETCHING_CREATE_ALBUM_SUCCESS,
  FETCHING_CREATE_ALBUM_FAILURE,
  FETCHING_ADD_POINT_TO_ALBUM,
  FETCHING_ADD_POINT_TO_ALBUM_SUCCESS,
  FETCHING_ADD_POINT_TO_ALBUM_FAILURE,
  FETCHING_ADD_USER_TO_ALBUM,
  FETCHING_ADD_USER_TO_ALBUM_SUCCESS,
  FETCHING_ADD_USER_TO_ALBUM_FAILURE,
  FETCHING_GET_ALBUMS_FROM_CURRENT_USER,
  FETCHING_GET_ALBUMS_FROM_CURRENT_USER_SUCCESS,
  FETCHING_GET_ALBUMS_FROM_CURRENT_USER_FAILURE,
  FETCHING_GET_ALBUMS_FROM_USER,
  FETCHING_GET_ALBUMS_FROM_USER_SUCCESS,
  FETCHING_GET_ALBUMS_FROM_USER_FAILURE,
  FETCHING_GET_ALBUM_USERS,
  FETCHING_GET_ALBUM_USERS_SUCCESS,
  FETCHING_GET_ALBUM_USERS_FAILURE,
  FETCHING_UPDATE_ALBUM,
  FETCHING_UPDATE_ALBUM_SUCCESS,
  FETCHING_UPDATE_ALBUM_FAILURE,
  FETCHING_REMOVE_USER_FROM_ALBUM,
  FETCHING_REMOVE_USER_FROM_ALBUM_SUCCESS,
  FETCHING_REMOVE_USER_FROM_ALBUM_FAILURE,
  FETCHING_DELETE_ALBUM,
  FETCHING_DELETE_ALBUM_SUCCESS,
  FETCHING_DELETE_ALBUM_FAILURE,
} from '../Actions/albumActionTypes'
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
  createAlbum: {
    ...fetchingData,
  },
  addPointToAlbum: {
    ...fetchingData,
  },
  addUserToAlbum: {
    ...fetchingData,
  },
  getAlbumsFromCurrentUser: {
    ...fetchingData,
    albumsFromCurrentUser: [],
  },
  getAlbumsFromUser: {
    ...fetchingData,
    albumsFromUser: [],
  },
  getAlbumUsers: {
    ...fetchingData,
    albumUsers: [],
  },
  updateAlbum: {
    ...fetchingData,
  },
  removeUserFromAlbum: {
    ...fetchingData,
  },
  deleteAlbum: {
    ...fetchingData,
  },
}

const { 
  createAlbum,
  addPointToAlbum,
  addUserToAlbum,
  getAlbumsFromCurrentUser,
  getAlbumsFromUser,
  getAlbumUsers,
  updateAlbum,
  removeUserFromAlbum,
  deleteAlbum,
} = initialState

const createAlbumReducer = (state = createAlbum, action) => {
  switch (action.type) {
    case FETCHING_CREATE_ALBUM:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_CREATE_ALBUM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
      }
    case FETCHING_CREATE_ALBUM_FAILURE:
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

const addPointToAlbumReducer = (state = addPointToAlbum, action) => {
  switch (action.type) {
    case FETCHING_ADD_POINT_TO_ALBUM:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_ADD_POINT_TO_ALBUM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
      }
    case FETCHING_ADD_POINT_TO_ALBUM_FAILURE:
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

const addUserToAlbumReducer = (state = addUserToAlbum, action) => {
  switch (action.type) {
    case FETCHING_ADD_USER_TO_ALBUM:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_ADD_USER_TO_ALBUM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
      }
    case FETCHING_ADD_USER_TO_ALBUM_FAILURE:
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

const getAlbumsFromCurrentUserReducer = (state = getAlbumsFromCurrentUser, action) => {
  switch (action.type) {
    case FETCHING_GET_ALBUMS_FROM_CURRENT_USER:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_GET_ALBUMS_FROM_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        albumsFromCurrentUser: action.data
      }
    case FETCHING_GET_ALBUMS_FROM_CURRENT_USER_FAILURE:
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

const getAlbumsFromUserReducer = (state = getAlbumsFromUser, action) => {
  switch (action.type) {
    case FETCHING_GET_ALBUMS_FROM_USER:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_GET_ALBUMS_FROM_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        albumsFromUser: action.data
      }
    case FETCHING_GET_ALBUMS_FROM_USER_FAILURE:
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

const getAlbumUsersReducer = (state = getAlbumUsers, action) => {
  switch (action.type) {
    case FETCHING_GET_ALBUM_USERS:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_GET_ALBUM_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        albumUsers: action.data,
      }
    case FETCHING_GET_ALBUM_USERS_FAILURE:
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

const updateAlbumReducer = (state = updateAlbum, action) => {
  switch (action.type) {
    case FETCHING_UPDATE_ALBUM:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_UPDATE_ALBUM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
      }
    case FETCHING_UPDATE_ALBUM_FAILURE:
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

const removeUserFromAlbumReducer = (state = removeUserFromAlbum, action) => {
  switch (action.type) {
    case FETCHING_REMOVE_USER_FROM_ALBUM:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_REMOVE_USER_FROM_ALBUM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
      }
    case FETCHING_REMOVE_USER_FROM_ALBUM_FAILURE:
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

const deleteAlbumReducer = (state = deleteAlbum, action) => {
  switch (action.type) {
    case FETCHING_DELETE_ALBUM:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_DELETE_ALBUM_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
      }
    case FETCHING_DELETE_ALBUM_FAILURE:
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

const albumReducer = combineReducers({
  createAlbumReducer,
  addPointToAlbumReducer,
  addUserToAlbumReducer,
  getAlbumsFromCurrentUserReducer: persistReducer(configPersistedReducer, getAlbumsFromCurrentUserReducer),
  getAlbumsFromUserReducer,
  getAlbumUsersReducer: persistReducer(configPersistedReducer, getAlbumUsersReducer),
  updateAlbumReducer,
  removeUserFromAlbumReducer,
  deleteAlbumReducer,
})

export default albumReducer