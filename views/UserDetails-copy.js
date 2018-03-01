import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';

import { imageIdToURI } from '../../static/Image';

export default class UserDetails extends React.Component {
  render() {

    const {user} = this.props.navigation.state.params;

    return (
      <ScrollView style={styles.container}>
        <StatusBar hidden={true}/>
        <ProfileHeader name={user.user_first} profilePic={imageIdToURI(user.thumbnail_id)}/>

        <View style={{height: 10}}/>
      <PointsAndAlbum/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
