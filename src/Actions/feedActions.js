import {
  FETCHING_FEED_DATA,
  FETCHING_FEED_DATA_SUCCESS,
  FETCHING_FEED_DATA_FAILURE,
} from "./actionTypes"

import { getPointsFromFeed } from '../../utils/static/PointFetch.js'

export function getFeedData() {
  return async (dispatch) => {
    dispatch(fetchFeedData())

    let response = await getPointsFromFeed(0)
    
    if (response) {
      dispatch(fetchFeedDataSuccess(response))
    } else if (!response) {
      dispatch(fetchFeedDataFailure(response))
    }

  }
}

export function fetchFeedData() {
  return {
    type: FETCHING_FEED_DATA
  }
}

export function fetchFeedDataSuccess(data) {
  return {
    type: FETCHING_FEED_DATA_SUCCESS,
    data,
  }
}

export function fetchFeedDataFailure(errorMsg) {
  return {
    type: FETCHING_FEED_DATA_FAILURE,
    errorMsg
  }
}

export {
  FETCHING_FEED_DATA,
  FETCHING_FEED_DATA_SUCCESS,
  FETCHING_FEED_DATA_FAILURE,
}