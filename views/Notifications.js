import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from "react-redux"
import { _acceptFriendRequest, _declineFriendRequest } from '../src/Actions/friendActions'
import { sendPayload } from '../src/Actions/payloadActions'
import { NavigationActions } from 'react-navigation'

class NotificationsScreen extends React.Component {

  componentWillMount() {
    const setParamsAction = NavigationActions.setParams({
      params: { hasNotifications: true }//this.props.notificationState.notificationStatusReducer.isUnseen },
    })
    this.props.navigation.dispatch(setParamsAction)
  }

  renderNotificationArray = () => {
    let data = this.props.notificationState.notificationDataReducer.data

    let notificationsToRender = data.map((notification, i) => {
      return (
        <View key={i}>
          {this.renderNotification(notification)}
        </View>
      )
    })

    return notificationsToRender
  }

  onClickGoTo = (routeName, payload) => {
    const { navigateTo, navigation, sendPayload, _getAlbumPoints } = this.props
    
    sendPayload(payload) 

    navigation.navigate(routeName)
  }

  renderNotification(notification) {
    const { _acceptFriendRequest, _declineFriendRequest } = this.props
    const { type, user_first, user_last, album_name, relation, rel_id, id, user_id } = notification
    let firstButtonText = undefined
    let backgroundColor = undefined
    let routeName = undefined
    let payload = undefined
    let eventText = undefined
    let friendRequest = false

    if (type == 'friend' && relation == 3) { // Already friends
      eventText = 'You became friends with ' + user_first + ' ' + user_last
      firstButtonText = 'See profile'
      backgroundColor = { backgroundColor: '#3F99ED' } // Blue
      routeName = 'OtherProfile' 
      let notificationClone = notification
      let fullName = user_first+' '+user_last
      notificationClone['fullName'] = fullName
      payload = notificationClone

    } else if (type == 'friend' && relation == 1) { // Friend request
      eventText = user_first + ' ' + user_last + ' wants to become friends with you'
      firstButtonText = 'Accept'
      backgroundColor = { backgroundColor: '#53B74B' } // Green
      friendRequest = true
      // TODO: different function
    } else if (type == 'album') { // Added to album, TODO: relations
      eventText = 'You got added you to the album ' + album_name // TODO: user_first + ' ' + user_last + ' added you to the album ' + album_name 
      firstButtonText = 'Go to album'
      backgroundColor = { backgroundColor: '#3F99ED' } // Blue
      routeName = 'AlbumView'
      payload = notification
    }

    return (
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <View key={user_first + 'e1c'} style={{ flexDirection: 'row', alignItems: 'center', width: '50%' }}>
          <View key={user_first + 'd1'}>
            <Text key={user_first + 'a1'} style={styles.text}>{eventText}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '50%' }}>
          <TouchableOpacity key={user_first + 'b1'} style={[styles.button, backgroundColor]} onPress={() => { friendRequest? _acceptFriendRequest(rel_id) : this.onClickGoTo( routeName, payload )}}>
            <Text key={user_first + 'c1'} style={styles.buttonText}>{firstButtonText}</Text>
          </TouchableOpacity>

          {friendRequest ?
            <TouchableOpacity key={user_first + 'b1b'} style={[styles.button, { marginLeft: 10,  backgroundColor: '#CECECE' }]} onPress={() => { _declineFriendRequest(rel_id) }}>
              <Text key={user_first + 'c1'} style={styles.buttonText}>Decline</Text>
            </TouchableOpacity> : []}
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.renderNotificationArray()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'white'
  },
  text: {
    fontWeight: '100',
    fontSize: 13
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500'
  },
})

const mapStateToProps = state => ({ notificationState: state.notificationReducer })
const mapDispatchToProps = { _acceptFriendRequest, _declineFriendRequest, sendPayload }

const Notifications = connect(mapStateToProps, mapDispatchToProps)(NotificationsScreen)
export default Notifications