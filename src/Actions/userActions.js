import {
  FETCHING_USER,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILURE,
  FETCHING_OTHER_USER,
  FETCHING_OTHER_USER_SUCCESS,
  FETCHING_OTHER_USER_FAILURE,
} from "./userActionTypes"
import { fetch, fetchSuccess, fetchFailure } from './fetchActions'
import { getCurrentUser, getOtherUserById } from '../../utils/static/UserFetch'

export function _getCurrentUser() {
  return async (dispatch) => {
    dispatch(fetch(FETCHING_USER))
    
    let response = await getCurrentUser()

    if (response) {
      dispatch(fetchSuccess(FETCHING_USER_SUCCESS, response[0] ))
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_USER_FAILURE))
    }
  }
}

export function _getOtherUserById(id) {
  return async (dispatch) => {
    dispatch(fetch(FETCHING_OTHER_USER))
    
    let response = await getOtherUserById(id)

    console.log('====================================');
    console.log('response', response);
    console.log('====================================');

    if (response) {
      dispatch(fetchSuccess(FETCHING_OTHER_USER_SUCCESS, response[0] ))
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_OTHER_USER_FAILURE))
    }
  }
}

export {
  FETCHING_USER,
  FETCHING_USER_SUCCESS,
  FETCHING_USER_FAILURE,
  FETCHING_OTHER_USER,
  FETCHING_OTHER_USER_SUCCESS,
  FETCHING_OTHER_USER_FAILURE,
}