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
} from "./imagesActionTypes"
import { getPointsFromCurrentUser, getPointsFromUserById } from '../../utils/static/PointFetch.js'
import { fetch, fetchSuccess, fetchFailure } from './fetchActions'
import { getAlbumPoints } from '../../utils/static/AlbumFetch'

export function _getPointsFromCurrentUser() {
  return async (dispatch) => {
    dispatch(fetch(FETCHING_GET_POINT_FROM_CURRENT_USER))

    let response = await getPointsFromCurrentUser()

    if (response) {
      dispatch(fetchSuccess(FETCHING_GET_POINT_FROM_CURRENT_USER_SUCCESS, response))
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_GET_POINT_FROM_CURRENT_USER_FAILURE, response))
    }
  }
}

export function _getPointsFromUserById(user_id) {
  return async (dispatch) => {
    dispatch(fetch(FETCHING_GET_POINTS_FROM_USER_BY_ID))

    let response = await getPointsFromUserById(user_id)

    if (response) {
      dispatch(fetchSuccess(FETCHING_GET_POINTS_FROM_USER_BY_ID_SUCCESS, response))
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_GET_POINTS_FROM_USER_BY_ID_FAILURE, response))
    }
  }
}

export function _getAlbumPoints(id) {
  return async (dispatch) => {
    dispatch(fetch(FETCHING_GET_ALBUM_POINTS))
    let response = await getAlbumPoints(id)

    if (response) {
      dispatch(fetchSuccess(FETCHING_GET_ALBUM_POINTS_SUCCESS, response))
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_GET_ALBUM_POINTS_FAILURE, response))
    }
  }
}

export {
  FETCHING_GET_POINT_FROM_CURRENT_USER,
  FETCHING_GET_POINT_FROM_CURRENT_USER_SUCCESS,
  FETCHING_GET_POINT_FROM_CURRENT_USER_FAILURE,
  FETCHING_GET_POINTS_FROM_USER_BY_ID,
  FETCHING_GET_POINTS_FROM_USER_BY_ID_SUCCESS,
  FETCHING_GET_POINTS_FROM_USER_BY_ID_FAILURE,
  FETCHING_GET_ALBUM_POINTS,
  FETCHING_GET_ALBUM_POINTS_SUCCESS,
  FETCHING_GET_ALBUM_POINTS_FAILURE,
}