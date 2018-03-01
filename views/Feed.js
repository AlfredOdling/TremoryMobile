import React from 'react'
import { View } from 'react-native'
import FeedGrid from '../components/Feed/FeedGrid'

export default class Feed extends React.Component {
  render() {
    return (
      <View style={{flex:1}}>
        <FeedGrid style={{flex:1}} navigation={this.props.navigation} />
      </View>
    )
  }
}
