import React from 'react'
import { View } from 'react-native'
import ClickableImage from '../Stateless/ClickableImage'
import { getServerURL } from '../../utils/Config'

export default class FeedImages extends React.Component {
  
  render() {
    const { images, navigation } = this.props
    let serverURL = getServerURL()

    let imagesToRender = images.map((item, i) => {
      item.url = serverURL +'/server/getImage.php?id=' + item.image_id  + '&style=regular'
      item.thumb = serverURL +'/server/getImage.php?id=' + item.image_id  + '&style=thumb'
      item.key = i

      return (
        <ClickableImage   
          key={i}
          navigateTo={'EnlargedImage'} 
          navigation={navigation} 
          imageWidth={156}
          item={item} 
          marginHorizontal={10}
        />
      )
    })

    return (
      <View>
        { imagesToRender }
      </View>
    )
  }
}