import React from 'react';
import { StyleSheet, View, Image, StatusBar, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation'
import TimerMixin from 'react-timer-mixin';

export default class SplashScreen extends React.Component {

  componentDidMount() {

    this.checkPrevoiusLogin();

    setTimeout(() => {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: this.state.path})
        ]
      });
    
      this.props.navigation.dispatch(resetAction);
    }, 2000);
  }

  async checkPrevoiusLogin() {
    //console.log('WTF ' + await AsyncStorage.getItem('user'));
    //(await AsyncStorage.getItem('user')) !== null ? this.setState({path: 'Main'}) : this.setState({path: 'Login'});
    this.setState({path: 'Login'});
  }

  renewCookie() {

  }

  render() {

    var image = require('../res/images/iconSmall.png')

    return (
      <View style={styles.container}>
        <StatusBar hidden={false}/>
        <Image source={image} style={styles.logo}></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2b2b',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    height: 250,
  },
});
