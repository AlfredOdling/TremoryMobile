import React from 'react'
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import ClickableImage from '../../Stateless/ClickableImage'
import { AlbumView } from '../AlbumTab/AlbumView'
import { getServerURL } from '../../../utils/Config'

export default class AlbumGrid extends React.Component {

  formatAlbum = (serverURL, item) => {
    item.thumb = serverURL + '/server/getImage.php?id=' + item.thumbnail_id + '&style=head'
    item.url = serverURL + '/server/getImage.php?id=' + item.thumbnail_id + '&style=head'
    item.title = item.album_name
    item.isAlbumGrid = true

    return item
  }

  renderFlatListAlbum = (serverURL, item, i) => {
    const { navigation, isAlbumView } = this.props
    let scene = isAlbumView ? 'EnlargedImage' : 'AlbumView'
    item = this.formatAlbum(serverURL, item) // TODO: refactor

    return (
      <View key={item.key + 'sdf'}>
        <ClickableImage
          isAlbumGrid={item.isAlbumGrid}
          navigateTo={scene}
          navigation={navigation}
          imageWidth={107}
          imageRatio={1}
          marginHorizontal={3}
          marginBottom={6}
          item={item}
        />
      </View>
    )
  }

  render() {
    const { payloadState, albums, isOtherProfile } = this.props
    let serverURL = getServerURL()
    
    return (
      <View style={styles.container}>
        { isOtherProfile ? [] :
          <TouchableOpacity onPress={() => { this.props.navigation.navigate('NewAlbum') }}>
            <Text style={styles.titleText}>+ New album</Text>
          </TouchableOpacity> }

        <FlatList
          keyExtractor={item => item.id}
          horizontal={false}
          numColumns={3}
          style={{ paddingHorizontal: 12 }}
          data={albums}
          renderItem={({ item }) => this.renderFlatListAlbum(serverURL, item)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    fontWeight: '100',
    marginBottom: 20
  },
})