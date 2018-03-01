import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import ImageGrid from '../ImagesTab/ImageGrid'
import { connect } from 'react-redux'
import { sendPayload } from '../../../src/Actions/payloadActions'

class AlbumViewScreen extends React.Component {

  onPressNavigate = (navigateTo, payload) => {
    const { navigation, sendPayload } = this.props
    
    if (payload) { sendPayload(payload) }

    navigation.navigate(navigateTo)
  }

  renderNewAlbumViewContent = () => {
    return (
      <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: '100' }}>Add photos to your album</Text>
        <TouchableOpacity onPress={() => { this.onPressNavigate('SelectImagesGrid') }}>
          <Image style={{ marginTop: 20, height: 43, width: 46 }} source={require('../../../res/addPhotos.png')} />
        </TouchableOpacity>
      </View>
    )
  }

  renderAlbumViewContent = (payload, images) => {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          <TouchableOpacity onPress={() => { this.onPressNavigate('SelectImagesGrid' )}}>
            <Image style={{ height: 23, width: 26, marginRight: 13 }} source={require('../../../res/addPhotos.png')} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.onPressNavigate('AlbumSettings', payload) }}>
            <Image style={{ height: 22, width: 22 }} source={require('../../../res/albumSettings.png')} />
          </TouchableOpacity>
        </View>

        <ImageGrid navigation={this.props.navigation} images={images} />
      </View>
    )
  }

  render() {
    const { albumPoints, payload } = this.props
    let isNewAlbum = payload && payload.isNewAlbum ? true : false

    return (
      <View style={{ flex: 1}}>
        { isNewAlbum ?
            this.renderNewAlbumViewContent()
            :
            this.renderAlbumViewContent(payload, albumPoints)
        }
      </View>
    )
  }
}

const mapStateToProps = state => ({
  albumPoints: state.imagesReducer.getAlbumPointsReducer.albumPoints,
  payload: state.payloadReducer.payload,
})
const mapDispatchToProps = { sendPayload }

const AlbumView = connect(mapStateToProps, mapDispatchToProps)(AlbumViewScreen)
export default AlbumView