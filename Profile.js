import React from 'react'
import ProfileBody from './components/Profile/ProfileBody'

export default class Profile extends React.Component {
  render() {
    return ( <ProfileBody navigation={this.props.navigation} /> )
  }
}