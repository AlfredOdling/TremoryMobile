import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import ImageRotate from 'react-native-image-rotate';

import {rotateImagePoint} from '../utils/static/Image';

const SOURCE_IMAGE = 'http://moheban-ahlebeit.com/images/1920-Hd-Wallpapers/1920-Hd-Wallpapers-27.jpg';

export default class RotatePoint extends Component {

  constructor() {
    super();
    this.state = {
      image: SOURCE_IMAGE,
      currentAngle: 0,
      width: 150,
      height: 240,
    };

    this.rotate = this.rotate.bind(this);
  }

  rotate(angle) {
    const nextAngle = this.state.currentAngle + angle;
    rotateImagePoint(SOURCE_IMAGE, 1, this.callBackHandle.bind(this));
  }

  callBackHandle(uri) {
    this.setState({
      image: uri,
      width: this.state.height,
      height: this.state.width,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={{width: this.state.width, height: this.state.height}} source={{uri: this.state.image}} />
        </View>
        <TouchableHighlight
          onPress={() => this.rotate(90)}
          style={styles.button}
        >
          <Text style={styles.text}>ROTATE CW</Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => this.rotate(-90)}
          style={styles.button}
        >
          <Text style={styles.text}>ROTATE CCW</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    backgroundColor: 'red',
    padding: 5,
    margin: 5,
  },
  imageContainer: {
    height: 240,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});