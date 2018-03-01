import React from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
// import { StartupStack } from './config/router';
import App from './App'

export default class TremoryApp extends React.Component {
  // return <StartupStack/>

  render() {
    return <App/>
  }
}

AppRegistry.registerComponent('TremoryApp', () => TremoryApp);
