import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView } from 'react-native'
// import { deleteAlbum, addUserToAlbum, updateAlbum, getAlbumUsers, removeUserFromAlbum } from '../../../utils/static/AlbumFetch'
import RadioButton from 'radio-button-react-native'
import Autocomplete from 'react-native-autocomplete-input'
// import { search } from '../../../utils/static/SearchFetch'
import { connect } from 'react-redux'
import { 
  _deleteAlbum, 
  _addUserToAlbum, 
  _updateAlbum,
  _getAlbumUsers,
  _removeUserFromAlbum,
  _getAlbumsFromCurrentUser,
 } from '../../../src/Actions/albumActions'
import { _search } from '../../../src/Actions/searchActions'

class AlbumSettingsView extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      album_name: undefined,
      album_description: undefined,
      valueChanged: undefined,
      submitColor: undefined,
      // newFriend: [],
      security_level: undefined,
      security: undefined,
      query: '',
      data: [],
      userID: undefined,
      relation: undefined,
    }
  }

  componentWillMount() {
    const { id, album_name, album_description, security_level, relation } = this.props.payload
    const { _getAlbumUsers } = this.props

    _getAlbumUsers(id)

    this.setState({
      relation,
      id,
      security: 3,
      security_level,
      album_name,
      album_description,
      valueChanged: false,
      submitColor: 'lightgrey',
    })
  }

  componentWillReceiveProps(nextProps) {
    const { 
      albumUsers, 
      hasFetchedNewUsers, 
      searchResult, 
      hasFetchedSearchResult, 
      hasDeletedAlbum, 
      userIsRemoved,
      navigation,
      hasAddedUser,
      hasUpdatedAlbum,
      _getAlbumsFromCurrentUser,
      _getAlbumUsers,
    } = this.props
    const { id } = this.state

    if (nextProps.albumUsers !== albumUsers && nextProps.hasFetchedNewUsers) { 
      this.renderUsersInAlbum(albumUsers)
     }
  
    if (nextProps.searchResult !== searchResult && nextProps.hasFetchedSearchResult) { 
      this.updateFriendListAfterSearch(nextProps.searchResult)
     }

    if (nextProps.hasDeletedAlbum !== hasDeletedAlbum && nextProps.hasDeletedAlbum ) { 
      navigation.navigate('Profile')
    }

    if (nextProps.userIsRemoved !== userIsRemoved && nextProps.userIsRemoved) { 
      _getAlbumUsers(id)
    }

    if (nextProps.hasUpdatedAlbum !== hasUpdatedAlbum && nextProps.hasUpdatedAlbum) { 
      _getAlbumsFromCurrentUser(id)
    }

    if (nextProps.hasAddedUser !== hasAddedUser && nextProps.hasAddedUser) { 
      _getAlbumUsers(id)
      this.setState({ query: '' })
    }
    
  }

  onChange = (value, type) => {
    const { album_name, album_description, security_level, security } = this.props.payload

    let valueChanged = false
    if (type == 'album_name' && album_name != value) {
      valueChanged = true
    }
    // else if (type == 'newFriend' && newFriend != value) {
    //   valueChanged = true
    // } 
    else if (type == 'album_description' && album_description != value) {
      valueChanged = true
    } else if (type == 'security_level' && security_level != value) {
      valueChanged = true
    } else if (type == 'security' && security != value) {
      valueChanged = true
    }

    let submitColor = valueChanged ? '#3F99ED' : 'lightgrey'

    this.setState({
      [type]: value,
      valueChanged,
      submitColor
    })
  }

  submitChanges = () => {
    const { valueChanged } = this.state
    if (!valueChanged) { return }

    const { id, album_name, album_description, security_level } = this.state

    this.setState({
      valueChanged: false,
      submitColor: 'lightgrey'
    })

    this.props._updateAlbum(id, album_name, album_description, security_level)
  }

  deleteUser = (user_id) => {
    const { id } = this.state
    const { albumUsers, _removeUserFromAlbum } = this.props

    let index = -1

    for (let i = 0; i < albumUsers.length; i++) {
      if (albumUsers[i].id == user_id) {
        index = i
      }
    }

    albumUsers.splice(index, 1)

    _removeUserFromAlbum(id, user_id)
  }

  deleteAlbum = () => {
    const { navigation, _deleteAlbum } = this.props
    const { album_name, id } = this.state

    Alert.alert(
      'Wait!',
      'Are you sure you want to delete ' + album_name + '?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        {
          text: 'OK', onPress: () => { _deleteAlbum(id) }
        },
      ]
    )
  }

  renderUsersInAlbum = (albumUsers) => {
    const { relation } = this.state
    // const { albumUsers } = this.props

    let usersInAlbumToRender = albumUsers.map((item, i) => {
      return (
        <View style={styles.textContainer} key={i}>
          <Text style={styles.text}>{item.user_first + ' ' + item.user_last}</Text>

          {relation == 2 || relation == 1 ?
            <TouchableOpacity onPress={() => this.deleteUser(item.id)}>
              <Image style={{ height: 17, width: 17 }} source={require('../../../res/delete.png')} />
            </TouchableOpacity>
            : []}
        </View>
      )
    })

    return (
      <View style={styles.usersContainer}>
        {usersInAlbumToRender}
      </View>
    )
  }

  addFriend = () => {
    const { query, security, id, userID } = this.state
    const { _addUserToAlbum } = this.props

    if (query == '') { return }

    _addUserToAlbum(id, userID, security)
  }

  handleOnPress = (value, type) => {
    this.setState({ [type]: value })
  }

  updateFriendListAfterSearch(searchResult) {
    let searchResultsToRender = []
    let toFilterForID = []
    
    searchResult.forEach((person) => {
      let str1 = person.user_first + ' '
      let str2 = person.user_last
      let res = str1.concat(str2)

      toFilterForID.push({ name: res, id: person.id })
      searchResultsToRender.push(res)
    })

    this.setState({
      data: searchResultsToRender,
      toFilterForID
    })
  }

  getIDfromUser(user) {
    const arraywithID = this.state.toFilterForID

    arraywithID.forEach(element => {
      if (user == element.name) { this.setState({ userID: element.id }) }
    })
  }

  searchForFriend = text => { this.props._search(text, 'users') }

  render() {
    // Relation = 1: created the album, 2: admin; 3 regular member; 4 guest
    const { 
      query, 
      data, 
      submitColor, 
      album_name, 
      album_description, 
      security_level, 
      security, 
      relation 
    } = this.state

    const { albumUsers } = this.props

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={[styles.text, { alignSelf: 'center', marginVertical: 10 }]}>Title</Text>
          <TextInput
            onChangeText={text => this.onChange(text, 'album_name')}
            value={album_name}
            style={[styles.text2, { marginBottom: 10 }]} />

          <Text style={[styles.text, { alignSelf: 'center', marginVertical: 10 }]}>Description</Text>

          <TextInput
            onChangeText={text => this.onChange(text, 'album_description')}
            value={album_description}
            style={[styles.text2, { marginBottom: 10 }]} />

          {relation == 1 ?
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 10 }}>
              <View style={styles.radioBtn}>
                <RadioButton
                  currentValue={security_level}
                  value={1}
                  onPress={() => {
                    this.onChange(1, 'security_level')
                    this.handleOnPress(1, 'security_level')
                  }} />
                <Text style={styles.btnText}>Public</Text>
              </View>

              <View style={styles.radioBtn}>
                <RadioButton
                  currentValue={security_level}
                  value={2}
                  onPress={() => {
                    this.onChange(2, 'security_level')
                    this.handleOnPress(2, 'security_level')
                  }} />
                <Text style={styles.btnText}>Friends</Text>
              </View>

              <View style={styles.radioBtn}>
                <RadioButton
                  currentValue={security_level}
                  value={3}
                  onPress={() => {
                    this.onChange(3, 'security_level')
                    this.handleOnPress(3, 'security_level')
                  }} />
                <Text style={styles.btnText}>Private</Text>
              </View>
            </View>
            : []}

          <TouchableOpacity onPress={() => this.submitChanges()}>
            <Text style={[styles.text1, { alignSelf: 'center', fontWeight: '400', color: submitColor, marginTop: 10 }]}>Save changes</Text>
          </TouchableOpacity>

          <Text style={[styles.text, { alignSelf: 'center', marginTop: 40, marginBottom: 10, }]}>People in your album</Text>
          {this.renderUsersInAlbum(albumUsers)}

          {relation !== 4 ?
            <View>
              <Text style={[styles.text, { alignSelf: 'center', marginTop: 40, marginBottom: 10, }]}>Add a friend to album</Text>
              <View style={{ marginBottom: 40 }}>
                <Autocomplete
                  data={data}
                  defaultValue={query}
                  onChangeText={ text => this.setState({ query: text }, this.searchForFriend(text) )}
                  renderItem={data => (
                    <TouchableOpacity onPress={() => this.setState({ query: data, data: [] }, this.getIDfromUser.bind(this, data))}>
                      <View style={{ marginVertical: 7, marginLeft: 7 }}>
                        <Text>{data}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />

                <Text style={[styles.text, { alignSelf: 'center', marginTop: 10 }]}>Choose rights</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 10 }}>
                  <View style={styles.radioBtn}>
                    <RadioButton
                      currentValue={security}
                      value={4}
                      onPress={() => this.handleOnPress(4, 'security')} />
                    <Text style={styles.btnText}>View</Text>
                  </View>

                  <View style={styles.radioBtn}>
                    <RadioButton
                      currentValue={security}
                      value={3}
                      onPress={() => this.handleOnPress(3, 'security')} />
                    <Text style={styles.btnText}>Add</Text>
                  </View>

                  <View style={styles.radioBtn}>
                    <RadioButton
                      currentValue={security}
                      value={2}
                      onPress={() => this.handleOnPress(2, 'security')} />
                    <Text style={styles.btnText}>Add / Remove</Text>
                  </View>
                </View>

                <TouchableOpacity onPress={() => this.addFriend()} style={styles.addFriendsBtn}>
                  <Text style={{ color: 'white', fontWeight: '500' }}>Add a friend to album</Text>
                </TouchableOpacity>
              </View>
            </View>
            : []}

          {relation == 1 ?
            <TouchableOpacity style={{ marginTop: 30, alignSelf: 'center' }} onPress={() => { this.deleteAlbum() }}>
              <Text style={{ color: 'red', fontSize: 16, fontWeight: '500' }}>Delete album</Text>
            </TouchableOpacity>
            : []}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    flex: 1,
    paddingBottom: 94,
  },
  text: {
    fontSize: 14,
    fontWeight: '100'
  },
  textContainer: {
    marginVertical: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text1: {
    fontWeight: '100',
    fontSize: 16
  },
  text2: {
    fontSize: 14,
    backgroundColor: '#F1F1F1',
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: '100%'
  },
  usersContainer: {
    justifyContent: 'flex-start',
    borderRadius: 5,
    borderColor: 'lightgrey',
    borderWidth: 1,
    backgroundColor: '#F1F1F1',
    overflow: 'hidden',
    paddingHorizontal: 7,
  },
  addFriendsBtn: {
    alignSelf: 'center',
    marginTop: 15,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#3F99ED',
    overflow: 'hidden',
    padding: 8,
    width: '60%',
  },
  radioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    marginLeft: 5,
    fontWeight: '100',
    fontSize: 14
  },
})

const mapStateToProps = state => ({
  albumUsers: state.albumReducer.getAlbumUsersReducer.albumUsers, // Albumreducer
  hasDeletedAlbum: state.albumReducer.deleteAlbumReducer.fetched, // Albumreducer
  userIsRemoved: state.albumReducer.removeUserFromAlbumReducer.fetched, // Albumreducer
  hasFetchedNewUsers: state.albumReducer.getAlbumUsersReducer.fetched, // Albumreducer
  hasAddedUser: state.albumReducer.addUserToAlbumReducer.fetched, // Albumreducer
  hasUpdatedAlbum: state.albumReducer.updateAlbumReducer.fetched, // Albumreducer
  searchResult: state.searchReducer.data, // Searchreducer
  hasFetchedSearchResult: state.searchReducer.fetched, // Searchreducer
  payload: state.payloadReducer.payload // Payloadreducer
})

const mapDispatchToProps = { 
  _deleteAlbum, 
  _addUserToAlbum, 
  _updateAlbum, 
  _getAlbumUsers, 
  _removeUserFromAlbum,
  _getAlbumsFromCurrentUser,
  _search,
}

const AlbumSettings = connect(mapStateToProps, mapDispatchToProps)(AlbumSettingsView)
export default AlbumSettings 