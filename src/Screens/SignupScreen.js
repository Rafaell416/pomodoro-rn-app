import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native'
const { width } = Dimensions.get('window')
import InputField from '../Components/InputField'
import ActionButton from '../Components/ActionButton'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Snackbar } from 'react-native-paper'

class SignupScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      snackBarVisible: false,
      snackBarMessage: ''
    }
  }

  _signup = async () => {
    const { username, email, password } = this.state
    const check = username && email && password
    if (!check) this.setState({ snackBarVisible: true, snackBarMessage: 'Please fill all inputs :)' })

    this.props.mutate({variables: { username, email, password }})
    .then(({ data })=> console.log('GOT DATA', data))
    .catch(err => console.log('GOT AN ERROR', err))
  }

  render () {
    const { username, email, password, snackBarVisible, snackBarMessage } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Image source={require('../../assets/app.png')} style={styles.logoImage} fadeDuration={0}/>
        </View>
        <InputField
          icon="user"
          placeholder="username"
          value={username}
          onChangeText={ username => this.setState({ username }) }
        />
        <InputField
          icon="mail"
          placeholder="email"
          value={email}
          onChangeText={ email => this.setState({ email }) }
        />
        <InputField
          icon="lock"
          placeholder="password"
          value={password}
          onChangeText={ password => this.setState({ password }) }
          type="password"
        />
        <ActionButton
          text="SIGN UP"
          textColor="white"
          buttonColor="#e74c3c"
          actionToExecuteWhenPress={() => this._signup()}
        />
        <View style={styles.bottomTextView}>
          <Text style={styles.signupText} onPress={()=>this.props.navigation.navigate('SigninScreen')}>
            Already have an account? <Text style={styles.signup}>Log In</Text>
          </Text>
        </View>
        <Snackbar
         visible={snackBarVisible}
         onDismiss={() => this.setState({ snackBarVisible: false })}
         duration={1000}
        >
         {snackBarMessage}
       </Snackbar>
      </View>
    )
  }
}

const signup = gql`
  mutation signup ($username: String!, $email: String!, $password: String!) {
    signup (user: {
      username: $username,
      email: $email,
      password: $password
    }){
      _id
      email
      username
    }
  }
`

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  topSection: {
    backgroundColor: 'white',
    width: width,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoImage: {
    height: 150,
    width: 150
  },
  bottomTextView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  signup: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#95a5a6'
  },
  signupText: {
    color: '#95a5a6',
    fontSize: 15,
  }
})

export default graphql(signup)(SignupScreen)
