import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { connect } from "react-redux"
import { Button } from 'react-native-elements'
import { syncPhotos, getPhotosFromCameraRoll } from '../src/Actions/syncImagesActions'

class SyncStatusScreen extends React.Component {

  // debugger = () => {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={styles.text1}> <Text style={styles.text2}> nrOfUnsyncedPhotos: </Text>{syncImagesReducer.getPhotosFromCameraRollReducer.nrOfPhotosInReducer == null ? 'null' : syncImagesReducer.getPhotosFromCameraRollReducer.nrOfPhotosInReducer} </Text>
  //       <Text style={styles.text1}> <Text style={styles.text2}> fetchedPhotosFromCameraRoll: </Text>{syncImagesReducer.getPhotosFromCameraRollReducer.fetched == false ? 'false' : 'true'} </Text>
  //       <Text style={styles.text1}> <Text style={styles.text2}> isFetchingFromCameraRoll: </Text>{syncImagesReducer.getPhotosFromCameraRollReducer.isFetching == false ? 'false' : 'true'} </Text>
  //       <Text style={styles.text1}> <Text style={styles.text2}> message: </Text>{syncImagesReducer.getPhotosFromCameraRollReducer.message} </Text>
  //       <Text style={styles.text1}> <Text style={styles.text2}> errorMsg: </Text>{syncImagesReducer.getPhotosFromCameraRollReducer.errorMsg == false ? 'false' : 'true'} </Text>
  //       <Text style={styles.text1}> <Text style={styles.text2}> hasError: </Text>{syncImagesReducer.getPhotosFromCameraRollReducer.error == false ? 'false' : 'true'} </Text>
  //       <Text style={styles.text1}> <Text style={styles.text2}> end_cursor: </Text>{syncImagesReducer.getPhotosFromCameraRollReducer.end_cursor} </Text>
    
  //       <Text style={styles.text1}>----------------------</Text>
    
  //       <Text style={styles.text1}> <Text style={styles.text2}> error: </Text>{syncImagesReducer.uploadPhotoFromCameraRollReducer.error == false ? 'false': 'true'} </Text>
  //       <Text style={styles.text1}> <Text style={styles.text2}> UploadErrorMsg: </Text>{syncImagesReducer.uploadPhotoFromCameraRollReducer.errorMsg  == false ? 'false' : 'true'} </Text>
  //       <Text style={styles.text1}> <Text style={styles.text2}> hasUploaded: </Text>{syncImagesReducer.uploadPhotoFromCameraRollReducer.fetched == false ? 'false' : 'true' } </Text>
  //       <Text style={styles.text1}> <Text style={styles.text2}> isUploadingToServer: </Text>{syncImagesReducer.uploadPhotoFromCameraRollReducer.isFetching == false ? 'false' : 'true'} </Text>
  //     </View>
  //   )
  // }

  componentWillMount() {
    this.props.getPhotosFromCameraRoll()
  }

  onPress = () => {
    this.props.syncPhotos()
  }

  uploadVisualizer = () => {
    const { 
      nrOfPhotosInReducer,
      photosFetched,
      isFetchingPhotos,
      errorUploadingPhotos,
      errorMsgUpload,
      hasUploaded,
      isUploading,
    } = this.props

    let loading = false
    let buttonText = 'Sync images'

    if (isFetchingPhotos) {
      buttonText = 'Preparing upload..'
      loading = true
    } else if (isUploading) {
      buttonText = 'Syncing images...'
      loading = true
    }

    return (
      <View>
        <View style={{
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          marginBottom: 30
        }}>
          <Text style={{ fontSize: 38 }}>{this.props.nrOfPhotosInReducer}</Text>
          <Text style={{ fontSize: 16 }}>Unsynced photos</Text>
        </View>

        <Button
          backgroundColor="#3F99ED"
          onPress={ () => this.onPress() }
          loading={loading}
          borderRadius={9}
          title={buttonText} />
          
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.uploadVisualizer()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  text1: {
    paddingBottom: 5
  },
  text2: {
    fontSize: 15,
    color: 'darkgreen',
    fontWeight: 'bold'
  }
})

const mapStateToProps = state => ({ 
  nrOfPhotosInReducer: state.syncImagesReducer.getPhotosFromCameraRollReducer.nrOfPhotosInReducer,
  photosFetched: state.syncImagesReducer.getPhotosFromCameraRollReducer.fetched,
  isFetchingPhotos: state.syncImagesReducer.getPhotosFromCameraRollReducer.isFetching,
  errorUploadingPhotos: state.syncImagesReducer.uploadPhotoFromCameraRollReducer.error,
  errorMsgUpload: state.syncImagesReducer.uploadPhotoFromCameraRollReducer.errorMsg,
  hasUploaded: state.syncImagesReducer.uploadPhotoFromCameraRollReducer.fetched,
  isUploading: state.syncImagesReducer.uploadPhotoFromCameraRollReducer.isFetching,
})

const mapDispatchToProps = { syncPhotos, getPhotosFromCameraRoll }

const SyncStatus = connect(mapStateToProps, mapDispatchToProps)(SyncStatusScreen)
export default SyncStatus
