import React from 'react'
import { StyleSheet, View, TouchableOpacity,Text } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { getServerURL } from '../utils/Config'

export default class Upload extends React.Component {

  uploadImage() {

    var options = {
      title: 'Select Source',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else {
        let source = { uri: response.uri }

        var uri = response.uri
        var name = response.fileName
        var type = response.type

        const file = {
          uri: uri,
          name: name,
          type: type
        }

        const body = new FormData()
        body.append('image', file)

        fetch( getServerURL()+'/server/Upload.php', {
          method: 'POST',
          body
        }).catch((error) => { console.log(error) })
      }
    })
  }

  render() {
    return (
      <TouchableOpacity onPress={this.uploadImage.bind(this)}>
        <Text style={{ marginTop: 5, color: '#3F99ED', fontWeight: '400' }}>Change picture</Text>
      </TouchableOpacity>
    )
  }
}
