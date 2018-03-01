import React from 'react'
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import ClickableImage from '../../Stateless/ClickableImage'
import { getServerURL } from '../../../utils/Config'
import { getFeedData } from '../../../src/Actions/feedActions'
import { connect } from 'react-redux'
import { getDynamicWidth } from '../../../utils/Utils'
import { _addPointToAlbum } from '../../../src/Actions/albumActions'

class SelectImagesGridScreen extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = { selectedImages: [] }
  }

  componentWillReceiveProps(nextProps) {
console.log('===================================='); // TODO
console.log('nextProps.hasUploadedImages !== this.props.hasUploadedImages && nextProps.hasUploadedImages', nextProps.hasUploadedImages, this.props.hasUploadedImages, nextProps.hasUploadedImages)
console.log('====================================');

    if (nextProps.hasUploadedImages !== this.props.hasUploadedImages && nextProps.hasUploadedImages) { 
      this.props.navigation.navigate('AlbumView')
     }
  }

  pushImgsToAlbum = () => {
    const { selectedImages } = this.state
    const { payload, _addPointToAlbum } = this.props

    selectedImages.forEach( (imageObj) => {
      _addPointToAlbum(payload.id, imageObj.point_id) //album id, image id
    })
  }

  selectImage = (image_id, isClicked, point_id) => {
    let oldSelectedImages = Array.from(this.state.selectedImages)    
    let imageObj = {image_id, point_id}

    if (isClicked) {
      let i = oldSelectedImages.findIndex( (e) => e.image_id==image_id )
      oldSelectedImages.splice(i, 1)
    } else {
      oldSelectedImages.push(imageObj)
    }
    
    this.setState({ selectedImages: oldSelectedImages })
  }

  renderFlatListItem = (serverURL, item) => {
    let { image_id, thumb, locality, image_time, point_id } = item
    const { selectedImages } = this.state
    item.thumb = getServerURL()+'/server/getImage.php?id=' + image_id  + '&style=head' // TODO: refactor?
    let _imageWidth = getDynamicWidth(107)
    let _imageRatio = 1 // TODO: Replace '1.2' with data from imageObject
    let isClicked = false
    // TODO: locality, image_time

    selectedImages.forEach( element => {
      if (element.image_id==image_id) { isClicked = true }
    })

    return (
        <TouchableOpacity style={{ zIndex: 0 }} key={'2bsd' + item.key} onPress={() => { this.selectImage(image_id, isClicked, point_id) }}>
          <View style={{ marginVertical: 7 }}>
            <Image
              key={'2f' + item.key}
              style={{
                width: _imageWidth,
                height: _imageWidth * _imageRatio,
                borderRadius: 15,
                marginHorizontal: 5,
                marginVertical: 5
              }}
              source={{ url: item.thumb }} />
              <View style={{ marginLeft: 7, width: _imageWidth }}>
                <Text style={{ fontSize: 12, fontWeight: '500' }}>17/04/10</Text>
                <Text style={{ fontSize: 12, fontWeight: '100' }}>Hong Kong</Text>
              </View>
            </View>
        
          { isClicked ?
            <View style={{ position: 'absolute', top: 20, right: 13, backgroundColor: '#3F99ED', height: 20, width: 20, borderWidth: 2, borderColor: 'white', borderRadius: 30, zIndex: 2 }}></View>
            : 
            <View style={{ position: 'absolute', top: 20, right: 13, height: 20, width: 20, borderWidth: 2, borderColor: 'white', borderRadius: 30, zIndex: 2 }}></View>
           }
        </TouchableOpacity>
    )
  }

  render() {
    const { images } = this.props
    const { selectedImages } = this.state
    let serverURL = getServerURL()

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

        { selectedImages.length>0 ?
          <TouchableOpacity onPress={ () => { this.pushImgsToAlbum() } } style={styles.selectedImages}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: 'white'}}>Add { selectedImages.length } images to your album </Text>
            <Image style={{ marginLeft: 6, height: 12, width: 5 }} source={require('../../../res/forward.png')} />
          </TouchableOpacity> 
        : undefined }
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
  selectedImages: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%', 
    paddingVertical: 15, 
    position: 'absolute', 
    bottom: 0, 
    zIndex: 3, 
    backgroundColor: '#3F99ED',
  }
})

const mapStateToProps = state => ({ 
  payload: state.payloadReducer.payload,
  images: state.imagesReducer.getPointsFromCurrentUserReducer.currentUserImages,
  hasUploadedImages: state.albumReducer.addPointToAlbumReducer.fetched,
})
const mapDispatchToProps = { _addPointToAlbum }

const SelectImagesGrid = connect(mapStateToProps, mapDispatchToProps)(SelectImagesGridScreen)
export default SelectImagesGrid