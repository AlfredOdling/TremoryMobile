
import React from 'react';
import { StyleSheet, View, Text, StatusBar, ScrollView, AsyncStorage } from 'react-native';
import { Icon, Button, List, ListItem, SearchBar } from 'react-native-elements';

import PointList from './../components/Points/PointList';

import { getPointsFromCurrentUser } from './../utils/static/PointFetch';
import { imageIdToURI, imageIdToThumbURI, imageIdToURL } from './../utils/static/Image';

import {imageIdToURLWithOrientation} from '../utils/static/Image';

export default class Points extends React.Component {

  constructor(props) {
    super(props);
    this.state = {points: [], isLoading: true};
  }

  async componentDidMount() {
    try {
      console.log('WTF');
      this.setState({points: this.props.navigation.state.params.points});
      await this.setState({isLoading: false});
      console.log('WTF');
    }
    catch (e) {
      this.getPointsFromServer();
      console.log('FAILED!');
    }
  }

  async getPointsFromServer() {
    await this.setState({points: (await getPointsFromCurrentUser())});
    await this.setState({isLoading: false});
  }

  render() {
    const {points} = this.state;

    if (this.state.isLoading) {
      return <View style={styles.loadingContainer}><Text style={{color: '#eee'}}>Loading...</Text></View>;
    }

    return (

      <ScrollView style={styles.container}>
      <SearchBar
        onChangeText={(text) => {this.searchChange(text)}}
        placeholder='Type Here...' />

      <PointList points={points} filter={this.state.filter} nav={this. navigateToPoint.bind(this)}/>
      </ScrollView>
    );
  }

  async navigateToPoint(pointObj) {
    let user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);

    let token = encodeURIComponent('s:' + user.authID.length + ':\"' + user.authID + '\";');
    let mail = encodeURIComponent('s:' + user.mail.length + ':\"' + user.mail + '\";');

    imageIdToURLWithOrientation(pointObj.image_id, token, mail, pointObj.image_orientation, this.waitForRotation.bind(this));
  };

  waitForRotation(uri) {
    this.props.navigation.navigate('PointView', {url: uri});
  }

  searchChange(text) {
    this.setState({ filter: text });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b3b3b',
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#3b3b3b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
