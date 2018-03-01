import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native'
import Modal from 'react-native-modalbox'
import { getDynamicWidth } from '../utils/Utils'
// import ImageComments from './ImageComments'
import InputComment from './InputComment'
import { sendPayload } from "../src/Actions/payloadActions"
import PhotoView from 'react-native-photo-view'

class EnlargedImageScreen extends React.Component {

  onPressNavigate = (payload) => {
    const { navigation, sendPayload } = this.props

    sendPayload(payload)
    navigation.navigate('OtherProfile')
  }

  render() {
    const { navigation, payloadState } = this.props
    const {
      url,
      name,
      user_first,
      locality,
      image_time,
      views,
      image_height,
      image_width,
      date,
      fullName
    } = payloadState
    const {
      scrollView,
      text,
      text2
    } = styles

    let imageRatio = image_width / image_height
    let imgWidth = getDynamicWidth(335)
    let imgHeight = imgWidth * imageRatio

    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={styles.container}>

          <View style={{ alignItems: 'center' }}>
            <Text
              onPress={() => this.onPressNavigate(payloadState)}
              style={text}>
              {fullName}
            </Text>

            <TouchableHighlight onPress={() => this.refs.modal1.open()}>
              <Image
                style={{
                  width: imgWidth,
                  height: imgHeight,
                  resizeMode: 'contain',
                }}
                source={{ uri: url }}
              />
            </TouchableHighlight>

            <Modal 
              position={"center"} 
              backdropPressToClose={true}
              backdrop={true}
              ref={"modal1"}
              backdropColor={'black'}
              coverScreen={true}
              swipeThreshold={200}
              swipeToClose={true}>

              <View style={{ backgroundColor: 'black', height: '100%', justifyContent: 'center' }}>
                <PhotoView
                  source={{ uri: url }}
                  minimumZoomScale={1}
                  maximumZoomScale={3}
                  androidScaleType="center"
                  style={{ width: '100%', height: '100%' }}/>
                </View>
            </Modal>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={text2}>{date}</Text>
              <Text style={text2}>{locality}</Text>
              <Text style={text2}>{views + ' views'}</Text>
            </View>

          </View>
        </View>

        {/*
          <View style={{ borderTopColor: '#bbb',
        borderTopWidth: StyleSheet.hairlineWidth, marginTop: 15, paddingTop: 10 }}>
          <ImageComments/>
        </View>

        <View>
          <InputComment/>
            </View>
          TODO: next sprint*/}

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 10,
  },
  text2: {
    fontSize: 12,
    fontWeight: '100',
    marginTop: 10,
    marginLeft: 5
  },
})

const mapStateToProps = state => ({ payloadState: state.payloadReducer.payload })
const mapDispatchToProps = { sendPayload }

const EnlargedImage = connect(mapStateToProps, mapDispatchToProps)(EnlargedImageScreen)
export default EnlargedImage
