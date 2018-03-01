import React from 'react'
import { View, Text, StyleSheet} from 'react-native'

export default class Nav extends React.Component {

  constructor(props) {
    super(props)
    let highlightedStyle = {fontWeight: '300'}
    
    this.state = {
      showImagesStyle: highlightedStyle,
      showAlbumStyle: {},
      showFriendsStyle: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.showComponents==this.props.showComponents) { return }
    
    const { showImages, showAlbum, showFriends } = nextProps.showComponents
    let highlightedStyle = {fontWeight: '300'}
    
    this.setState({
      showImagesStyle: showImages=='flex'? highlightedStyle : {},
      showAlbumStyle:  showAlbum=='flex'? highlightedStyle : {},
      showFriendsStyle:  showFriends=='flex'? highlightedStyle : {},
    })
  }

  render() {
    const { navigateMenu } = this.props
    const { showImagesStyle, showAlbumStyle, showFriendsStyle } = this.state

    return (
      <View style={styles.container}>
        <Text style={[ styles.text, showImagesStyle ]} onPress={() => navigateMenu('ImagesTab')}>Images</Text>
        <Text style={[ styles.text, showAlbumStyle ]} onPress={() => navigateMenu('AlbumView')}>Albums</Text>
        <Text style={[ styles.text, showFriendsStyle ]} onPress={() => navigateMenu('Friends')}>Friends</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  text: {
    marginRight: 10,
    fontSize: 20,
    fontWeight: '100',
  }
})