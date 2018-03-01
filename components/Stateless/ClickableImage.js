import React from 'react'
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import { getDynamicWidth } from '../../utils/Utils'
import { connect } from 'react-redux'
import { sendPayload } from '../../src/Actions/payloadActions'
import { _getAlbumPoints } from '../../src/Actions/imagesActions'

class ClickableImageScreen extends React.Component {

  formatPayload = (user_first, user_last, date, item) => {
    // Adding full name and date to item for the payload (will be refactored)
    item['fullName'] = user_first + ' ' + user_last
    item['date'] = date

    return item
  }

  formatDate = (image_time) => {
    let date = ''
    if (image_time) {
      date = image_time.replace(/:/g, '/').slice(0, 10)
    }

    return date
  }

  onPressNavigateToProfile = (payload) => {
    const { navigation, sendPayload } = this.props

    sendPayload(payload)
    navigation.navigate('OtherProfile')
  }

  onPressNavigate = (payload) => {
    const { navigateTo, navigation, sendPayload, _getAlbumPoints } = this.props

    sendPayload(payload)
    if (navigateTo=='AlbumView') { _getAlbumPoints(payload.id) } // (albums id)

    navigation.navigate(navigateTo) // AlbumView or EnlargedImage
  }

  render() {
    const {
      imageRatio,
      item,
      imageWidth,
      marginHorizontal,
      marginBottom,
      isAlbumGrid
    } = this.props

    let {
      url,
      key,
      thumb,
      name,
      user_first,
      user_last,
      locality,
      album_name,
      image_height,
      image_width,
      image_orientation,
      image_time,
    } = item

    let _imageWidth = getDynamicWidth(imageWidth)
    let _imageRatio = imageRatio ? imageRatio : image_width / image_height // TODO: this will be refactored out
    let date = this.formatDate(image_time) // TODO: this will be refactored out
    let payload = this.formatPayload(user_first, user_last, date, item) // TODO: this will be refactored out
    let deg = ((image_orientation * 90) - 90) // // TODO: this will be refactored out

    let imageStyle = {
      flex:1,
      borderRadius: 15,
      zIndex: 1,
      overflow: 'hidden',
      marginBottom: marginBottom ? marginBottom : null
    }

    let imageBackground = {
      width: _imageWidth,
      height: _imageWidth * _imageRatio,
      borderRadius: 15,
      backgroundColor: 'lightgrey'
    }

    return (
      <View style={styles.container} key={'2a' + key}>
        <TouchableWithoutFeedback key={'2b' + key} style={{}} onPress={() => { this.onPressNavigate(payload) }}>
          <View style={imageBackground}>
            <Image
              key={'2d' + key}
              style={imageStyle}
              //transform=[{ 'rotate': deg + 'deg' }]
              source={{ uri: (thumb) }} />
            </View>
        </TouchableWithoutFeedback>

        <View style={{ width: _imageWidth, marginHorizontal }}>

          {isAlbumGrid ?
            <Text style={styles.text}>{album_name}</Text>
            :
            <View style={{ paddingLeft: 4 }}>
              <Text
                onPress={() => this.onPressNavigateToProfile(payload)}
                key={'2f' + key}
                style={[styles.text, { fontWeight: 'bold' }]}>
                {user_first}
              </Text>
              <Text style={styles.text}>{locality ? locality + ' ' : '' + date}</Text>
            </View>}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  text: {
    fontSize: 12,
    fontWeight: '400',
    paddingTop: 5,
  },
})

const mapDispatchToProps = { sendPayload, _getAlbumPoints }

const ClickableImage = connect(null, mapDispatchToProps)(ClickableImageScreen)
export default ClickableImage
