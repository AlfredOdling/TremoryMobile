import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class ProfileHeader extends React.Component {
  render() {
    const { user_first, user_last } = this.props.user

    return (
      <View style={styles.header}>
        <Text style={styles.titleText}>{user_first} {user_last}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleText: {
    fontSize: 20,
    fontWeight: '400',
  },
})
