import {   
  FETCHING_SEARCH,
  FETCHING_SEARCH_SUCCESS,
  FETCHING_SEARCH_FAILURE, } from '../Actions/searchActionTypes'

const initialState = { 
  data: [],
  isFetching: false,
  fetched: false,
  error: false,
  errorMsg: '',
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_SEARCH:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_SEARCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        data: action.data,
      }
    case FETCHING_SEARCH_FAILURE:
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

export default searchReducer