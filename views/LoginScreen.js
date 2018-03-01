import React from 'react'
import { StyleSheet, Text, View, Image, KeyboardAvoidingView } from 'react-native'
import LoginForm from '../components/Login/LoginForm'
import { isProduction } from '../utils/Config'
import { loginUser } from "../src/Actions/loginActions"
import { connect } from "react-redux"

class LoginScreen extends React.Component {

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View>
          <Image style={styles.logo} source={require('../res/images/iconLarge.png')} />
        </View>

        <View style={styles.formContainer}>
          <LoginForm callBack={this.loginCallback.bind(this)} />
        </View>
      </KeyboardAvoidingView>
    )
  }

  loginCallback(email, password) {
    if (!isProduction()) {
      if (!email && !password) {
        email = 'test@testsson.se'
        password = 'testtest'
      }
    }
    
    this.props.loginUser(email, password)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  logo: {
    width: 225,
    height: 170
  }
})

const mapDispatchToProps = { loginUser }
const Login = connect(null, mapDispatchToProps)(LoginScreen)
export default Login