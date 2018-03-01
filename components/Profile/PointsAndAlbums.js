import React from 'react';
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

export default class ProfileHeader extends React.Component {
  render() {

    return (
      <View style={{flex: 1, flexDirection: 'row', marginBottom: 5, justifyContent: 'space-between',}}>

        <View style={styles.buttonContainer}>
          <Button
            onPress={this.props.pointCall}
            icon={{name: 'beenhere'}}
            title= 'Points'
            backgroundColor= '#91c7a9'
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            onPress={this.props.albumCall}
            icon={{name: 'photo-album'}}
            title= 'Album'
            backgroundColor= '#a92f41'
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
  },
});
