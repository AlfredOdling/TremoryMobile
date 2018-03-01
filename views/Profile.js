import React from 'react'
import { connect } from 'react-redux'
import ProfileBody from '../components/Profile/ProfileBody'
import { _getPointsFromCurrentUser } from '../src/Actions/imagesActions'
import { _getAlbumsFromCurrentUser } from '../src/Actions/albumActions'
import { _getFriends } from '../src/Actions/friendActions'

class ProfileScreen extends React.Component {
  
  componentWillMount() {
    const { 
      _getPointsFromCurrentUser, 
      _getAlbumsFromCurrentUser, 
      _getFriends,
    } = this.props
    
    _getFriends()
    _getPointsFromCurrentUser()
    _getAlbumsFromCurrentUser()
  }

  render() {
    const { 
      navigation, 
      currentUser,
      currentUserImages,
      albumsFromCurrentUser,
      friendList,
    } = this.props

    return (<ProfileBody 
              images={currentUserImages}
              albums={albumsFromCurrentUser}
              user={currentUser} 
              navigation={navigation} 
              friendList={friendList}
              />)
  }
}

const mapDispatchToProps = { _getPointsFromCurrentUser, _getAlbumsFromCurrentUser, _getFriends }
const mapStateToProps = state => ({ 
  friendList: state.friendsReducer.friendListReducer.friendList,
  currentUserImages: state.imagesReducer.getPointsFromCurrentUserReducer.currentUserImages,
  albumsFromCurrentUser: state.albumReducer.getAlbumsFromCurrentUserReducer.albumsFromCurrentUser,
  currentUser: state.userReducer.currentUserReducer.currentUser
 })

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
export default Profile