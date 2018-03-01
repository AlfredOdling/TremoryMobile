
import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Icon, Button, List, ListItem, SearchBar } from 'react-native-elements';

import PointList from './../components/Points/PointList';

import { getPointsFromCurrentUser } from './../utils/static/PointFetch';
import { imageIdToURI, imageIdToThumbURI, imageIdToURL } from './../utils/static/Image';

export default class ImageGrid extends React.Component {

  render() {
    return (

      <View style={styles.container}>
        {this.generateGrid(this.props.gridArray)}
      </View>
    );
  }

  generateGrid(gridArray) {

    var list = [];

    for( let i = 0; i < gridArray.length; i++){
      list.push(this.generateThumbnail(gridArray[i], i));
    }

    return list;
  }

  // generateThumbnail(thumbObj, key) { TODO
  //   return (
  //     <TouchableOpacity key={key} style={styles.thumbnailContainer} onPress={() => this.props.callback(thumbObj.link_id)}>
  //       <Image style={styles.thumbnail} source={imageIdToURI(thumbObj.thumbnail_id)}><Text style={{color: '#FFF', fontSize: 20}}>{thumbObj.text}</Text></Image>
  //     </TouchableOpacity>
  //   );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b3b3b',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#3b3b3b',
    alignItems: 'center',
    justifyContent: 'center',
  },


  thumbnailContainer: {
    margin: 5,
    width: Dimensions.get('window').width / 3.3, //Device width divided in almost a half
    //height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },

  thumbnail: {
    width: Dimensions.get('window').width / 3.3,
    height: Dimensions.get('window').width / 3.3,
    backgroundColor: '#000',
  },


});
