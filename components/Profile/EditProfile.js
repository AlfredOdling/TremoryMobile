import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { URL_getImage } from '../../utils/Utils'
import { updateUser } from '../../utils/static/UserFetch'
import Upload from '../../views/Upload'

export default class ProfileHeader extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      profilePic: undefined,
      user_description: undefined,
      user_first: undefined,
      user_last: undefined,
      textChanged: undefined,
      submitColor: undefined,
    }
  }

  componentWillMount() {
    const { thumbnail_id, user_description, user_first, user_last } = this.props.navigation.state.params.user
    let profilePic = thumbnail_id ? { url: URL_getImage(thumbnail_id) } : undefined

    this.setState({ 
      profilePic,
      user_description,
      user_first, 
      user_last,
      textChanged: false,
      submitColor: 'lightgrey'
    })
  }

  submitChanges = () => {
    const { textChanged, user_description, user_first, user_last } = this.state
    if (!textChanged) { return }
    updateUser(user_first, user_last, user_description)

    this.setState({
      textChanged: false,
      submitColor: 'lightgrey'
    })
  }

  onChangeText = (text, type) => {
    const { user_description } = this.props.navigation.state.params.user
    
    let textChanged = false
    if (type=='user_description' && user_description!=text) {
      textChanged = true
    }

    let submitColor = textChanged? '#3F99ED' : 'lightgrey'

    this.setState({
      [type]: text,
      textChanged,
      submitColor
    })
  }

  render() {
    const { user_register, user_first, user_last, friends, views, uploaded_files } = this.props.navigation.state.params.user
    const { profilePic, user_description, submitColor } = this.state
    
    return (
      <View style={styles.container}>
      <View style={{ alignItems: 'center', margin: 20 }}>
          <Image style={styles.profilePic} source={profilePic} />
          <Upload/>
        </View>

        <View style={{ margin: 20 }}>
          <View style={styles.textContainer}>
            <Text style={styles.text1}>Biography</Text>
            <TextInput 
              multiline={true}
              onChangeText={ text => this.onChangeText(text, 'user_description') } 
              value={user_description} 
              style={styles.text2}/>
          </View>
    
          <TouchableOpacity onPress={() => this.submitChanges()}>
           <Text style={[styles.text1, { marginTop: 20, alignSelf: 'center', fontWeight: '400', color: submitColor }]}>Submit changes</Text>
          </TouchableOpacity>
          
          <Text style={[styles.text1, { marginTop: 200, alignSelf: 'center' }]}>Member since {user_register}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profilePic: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  textContainer: {
    marginBottom: 15
  },
  text1: {
    marginBottom: 10,
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
})