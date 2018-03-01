import React from "react"
import { connect } from "react-redux"
import ProfileBody from "../components/Profile/ProfileBody"
import { _getPointsFromUserById } from "../src/Actions/imagesActions"
import { _getAlbumsFromUser } from "../src/Actions/albumActions"
import { _getOtherUserById } from '../src/Actions/userActions'

class OtherProfileScreen extends React.Component {
  
  componentWillMount() {
    const { 
      _getPointsFromUserById, 
      _getAlbumsFromUser, 
      _getOtherUserById,
      payloadState, 
    } = this.props

    const { user_id } = payloadState.payload
    
    _getOtherUserById(user_id)
    _getPointsFromUserById(user_id)
    _getAlbumsFromUser(user_id)
  }
  
  render() {
    const { navigation, otherUser, userByIdImages, albumsFromUser } = this.props

    return (<ProfileBody 
              albums={albumsFromUser}
              images={userByIdImages}
              navigation={navigation} 
              user={otherUser} 
              isOtherProfile={true} 
              />)
  }
}

const mapStateToProps = state => ({
  albumsFromUser: state.albumReducer.getAlbumsFromUserReducer.albumsFromUser,
  userByIdImages: state.imagesReducer.getPointsFromUserByIdReducer.userByIdImages,
  otherUser: state.userReducer.getOtherUserByIdReducer.otherUser,
  payloadState: state.payloadReducer
})

const mapDispatchToProps = { _getPointsFromUserById, _getAlbumsFromUser, _getOtherUserById }

const OtherProfile = connect(mapStateToProps, mapDispatchToProps)(OtherProfileScreen)
export default OtherProfile