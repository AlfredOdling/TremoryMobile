import React from 'react'
import { View } from 'react-native'

import ImagesTab from '../Media/ImagesTab/ImagesTab'
import AlbumGrid from '../Media/AlbumTab/AlbumGrid'
import Friends from '../../views/Friends'

export default class ProfileContent extends React.Component {

  render() {
    const { showComponents, navigation, images, albums, isOtherProfile } = this.props
    const { showFriends, showImages, showAlbum } = showComponents

    return (
      <View>
        <View style={{ display: showImages }}>
          <ImagesTab images={images} navigation={navigation} />
        </View>

        <View style={{ display: showAlbum }}>
          <AlbumGrid isOtherProfile={isOtherProfile} albums={albums} navigation={navigation} />
        </View>

        <View style={{ display: showFriends }}>
          <Friends navigation={navigation} />
        </View>
      </View>
    )
  }
}