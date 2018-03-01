import {
  FETCHING_GET_PHOTOS_FROM_CAMERAROLL,
  FETCHING_GET_PHOTOS_FROM_CAMERAROLL_SUCCESS,
  FETCHING_GET_PHOTOS_FROM_CAMERAROLL_FAILURE,
  NO_NEW_PHOTOS_FROM_CAMERAROLL,
  SET_END_CURSOR,
  FETCHING_UPLOAD_PHOTO_FROM_CAMERAROLL,
  FETCHING_UPLOAD_PHOTO_FROM_CAMERAROLL_SUCCESS,
  FETCHING_UPLOAD_PHOTO_FROM_CAMERAROLL_FAILURE,
  DELETE_UPLOADED_IMG_FROM_STORE,
} from "./syncImagesActionTypes"
import { fetch, fetchSuccess, fetchFailure } from './fetchActions'
import RNFetchBlob from 'react-native-fetch-blob'
import Upload from 'react-native-background-upload'
import { CameraRoll } from 'react-native'
import { getServerURL } from '../../utils/Config'
import { uploadPhoto } from '../../utils/static/Image'

export function getPhotosFromCameraRoll() {
  return async (dispatch, getState) => {
    dispatch(fetch(FETCHING_GET_PHOTOS_FROM_CAMERAROLL))

    // 0. Get end_cursor
    const { end_cursor } = getState().syncImagesReducer.getPhotosFromCameraRollReducer
    let config = {}
    if (end_cursor) { config = { first: 3, assetType: 'Photos', after: end_cursor } }
    else { config = { first: 3, assetType: 'Photos' } }

    // 1. Get photos from cameraRoll
    CameraRoll.getPhotos(config)
      .then(r => {
        // 2. Store these in a persisting reducer
        let imagesArray = this.formatImgObjsBeforeStoring(r.edges)
        if (imagesArray.length<1) {
          // 3a. If no new photos
          dispatch(fetchSuccess(NO_NEW_PHOTOS_FROM_CAMERAROLL))  
        } else {
          // 3b. Save the new photos in reducer
          dispatch(fetchSuccess(FETCHING_GET_PHOTOS_FROM_CAMERAROLL_SUCCESS, imagesArray))
          // 4. Set the end cursor that marks the index of the last fetched photos from cameraRoll
          dispatch(this.setEndCursor(r.page_info.end_cursor))
        }
      })
      .catch((err) => {
        dispatch(fetchFailure(FETCHING_GET_PHOTOS_FROM_CAMERAROLL_FAILURE, err))
      })
  }
}

export function syncPhotos() {
  return async (dispatch, getState) => {
    const { cameraRollPhotos } = await getState().syncImagesReducer.getPhotosFromCameraRollReducer

    for (const index in cameraRollPhotos) {
      let photoObject = cameraRollPhotos[index]
      
      dispatch(fetch(FETCHING_UPLOAD_PHOTO_FROM_CAMERAROLL))

      let response = await uploadPhoto(photoObject)

      if (response=='success') {
        dispatch(fetchSuccess(FETCHING_UPLOAD_PHOTO_FROM_CAMERAROLL_SUCCESS))
        dispatch(deleteUploadedImgFromStore(photoObject.index))
      } else if(response=='imageAlreadyUploaded') {
        dispatch(fetchFailure(FETCHING_UPLOAD_PHOTO_FROM_CAMERAROLL_FAILURE, response))
        dispatch(deleteUploadedImgFromStore(photoObject.index))
      }
      else {
        dispatch(fetchFailure(FETCHING_UPLOAD_PHOTO_FROM_CAMERAROLL_FAILURE, response))
      }
    }
  }
}

export function syncPhotosInBackground() {
  return async (dispatch, getState) => {
    const { cameraRollPhotos } = await getState().syncImagesReducer.getPhotosFromCameraRollReducer
    
    console.log('====================================');
    console.log('cameraRollPhotos', cameraRollPhotos);
    console.log('====================================');
    
    
    for (const index in cameraRollPhotos) {
      let photoObject = cameraRollPhotos[index]

      var str = RNFetchBlob.wrap(photoObject.uri)
      var res = str.slice(12);
      
      console.log('====================================');
      console.log('str....', str);
      console.log('res....', res);
      console.log('====================================');

      const options = {
        url: 'https://www.tremory.com/server/Upload.php',
        path: photoObject.uri,
        method: 'POST',
        type: 'raw',
      }
     
     Upload.startUpload(options).then((uploadId) => {
       console.log('Upload started')
       Upload.addListener('progress', uploadId, (data) => {
         console.log(`Progress: ${data.progress}%`)
       })
       Upload.addListener('error', uploadId, (data) => {
         console.log(`Error: ${data.error}%`)
       })
       Upload.addListener('cancelled', uploadId, (data) => {
         console.log(`Cancelled!`)
       })
       Upload.addListener('completed', uploadId, (data) => {
         console.log('Completed!')
       })
     }).catch((err) => {
       console.log('Upload error!', err)
     })


      // dispatch(fetch(FETCHING_UPLOAD_PHOTO_FROM_CAMERAROLL))

      // let response = await uploadPhoto(photoObject)

      // if (response=='success') {
      //   dispatch(fetchSuccess(FETCHING_UPLOAD_PHOTO_FROM_CAMERAROLL_SUCCESS))
      //   dispatch(deleteUploadedImgFromStore(photoObject.index))
      // } else if(response=='imageAlreadyUploaded') {
      //   dispatch(fetchFailure(FETCHING_UPLOAD_PHOTO_FROM_CAMERAROLL_FAILURE, response))
      //   dispatch(deleteUploadedImgFromStore(photoObject.index))
      // }
      // else {
      //   dispatch(fetchFailure(FETCHING_UPLOAD_PHOTO_FROM_CAMERAROLL_FAILURE, response))
      // }
    }
  }
}

setEndCursor = data => {
  return {
    type: SET_END_CURSOR,
    data,
  }
}

formatImgObjsBeforeStoring = photos => {
  let imagesArray = []
  let photoObject = {}

  photos.forEach((element, index) => {
    photoObject = {
      index,
      uri: element.node.image.uri,
      name: element.node.image.filename,
      timeStamp: element.node.timestamp,
      latitude: element.node.location.latitude,
      longitude: element.node.location.longitude
    }

    imagesArray.push(photoObject)
  })

  return imagesArray
}

deleteUploadedImgFromStore = imgIndex => {
  return {
    type: DELETE_UPLOADED_IMG_FROM_STORE,
    imgIndex
  }
}

export {
  FETCHING_GET_PHOTOS_FROM_CAMERAROLL,
  FETCHING_GET_PHOTOS_FROM_CAMERAROLL_SUCCESS,
  FETCHING_GET_PHOTOS_FROM_CAMERAROLL_FAILURE,
  NO_NEW_PHOTOS_FROM_CAMERAROLL,
  SET_END_CURSOR,
  FETCHING_UPLOAD_PHOTO_FROM_CAMERAROLL,
  FETCHING_UPLOAD_PHOTO_FROM_CAMERAROLL_SUCCESS,
  FETCHING_UPLOAD_PHOTO_FROM_CAMERAROLL_FAILURE,
  DELETE_UPLOADED_IMG_FROM_STORE,
}