import {
  FETCHING_SEARCH,
  FETCHING_SEARCH_SUCCESS,
  FETCHING_SEARCH_FAILURE,
} from "./searchActionTypes"
import { search } from '../../utils/static/SearchFetch'

export function _search(searchData, type, segment) {
  return async (dispatch) => {
    dispatch(fetch(FETCHING_SEARCH))

    let response = await search(searchData, type, segment)

    if (response) {
      dispatch(fetchSuccess(FETCHING_SEARCH_SUCCESS, response))
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_SEARCH_FAILURE, response))
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
  FETCHING_SEARCH,
  FETCHING_SEARCH_SUCCESS,
  FETCHING_SEARCH_FAILURE,
}