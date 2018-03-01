import React from 'react'
import { ScrollView } from 'react-native'
import FriendList from './../components/Friends/FriendList'

/*
  This component is created for use with SearchBar => not optimal atm
*/

export default class Friends extends React.Component {

  render() {
    const { navigation } = this.props
    
    return (
      <ScrollView style={{flex: 1}}>
        {/*<SearchBar
          lightTheme
          onChangeText={(text) => { this.searchChange(text) }}
        placeholder='Search for a friend...' />*/}

        <FriendList navigation={navigation} />
      </ScrollView>
    )
  }
}