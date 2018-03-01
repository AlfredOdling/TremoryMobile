import React from 'react';
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Icon, Button, List, ListItem } from 'react-native-elements';
import { imageIdToURI, imageIdToThumbURI } from '../../utils/static/Image';

const { width, height } = Dimensions.get('window');

export default class PointList extends React.Component {
  render() {

    const {points} = this.props;
    const {filter} = this.props;

    return (
      <View style={styles.content}>
        {this.pointListLoop(points, filter)}
      </View>
    );
  }

  pointListLoop(points, filter) {
    var list = [];

    for( let i = 0; i < points.length; i++){
      list.push(this.filter(points[i], filter));
    }


    return list;
  }

  filter(point, filterText) {
    if(filterText) {

      if(point.user_first.toUpperCase().includes(filterText.toUpperCase()) ||
         point.user_last.toUpperCase().includes(filterText.toUpperCase())) {
        return this.createListItem(point);
      }
    }
    else {
      return this.createListItem(point);
    }
  }

  createListItem(point) {
    return (
      <ListItem
        key={point.image_id}
        roundAvatar
        avatar={imageIdToThumbURI(point.image_id)}
        title={`${point.user_first.toUpperCase()} ${point.user_last.toUpperCase()}`}
        subtitle={point.locality + " " + point.image_time}
        onPress={() => {this.props.nav(point)}}
        titleStyle={styles.textStyle}
        />
      );
  }
}



const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#4b4b4b',

  },
  textStyle: {
    color: '#DDD',
  }
});
