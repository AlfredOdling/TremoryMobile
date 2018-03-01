import React from 'react';
import { StyleSheet, ScrollView, StatusBar, View } from 'react-native';
import { Text, Button, Divider, List, ListItem } from 'react-native-elements';

import ProfileHeader from './../components/Profile/ProfileHeader';
import PointsAndAlbum from './../components/Profile/PointsAndAlbums';
import FriendList from './../components/Friends/FriendList';

import { imageIdToURI } from './../utils/static/Image';

export default class UserDetails extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {user} = this.props.navigation.state.params;

    return (
      <ScrollView style={styles.container}>
        <StatusBar hidden={true}/>
        <ProfileHeader name={user.user_first} profilePic={imageIdToURI(user.thumbnail_id)}/>

        <View style={{height: 10}}/>
        <PointsAndAlbum/>
      </ScrollView>
    );
  }

  navigateToProfile = (userObj) => {
    this.props.navigation.navigate('UserDetails', { user: userObj });
  };

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b3b3b',
  },
});
