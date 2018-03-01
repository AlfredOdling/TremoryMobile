import React from 'react'
import { StyleSheet, View, Text, Switch, ScrollView } from 'react-native'
import SyncStatus from '../../views/SyncStatus'
import KeepAwake from 'react-native-keep-awake'

export default class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = { toggled: '' }
  }

  componentWillMount() {
    this.setState({ toggled: false })

    KeepAwake.activate()
  }

  componentWillUnmount() {
    KeepAwake.deactivate()
  }

  toggle = () => {
    this.setState((prevState) => {
       toggled: !prevState.toggled 
      }) // TODO
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <SyncStatus/>

{/*        <Text style={styles.text}>Enable automatic upload</Text>
        <Switch value={this.state.toggled} onValueChange={ () => this.toggle() }/>
        <Text style={styles.smallText}>Your phone will automatically upload images when your phone is charging and is connected to wifi</Text>
    // TODOOO */}

        <KeepAwake />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 20,
  },
  smallText: {
    marginVertical: 20,
    fontWeight: '100',
    fontSize: 14,
  }
})
