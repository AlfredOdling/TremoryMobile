import React from 'react';
import { AppRegistry, StyleSheet, View, Image, PermissionsAndroid } from 'react-native';
// import { StartupStack } from './config/router';
import App from './App'

export default class TremoryApp extends React.Component {
  // return <StartupStack/>

  //var waitForPermission = true;
  componentDidMount() {
    this.checkNeccessaryPermissions();
  }

  render() {
    return <App />
  }

  async checkNeccessaryPermissions() {

    var permissions = [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                       PermissionsAndroid.PERMISSIONS.CAMERA]

    try {
      const granted = await PermissionsAndroid.requestMultiple(permissions)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('All permissions granted');
      } else {
        console.log("Permissions denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }
}



AppRegistry.registerComponent('TremoryApp', () => TremoryApp);

/*import React from 'react'
import { AppRegistry, StyleSheet, Platform } from 'react-native'
import {StartupStack} from './config/router'

export default class TremoryApp extends React.Component {

  render() {
    return <StartupStack/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

AppRegistry.registerComponent('TremoryApp', () => TremoryApp)
*/
