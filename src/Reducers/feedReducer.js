import {   
  FETCHING_FEED_DATA,
  FETCHING_FEED_DATA_SUCCESS,
  FETCHING_FEED_DATA_FAILURE, } from '../Actions/actionTypes'

const initialState = { 
  data: [],
  isFetching: false,
  fetched: false,
  error: false,
  errorMsg: '',
}

const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_FEED_DATA:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_FEED_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        data: action.data,
      }
    case FETCHING_FEED_DATA_FAILURE:
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

export default feedReducer