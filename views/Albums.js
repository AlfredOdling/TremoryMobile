
import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Icon, Button, List, ListItem, SearchBar } from 'react-native-elements';

import ImageGrid from './../components/ImageGrid';

import { getAlbumsFromCurrentUser, getAlbumPoints } from './../utils/static/AlbumFetch';
import { imageIdToURI, imageIdToThumbURI, imageIdToURL } from './../utils/static/Image';

export default class Albums extends React.Component {

  constructor(props) {
    super(props);
    this.state = {points: [], isLoading: true};
    this.getAlbumsFromServer();
  }

  async getAlbumsFromServer() {
    await this.setState({albums: (await getAlbumsFromCurrentUser())});
    await this.setState({albums: this.generateGridArray(this.state.albums)});

    await this.setState({isLoading: false});
  }

  generateGridArray(albumJSON) {
    var list = [];

    for( let i = 0; i < albumJSON.length; i++){
      list.push({thumbnail_id: albumJSON[i].thumbnail_id, link_id: albumJSON[i].id, text: albumJSON[i].album_name});
    }

    return list;
  }

  render() {

    if (this.state.isLoading) {
      return <View style={styles.loadingContainer}><Text style={{color: '#eee'}}>Loading...</Text></View>;
    }

    return (
      <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
        <ImageGrid gridArray={this.state.albums} callback={this.callback.bind(this)}/>
      </ScrollView>
    );
  }

  async callback(id) {
    var ap = await getAlbumPoints(id);
    console.log(ap);
    this.props.navigation.navigate('Points', {points: (await ap)});
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
