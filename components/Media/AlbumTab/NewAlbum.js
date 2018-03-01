import React from 'react'
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from 'react-native'
import RadioButton from 'radio-button-react-native'
import { createAlbum } from '../../../utils/static/AlbumFetch'
import AlbumView from '../AlbumTab/AlbumView'
import { sendPayload } from '../../../src/Actions/payloadActions'
import { connect } from 'react-redux'
import { _createAlbum } from '../../../src/Actions/albumActions'

class NewAlbumScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      albumName: '',
      albumDescription: '',
      security: 1,
    }
  }

  handleOnPress = (value) => {
    this.setState({ security: value })
  }

  createAlbum() {
    const { albumName, albumDescription, security } = this.state
    const { _createAlbum } = this.props

    if (albumName=='') { return }

    console.log('====================================');
    console.log('albumName, albumDescription, security', albumName, albumDescription, security);
    console.log('====================================');
    
    _createAlbum(albumName, albumDescription, security)
  }

  onChangeText = (text, type) => { 
    this.setState({ [type]: text }) 
  }

  componentWillReceiveProps(nextProps) {
    const { sendPayload, navigation } = this.props
    console.log('====================================');
    console.log('nextProps', nextProps);
    console.log('====================================');

    if (nextProps.albumIsCreated) {
      sendPayload({ isNewAlbum: true})
      navigation.navigate('AlbumView')
    }
  }

  render() {
    const { albumDescription, albumName } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>

          <Text style={[styles.text1, { marginTop: 10 }]}>Name of album</Text>
          <TextInput
            multiline={true}
            onChangeText={text => this.onChangeText(text, 'albumName')}
            value={albumName}
            style={styles.text2} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text1}>Album description</Text>
          <TextInput
            onChangeText={text => this.onChangeText(text, 'albumDescription')}
            value={albumDescription}
            style={styles.text2} />
        </View>

        <View style={[styles.radioBtn, { paddingTop: 20 }]}>
          <RadioButton
            currentValue={this.state.security}
            value={1}
            onPress={ () => this.handleOnPress()} />
             <Text style={styles.btnText}>Public</Text>
        </View>

        <View style={styles.radioBtn}>
          <RadioButton
            currentValue={this.state.security}
            value={2}
            onPress={ () => this.handleOnPress()} />
              <Text style={styles.btnText}>Friends</Text>
        </View>

        <View style={styles.radioBtn}>
          <RadioButton
            currentValue={this.state.security}
            value={3}
            onPress={ () => this.handleOnPress()} />
              <Text style={styles.btnText}>Private</Text>
        </View>

        <TouchableOpacity onPress={() => this.createAlbum()}>
          <Text style={styles.createAlbum}>Create album</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    flex: 1,
  },
  text1: {
    marginBottom: 5,
    fontWeight: '100',
    fontSize: 14
  },
  text2: {
    backgroundColor: '#F1F1F1',
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: '100%'
  },
  radioBtn: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    marginLeft: 5,
    fontWeight: '100',
    fontSize: 14
  },
  createAlbum: {
    marginTop: 180,
    alignSelf: 'center',
    fontWeight: '400',
    color: '#3F99ED',
    fontSize: 20,
    fontWeight: '300'
  }
})


const mapStateToProps = state => ({
  albumIsCreated: state.albumReducer.createAlbumReducer.fetched,
})
const mapDispatchToProps = { sendPayload, _createAlbum }

const NewAlbum = connect(mapStateToProps, mapDispatchToProps)(NewAlbumScreen)
export default NewAlbum 