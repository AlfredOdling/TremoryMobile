import React from 'react';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import { Tile, Avatar, Card, Button } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

export default class ProfileHeader extends React.Component {
  render() {

    return (

            <Card>
              <View style={{flex: 1, flexDirection: 'row', marginBottom: 5,}}>
                <Avatar
                  medium
                  rounded
                  source={this.props.profilePic}
                  onPress={() => console.log("Works!")}
                  activeOpacity={0.7}
                />
                <Text
                  style={{marginTop: 10, marginLeft: 10, width: 230, fontSize: 15}}
                  adjustFonSizeToFit={true}>
                  {this.props.name}
                </Text>
              </View>
            </Card>
    );
  }
}
