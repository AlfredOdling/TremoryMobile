import {
  FETCHING_GET_PHOTOS_FROM_CAMERAROLL,
  FETCHING_GET_PHOTOS_FROM_CAMERAROLL_SUCCESS,
  FETCHING_GET_PHOTOS_FROM_CAMERAROLL_FAILURE,
  SET_END_CURSOR,
  FETCHING_UPLOAD_PHOTO_FROM_CAMERAROLL,
  FETCHING_UPLOAD_PHOTO_FROM_CAMERAROLL_SUCCESS,
  FETCHING_UPLOAD_PHOTO_FROM_CAMERAROLL_FAILURE,
  DELETE_UPLOADED_IMG_FROM_STORE,
  NO_NEW_PHOTOS_FROM_CAMERAROLL,
} from '../Actions/syncImagesActionTypes'
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
  getPhotosFromCameraRoll: {
    ...fetchingData,
    cameraRollPhotos: [],
    nrOfPhotosInReducer: 0,
    end_cursor: null,
  },
  uploadPhotoFromCameraRoll: {
    ...fetchingData,
  },
}

const { getPhotosFromCameraRoll, uploadPhotoFromCameraRoll } = initialState

const getPhotosFromCameraRollReducer = (state = getPhotosFromCameraRoll, action) => {
  switch (action.type) {
    case FETCHING_GET_PHOTOS_FROM_CAMERAROLL:
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_GET_PHOTOS_FROM_CAMERAROLL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        cameraRollPhotos: action.data,
        nrOfPhotosInReducer: action.data.length,
      }
    case NO_NEW_PHOTOS_FROM_CAMERAROLL:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        message: 'No new photos from cameraroll',
      }
    case FETCHING_GET_PHOTOS_FROM_CAMERAROLL_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMsg: action.errorMsg,
      }
    case SET_END_CURSOR:
      return {
        ...state,
        end_cursor: action.data
      }
    case DELETE_UPLOADED_IMG_FROM_STORE:
      return {
        ...state,
        cameraRollPhotos: this.deleteImageObj(state.cameraRollPhotos, action.imgIndex),
        nrOfPhotosInReducer: this.deleteImageObj(state.cameraRollPhotos, action.imgIndex).length,
      }

    default:
      return state
  }
}

const uploadPhotoFromCameraRollReducer = (state = uploadPhotoFromCameraRoll, action) => {
  switch (action.type) {
    case FETCHING_UPLOAD_PHOTO_FROM_CAMERAROLL:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_UPLOAD_PHOTO_FROM_CAMERAROLL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
      }
    case FETCHING_UPLOAD_PHOTO_FROM_CAMERAROLL_FAILURE:
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

deleteImageObj = (cameraRollPhotos, imgIndex) => {
  if (cameraRollPhotos.length <= 1) { return [] }
  else {
    return newArr = [
      ...cameraRollPhotos.slice(0, imgIndex),
      ...cameraRollPhotos.slice(imgIndex + 1)
    ]
  }
}

//geoLocationReducer TODO

const configPersistedReducer = { key: "syncImagesReducer", storage }

const syncImagesReducer = combineReducers({
  getPhotosFromCameraRollReducer: persistReducer(configPersistedReducer, getPhotosFromCameraRollReducer),
  uploadPhotoFromCameraRollReducer,
})

export default syncImagesReducer