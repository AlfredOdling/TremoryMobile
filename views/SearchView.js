import React from 'react'
import { StyleSheet, TouchableHightLight, Text, View, TextInput, Image, TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native'
import { imageIdToThumbURI } from '../utils/static/Image'
import ImageGrid from '../components/Media/ImagesTab/ImageGrid'
import { connect } from 'react-redux'
import { _search } from '../src/Actions/searchActions'
import { sendPayload } from '../src/Actions/payloadActions'
import { _getAlbumPoints } from '../src/Actions/imagesActions'

class SearchViewScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      focus: undefined,
      showMoreOf: undefined,
      inputField: undefined,
      searchResults: undefined,
    }
  }

  componentWillMount() {
    this.setState({
      inputField: '',
      focus: true,
      searchResults: [],
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchResults!==this.props.searchResults) {
      this.setState({ searchResults: nextProps.searchResults })
    }
  }

  onChange = (text) => {
    const { _search } = this.props
    
    this.setState({ inputField: text })

    if (!text) {
      this.setState({
        showMoreOf: undefined,
        searchResults: [],
      })
    } else { _search(text, 'all') }
  }

  sliceSearchResults = (searchResults) => {
    let userArray = []
    let albumArray = []
    let pointArray = []
    
    searchResults.forEach((element, i) => {
      const { search_type } = element

      if (search_type=='user') {
        userArray.push(element)
      } else if (search_type=='album') {
        albumArray.push(element)
      } else if (search_type=='point') {
        pointArray.push(element)
      }
    })

    this.setState({
      userArray,
      albumArray,
      pointArray,
    })
  }

  showMoreResults = (type) => {
    const { inputField, searchResults } = this.state
    const { _search } = this.props
    
    _search(inputField, type, 0)
    
    this.setState({
      showMoreOf: type,
      searchResults: inputField ? searchResults : [] //Set to empty if string is empty
    }, () => this.sliceSearchResults(searchResults))
  }

  renderRow = (item, sectionId, index) => {
    return (
      <TouchableHightLight
        style={{
          height: rowHeight,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Text>{item.name}</Text>
      </TouchableHightLight>
    )
  }

  onPressNavigate = (navigateTo, payload) => {
    const { 
      _getAlbumPoints, 
      navigation, 
      sendPayload 
    } = this.props
    
    if (payload) { sendPayload(payload) }

    if (navigateTo=='AlbumView') {
      _getAlbumPoints(payload.id)
    }

    navigation.navigate(navigateTo)
  }

  renderSearchResults = () => {
    const { searchResults, showMoreOf } = this.state
    let userArray = []
    let albumArray = []
    let pointArray = []
    
    let usersHasMore = false 
    let albumsHasMore = false 
    let pointsHasMore = false

    searchResults.forEach((element, i) => {
      const { search_type, status } = element

      if (status) {
        if (status=='show_more_users') {
          usersHasMore = true 
        }else if (status=='show_more_albums') {
          albumsHasMore = true 
        }else if (status=='show_more_points') {
          pointsHasMore = true  // funkar det
        }
      } else if (search_type=='user') {
        userArray.push(element)
      } else if (search_type=='album') {
        albumArray.push(element)
      } else if (search_type=='point') {
        pointArray.push(element)
      }
    })

    const { navigate } = this.props.navigation
    let renderUsers = []
    let renderAlbums = []
    let renderPoints = undefined

    if (userArray) {
      renderUsers = userArray.map((item, i) => {
        let friendIndicator = item.relation == 3 ? { borderColor: 'lightgreen', borderWidth: 2 } : { borderColor: 'lightgrey', borderWidth: 2 }
        let fullName = item.user_first + ' ' + item.user_last
        let profilePic = imageIdToThumbURI(item.thumbnail_id)
        let payload = { user_id: item.id, fullName }

        return (
          <TouchableOpacity key={i + 'hj'} onPress={ () => this.onPressNavigate('OtherProfile', payload) }>
            <View key={i + 'jk'} style={styles.line}>
              <View style={styles.user} key={i + 'h'}>
                <Image style={[styles.profilePic, friendIndicator]} source={profilePic} />
                <Text style={{ fontWeight: '100' }}>{item.user_first + ' ' + item.user_last}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      })
    }

    if (albumArray) {
      renderAlbums = albumArray.map((item, i) => {
        let profilePic = imageIdToThumbURI(item.thumbnail_id)
        let payload = { id: item.id }

        return (
          <TouchableOpacity key={i + 'jo'} onPress={ () => this.onPressNavigate('AlbumView', payload) }>
            <View key={i + 'ja'} style={styles.line}>
              <View style={styles.album} key={i + 'aa'}>
                <Image style={styles.albumPic} source={profilePic} />

                <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <Text style={{ fontWeight: 'bold' }}>{item.album_name}</Text>
                  <Text style={{ fontWeight: '100' }}>John-John Marksted</Text>
                  <Text style={{ fontWeight: '100' }}>Created 17/02/12</Text>
                </View>

              </View>
            </View>
          </TouchableOpacity>
        )
      })
    }

    if (pointArray.length > 0) {
      renderPoints = <ImageGrid imageWidth={90} marginHorizontal={6} navigation={this.props.navigation} images={pointArray} />
    }

    return (
      <View>
        {renderUsers.length > 0 ?
          <View>
            <View style={styles.searchTitle}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{showMoreOf == 'users' ? 'Showing more of users' : 'Users'}</Text>
              <TouchableHighlight onPress={ () => this.showMoreResults('users') }>
                <Text style={{ fontSize: 14, fontWeight: '400' }}>{usersHasMore ? 'SHOW ALL' : '' } </Text>
              </TouchableHighlight>
            </View>
            {renderUsers}
          </View> : []}

        {renderAlbums.length > 0 ?
          <View>
            <View style={styles.searchTitle}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{showMoreOf == 'albums' ? 'Showing more of albums' : 'Albums'}</Text>
              <TouchableHighlight onPress={ () => this.showMoreResults('albums') }>
                <Text style={{ fontSize: 14, fontWeight: '400' }}>{albumsHasMore ? 'SHOW ALL' : '' } </Text>
              </TouchableHighlight>
            </View>

            {renderAlbums}
          </View> : []}

        {renderPoints ?
          <View>
            <View style={styles.searchTitle}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{showMoreOf == 'points' ? 'Showing more of points' : 'Points'}</Text>
              <TouchableHighlight onPress={ () => this.showMoreResults('points') }>
                <Text style={{ fontSize: 14, fontWeight: '400' }}>{pointsHasMore ? 'SHOW ALL' : '' } </Text>
              </TouchableHighlight>
            </View>
            {renderPoints}
          </View> : []}
      </View>
    )
  }

  renderIsFetching = () => {
    return (
      <View>
        <Text style={{ marginTop: 20, fontWeight: '100', 'fontSize': 17 }}>Wait a moment...</Text>
      </View>
    )
  }

  render() {
    const { inputField, focus } = this.state
    const { isFetching } = this.props

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.searchField}>
            { focus ? <Image style={styles.image} source={require('../res/searchIcon.png')} /> : undefined }
            <TextInput
              onFocus={() => { this.setState({ focus: false }) }}
              onChangeText={text => this.onChange(text)}
              value={inputField}
              placeholder={'Search'}
              style={styles.textInput} />
          </View>

          { isFetching? 
            this.renderIsFetching()
            :
            this.renderSearchResults()
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flex: 1,
    paddingBottom: 70
  },
  text1: {
    marginBottom: 10,
    fontWeight: '100',
    fontSize: 14
  },
  searchField: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    padding: 2,
  },
  textInput: {
    borderRadius: 10,
    padding: 5,
    width: '90%',
  },
  image: {
    width: 23,
    height: 23,
    borderRadius: 15,
    marginHorizontal: 5,
    marginVertical: 5
  },
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  line: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  user: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    backgroundColor: 'lightgrey'
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500'
  },
  album: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  albumPic: {
    backgroundColor: 'lightgrey',
    width: 60,
    height: 60,
    marginRight: 5,
    borderRadius: 5
  },
  searchTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 20,
  }
})

const mapStateToProps = state => ({ 
  searchResults: state.searchReducer.data,
  isFetching: state.searchReducer.isFetching,
})
const mapDispatchToProps = { _search, sendPayload, _getAlbumPoints }

const SearchView = connect(mapStateToProps, mapDispatchToProps)(SearchViewScreen)
export default SearchView