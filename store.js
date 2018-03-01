import { createStore, combineReducers, applyMiddleware } from "redux"
import { AppState } from 'react-native'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/es/storage"

import NavigationReducer from "./src/Reducers/navigationReducer"
import loginReducer from "./src/Reducers/loginReducer"
import feedReducer from "./src/Reducers/feedReducer"
import notificationReducer from "./src/Reducers/notificationReducer"
import albumReducer from "./src/Reducers/albumReducer"
import payloadReducer from "./src/Reducers/payloadReducer"
import imagesReducer from "./src/Reducers/imagesReducer"
import searchReducer from "./src/Reducers/searchReducer"
import syncImagesReducer from "./src/Reducers/syncImagesReducer"
import userReducer from "./src/Reducers/userReducer"
import friendsReducer from "./src/Reducers/friendsReducer"

import { _getCurrentUser } from './src/Actions/userActions'
import { getFeedData } from './src/Actions/feedActions'
import { loginUser } from './src/Actions/loginActions'
import { getNotificationData, getNotificationStatus } from './src/Actions/notificationActions'
import { getPhotosFromCameraRoll, syncPhotos, syncPhotosInBackground } from "./src/Actions/syncImagesActions"

const configLogin = { key: "loginReducer", storage }
const configFeed = { key: "feedReducer", storage }

const rootReducer = combineReducers({
  LoginReducer: persistReducer(configLogin, loginReducer),
  feedReducer: persistReducer(configFeed, feedReducer),
  notificationReducer, // State is persisting in reducer
  albumReducer, // State is persisting in reducer
  imagesReducer, // State is persisting in reducer
  userReducer, // State is persisting in reducer
  syncImagesReducer,
  NavigationReducer,
  payloadReducer,
  searchReducer,
  friendsReducer,
})

function configureStore() {

  let store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk, logger)
  )
  let persistor = persistStore(store)

  // ---- Fetch inital data ---- //
  store.dispatch(_getCurrentUser())
  store.dispatch(loginUser('test@testsson.se', 'testtest')) // TODO: only login if logged out (obviously)
  store.dispatch(getFeedData())
  store.dispatch(getNotificationStatus())
  store.dispatch(getNotificationData())

  // ---- Get photos ---- //
  // store.dispatch(getPhotosFromCameraRoll())

  // ---- Sync photos ---- //
  // if (hasWifi && isCharging) { }

  // TODO: make these synchronous
  // setTimeout(function(){ store.dispatch(syncPhotos()) }, 7000)

  // If the app is closed
  AppState.addEventListener('change', state => {
      // 'active', 'inactive', 'background'
    if (state === 'background') {
      console.log('Running sync in background...')
      // store.dispatch(syncPhotosInBackground())
    }
  })

  return { persistor, store }
}

export default configureStore
