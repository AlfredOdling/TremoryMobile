import React from 'react';
import { StyleSheet, View, Text, StatusBar, Button, AsyncStorage, Dimensions } from 'react-native';

import PhotoView from 'react-native-photo-view';
import {login} from './../utils/static/Auth';

export default class PointView extends React.Component {
  render() {

    const { width, height } = Dimensions.get('window');
    console.log(this.props.navigation.state.params.url);

    return (
      <PhotoView
        source={{uri: this.props.navigation.state.params.url}}
        minimumZoomScale={1}
        maximumZoomScale={3}
        androidScaleType="center"
        onLoad={() => console.log("Image loaded!")}
        style={{flex: 1, backgroundColor: '#000'}} 
      />
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
