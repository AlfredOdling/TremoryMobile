import React from 'react';
import { connect } from "react-redux"
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { URL_getImage } from '../../utils/Utils'
import {_getFriends, _acceptFriendRequest, _declineFriendRequest, _sendFriendRequest } from '../../src/Actions/friendActions'

class ProfileInfoScreen extends React.Component {
  
  render() {
    const { navigation, user, otherProfile } = this.props
    const { id, thumbnail_id, user_first, user_last, friends, views, uploaded_files, user_description, relation } = user
    let profilePic = thumbnail_id ? { url: URL_getImage(thumbnail_id) } : require('../../res/images/meSmall.jpeg')
    let isFriend = relation==3? true : false
  
    return (
      <View style={styles.justfortheborder}>
        <View style={styles.profileInfoContainer}>
          <View style={styles.boxContainer}>

            <Image style={styles.profilePic} source={profilePic} />

            <View style={styles.box}>
              <Text style={styles.boxNumbers}>{friends}</Text>
              <Text style={styles.boxText}>Friends</Text>
            </View>

            <View style={styles.box}>
              <Text style={styles.boxNumbers}>{views}</Text>
              <Text style={styles.boxText}>Views</Text>
            </View>

            <View style={styles.box}>
              <Text style={styles.boxNumbers}>{uploaded_files}</Text>
              <Text style={styles.boxText}>Files</Text>
            </View>
          </View>

          {otherProfile? 
            <View style={styles.buttonContainer}>
            {isFriend? undefined :
              <View>
                {relation==1? 
                <View style={[styles.friendReqButton, { backgroundColor: '#CECECE' }]}>
                  <Text style={styles.editSettingsText}>Friend request sent</Text>
                </View>
                :
                <TouchableOpacity style={styles.friendReqButton} onPress={() => { _sendFriendRequest(id) }}>
                  <Text style={styles.editSettingsText}>Send friend request</Text>
                </TouchableOpacity> }
              </View>
            }
            </View>
            :
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfile', { user }) }>
              <Text style={styles.editSettingsText}>Edit profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings', { name: 'hello' }) }>
              <Text style={styles.editSettingsText}>Settings</Text>
            </TouchableOpacity>
          </View>}

          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionText}>{user_description}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  justfortheborder: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
  profileInfoContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: 'center',
  },
  editSettingsText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500'
  },
  profilePic: {
    height: 60,
    width: 60,
    backgroundColor: 'grey',
    borderRadius: 30,
    marginRight: 5,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 245,
  },
  box: {
    width: 50,
    height: 30,
    justifyContent: 'flex-start',
  },
  boxNumbers: {
    fontWeight: 'bold',
    fontSize: 14
  },
  boxText: {
    fontWeight: '100',
    fontSize: 14
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 70,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 5,
    backgroundColor: '#CECECE',
    marginRight: 5,
  },
  friendReqButton: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 5,
    backgroundColor: '#3F99ED',
  },
  descriptionBox: {
    marginTop: 20,
  },
  descriptionText: {
    fontWeight: '100',
    marginBottom: 20,
  }
})

const mapDispatchToProps = { _getFriends, _acceptFriendRequest, _declineFriendRequest, _sendFriendRequest }
const mapStateToProps = state => ({ 
  sendFriendRequest: state.friendsReducer.sendFriendRequestReducer,
  acceptFriendRequest: state.friendsReducer.acceptFriendRequestReducer,
  declineFriendRequest: state.friendsReducer.declineFriendRequestReducer,
  friendList: state.friendsReducer.friendListReducer.friendList,
 })

const ProfileInfo = connect(mapStateToProps, mapDispatchToProps)(ProfileInfoScreen)
export default ProfileInfo