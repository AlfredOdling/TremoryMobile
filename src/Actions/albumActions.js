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
} from "./albumActionTypes"

import { 
  createAlbum,
  addPointToAlbum,
  addUserToAlbum,
  getAlbumsFromCurrentUser,
  getAlbumsFromUser,
  getAlbumUsers,
  updateAlbum,
  removeUserFromAlbum,
  deleteAlbum,
} from '../../utils/static/AlbumFetch'

export function _createAlbum(albumName, albumDescription, security) {
  return async (dispatch) => {
    dispatch(fetch(FETCHING_CREATE_ALBUM))

    let response = await createAlbum(albumName, albumDescription, security)

    if (response) {
      dispatch(fetchSuccess(FETCHING_CREATE_ALBUM_SUCCESS))
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_CREATE_ALBUM_FAILURE))
    }

  }
}

export function _addPointToAlbum(album, point_id) {
  return async (dispatch) => {
    dispatch(fetch(FETCHING_ADD_POINT_TO_ALBUM))
  
    let response = await addPointToAlbum(album, point_id)

    if (response) {
      dispatch(fetchSuccess(FETCHING_ADD_POINT_TO_ALBUM_SUCCESS))
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_ADD_POINT_TO_ALBUM_FAILURE))
    }

  }
}

export function _addUserToAlbum(id, userID, security) {
  return async (dispatch) => {
    dispatch(fetch(FETCHING_ADD_USER_TO_ALBUM))
  
    let response = await addUserToAlbum(id, userID, security)

    if (response) {
      dispatch(fetchSuccess(FETCHING_ADD_USER_TO_ALBUM_SUCCESS))
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_ADD_USER_TO_ALBUM_FAILURE))
    }

  }
}

export function _getAlbumsFromCurrentUser() {
  return async (dispatch) => {
    dispatch(fetch(FETCHING_GET_ALBUMS_FROM_CURRENT_USER))
  
    let response = await getAlbumsFromCurrentUser()

    if (response) {
      dispatch(fetchSuccess(FETCHING_GET_ALBUMS_FROM_CURRENT_USER_SUCCESS, response))
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_GET_ALBUMS_FROM_CURRENT_USER_FAILURE))
    }

  }
}

export function _getAlbumsFromUser(userId) {
  return async (dispatch) => {
    dispatch(fetch(FETCHING_GET_ALBUMS_FROM_USER))
  
    let response = await getAlbumsFromUser(userId)

    if (response) {
      dispatch(fetchSuccess(FETCHING_GET_ALBUMS_FROM_USER_SUCCESS, response))
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_GET_ALBUMS_FROM_USER_FAILURE))
    }

  }
}

export function _getAlbumUsers(id) {
  return async (dispatch) => {
    dispatch(fetch(FETCHING_GET_ALBUM_USERS))
  
    let response = await getAlbumUsers(id)

    if (response) {
      dispatch(fetchSuccess(FETCHING_GET_ALBUM_USERS_SUCCESS, response))
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_GET_ALBUM_USERS_FAILURE))
    }

  }
}

export function _updateAlbum(id, album_name, album_description, security_level) {
  return async (dispatch) => {
    dispatch(fetch(FETCHING_UPDATE_ALBUM))

    let response = await updateAlbum(id, album_name, album_description, security_level)

    if (response) {
      dispatch(fetchSuccess(FETCHING_UPDATE_ALBUM_SUCCESS))
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_UPDATE_ALBUM_FAILURE))
    }

  }
}

export function _removeUserFromAlbum(id, user_id) {
  return async (dispatch) => {
    dispatch(fetch(FETCHING_REMOVE_USER_FROM_ALBUM))
  
    let response = await removeUserFromAlbum(id, user_id)

    if (response) {
      dispatch(fetchSuccess(FETCHING_REMOVE_USER_FROM_ALBUM_SUCCESS))
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_REMOVE_USER_FROM_ALBUM_FAILURE))
    }

  }
}

export function _deleteAlbum(id) {
  return async (dispatch) => {
    dispatch(fetch(FETCHING_DELETE_ALBUM))
  
    let response = await deleteAlbum(id)

    if (response) {
      dispatch(fetchSuccess(FETCHING_DELETE_ALBUM_SUCCESS))
    } else if (!response) {
      dispatch(fetchFailure(FETCHING_DELETE_ALBUM_FAILURE))
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
}