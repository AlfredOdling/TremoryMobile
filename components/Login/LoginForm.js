import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, StatusBar } from 'react-native';

export default class LoginForm extends React.Component {

  constructor() {
    super();
    this.state = {email: '', password: ''};
  }

  submitForm() {
    this.props.callBack(this.state.email, this.state.password);
    this.refs.passwordInput.blur();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <TextInput
        ref='emailInput'
        placeholder={'E-mail'}
        returnKeyType={'next'}
        keyboardType={'email-address'}
        autoCapitalize={"none"}
        autoCorrect={false}
        onSubmitEditing={() => this.refs.passwordInput.focus()}
        onChangeText={(text) => this.setState({email: text})}
        style={styles.input}/>

        <TextInput
        placeholder="Password"
        secureTextEntry
        returnKeyType="go"
        ref='passwordInput'
        onSubmitEditing={this.submitForm.bind(this)}
        onChangeText={(text) => this.setState({password: text})}

        style={styles.input}/>

        <TouchableOpacity style={styles.buttonContainer} ref='loginButton' onPress={() => {this.props.callBack(this.state.email, this.state.password)}}>
          <Text style={styles.buttonText}>
          LOGIN
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:20
  },
  buttonContainer: {
    backgroundColor: '#3F99ED',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '200',
    color: 'white',
  },
  input: {
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#ee7600'
  }
});
