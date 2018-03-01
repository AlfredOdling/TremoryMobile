import React from 'react'
import { View } from 'react-native'
import ImageGrid from './ImageGrid.js'
import { connect } from 'react-redux'

class ImagesTabScreen extends React.Component {

  render() {
    const { navigation, images } = this.props

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
          <ImageGrid navigation={navigation} images={images} />
      </View>
    )
  }
}

const mapStateToProps = state => ({ payload: state.payloadReducer.payload })

const ImagesTab = connect(mapStateToProps)(ImagesTabScreen)
export default ImagesTab