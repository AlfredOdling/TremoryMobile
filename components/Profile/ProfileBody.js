import React from 'react'
import { StyleSheet, ScrollView, View, Image } from 'react-native'
import Nav from '../../components/Profile/Nav'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import ProfileInfo from '../../components/Profile/ProfileInfo'
import ProfileContent from '../../components/Profile/ProfileContent'

export default class ProfileBody extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showComponents: {
        showImages: 'flex',
        showAlbum: 'none',
        showFriends: 'none',
      },
    }
  }

  navigateMenu = currentView => {
    this.setState({
      showComponents: {
        showImages: currentView == 'ImagesTab' ? 'flex' : 'none',
        showAlbum: currentView == 'AlbumView' ? 'flex' : 'none',
        showFriends: currentView == 'Friends' ? 'flex' : 'none',
      },
    })
  }

  render() {
    const { navigation, otherProfile, user } = this.props
    const { showComponents } = this.state
    
    return (
      <View style={{ flex: 1 }} >
        { otherProfile ? null : <ProfileHeader user={user} /> }
        <ScrollView style={styles.container} >
          <ProfileInfo otherProfile={otherProfile} navigation={navigation} user={user} />
          <Nav navigateMenu={this.navigateMenu} showComponents={showComponents} />
          <ProfileContent {...this.props} showComponents={showComponents} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
})