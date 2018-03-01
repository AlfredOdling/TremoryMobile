import React from 'react'
import { connect } from 'react-redux'
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity, Alert } from 'react-native'
import { Icon, Button, List, ListItem } from 'react-native-elements'
import { imageIdToURI, imageIdToThumbURI } from '../../utils/static/Image'
import { sendPayload } from "../../src/Actions/payloadActions"
import { _deleteFriend, _getFriends } from '../../src/Actions/friendActions'
import { _getCurrentUser } from '../../src/Actions/userActions'

const { width, height } = Dimensions.get('window')

class FriendListScreen extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasDeleted) { this.props._getFriends }
  }

  friendListLoop(friends, filter) {
    var list = []

    friends.forEach( (friend, i) => {
      list.push(this.filter(friend, filter))
    })

    return list
  }

  filter(friend, filterText) {
    if (filterText) {
      if (friend.user_first.toUpperCase().includes(filterText.toUpperCase()) ||
        friend.user_last.toUpperCase().includes(filterText.toUpperCase())) {
        return this.createListItem(friend)
      }
    }
    else {
      return this.createListItem(friend)
    }
  }

  createListItem(friend) {
    const { navigation, _deleteFriend } = this.props
    const { user_first, user_last, user_id } = friend
    let fullName = user_first+' '+user_last
    let payload = { user_id, fullName }

    return (
      <View key={user_first+'e1'} style={styles.nameContainer}>
        <TouchableOpacity key={user_first + 'd1'} onPress={() => { this.onPressNavigate(payload) }}>
          <Text key={user_first + 'a1'} style={styles.text}>{user_first + ' ' + user_last}</Text>
        </TouchableOpacity>

        <TouchableOpacity key={user_first + 'b1'} style={styles.button} onPress={() => { this.deleteFriend(user_id, user_first) }}>
          <Text key={user_first + 'c1'} style={styles.buttonText}>Unfriend</Text>
        </TouchableOpacity>
      </View>
    )
  }

  onPressNavigate = (payload) => {
    const { navigation, sendPayload } = this.props
  
    sendPayload(payload)
    navigation.navigate('OtherProfile')
  }

  deleteFriend = (user_id, user_first) => {
    const { _deleteFriend, _getCurrentUser } = this.props

    Alert.alert(
      'Wait!',
      'Are you sure you want remove ' + user_first + ' as your friend?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK', onPress: () => { _deleteFriend(user_id), _getCurrentUser() }
        },
      ]
    )
  }

  render() {
    const { friends, filter } = this.props

    return (
      <View style={{ flex: 1 }}>
        {friends.length>0 ? this.friendListLoop(friends, filter): []}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: '100',
    fontSize: 13
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    backgroundColor: '#CECECE',
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500'
  },
})

const mapStateToProps = state => ({ 
  friends: state.friendsReducer.friendListReducer.friends,
  hasDeleted: state.friendsReducer.deleteFriendRequestReducer.fetched,
})
const mapDispatchToProps = { sendPayload, _deleteFriend, _getFriends, _getCurrentUser }

const FriendList = connect(mapStateToProps, mapDispatchToProps)(FriendListScreen)
export default FriendList