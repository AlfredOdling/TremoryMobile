import React from 'react'
import { StyleSheet, View, Text, Image, FlatList, RefreshControl } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import ClickableImage from '../../Stateless/ClickableImage'
import { getServerURL } from '../../../utils/Config'
import { getFeedData } from '../../../src/Actions/feedActions'

export default class ImageGrid extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = { refreshing: false }
  }

  onRefresh = () => {
    // TODO

    // this.setState({refreshing: true}) https://github.com/bolan9999/react-native-largelist
    // getFeedData()
    // isFetching: false,
    // this.setState({refreshing: false})
  }

  renderFlatListItem = (serverURL, item) => {
    const { navigation, imageWidth, marginHorizontal } = this.props
    let _imageWidth = imageWidth ? imageWidth : 107
    let _marginHorizontal = marginHorizontal ? marginHorizontal : 3
    
    item.thumb = serverURL + '/server/getImage.php?id=' + item.image_id  + '&style=head'
    item.url = serverURL + '/server/getImage.php?id=' + item.image_id  + '&style=regular'
    item.key = item.image_id

    return (
      <View key={item.key+'ab'}>
        <ClickableImage   
          navigateTo={'EnlargedImage'} 
          navigation={navigation} 
          imageWidth={_imageWidth}
          imageRatio={1}
          item={item} 
          marginHorizontal={_marginHorizontal}
          marginBottom={6}
        />
      </View>
    )
  }

  render() {
    const { images } = this.props
    let serverURL = getServerURL()
    // refreshControl={
    //   <RefreshControl
    //     refreshing={this.state.refreshing}
    //     onRefresh={() => { this.onRefresh() }}
    //   />}

    return (
      <View style={styles.imageGrid}>
        <FlatList
          keyExtractor={item => item.image_id}
          horizontal={false}
          numColumns={3}
          style={{paddingHorizontal: 15}}
          data={images}
          renderItem={({ item }) => this.renderFlatListItem(serverURL, item)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageGrid: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
  },
})
