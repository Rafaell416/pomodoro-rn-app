import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import { SecureStore } from 'expo'
const { width } = Dimensions.get('window')
import InputField from '../Components/InputField'
import ActionButton from '../Components/ActionButton'
import { Snackbar } from 'react-native-paper'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class SigninScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      snackBarVisible: false,
      snackBarMessage: '',
      loading: false
    }
  }

  _signin = () => {
    const { username, password } = this.state
    const check = username && password
    if (!check)  {
      this.setState({snackBarVisible: true, snackBarMessage: 'Please fill all inputs :)'})
    } else {
      this.setState({loading: true})
      this.props.mutate({ variables: { username, password }})
      .then(async ({ data })=> {
        this.setState({loading: false})
        await SecureStore.setItemAsync('access-token', data.login.jwt)
        await SecureStore.setItemAsync('uid', data.login._id)
        this.props.navigation.navigate('HomeScreen', {showWelcomeAlert: false})
      })
      .catch(err => {
        console.log('GOT AN ERROR', err)
        this.setState({loading: false, snackBarMessage: 'There was an error, try again :(', snackBarVisible: true})
      })
    }
  }


  render () {
    const { username, password, snackBarVisible, snackBarMessage, loading } = this.state
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
          icon="lock"
          placeholder="password"
          value={password}
          onChangeText={ password => this.setState({ password }) }
          type="password"
        />
        {
          loading ? <ActivityIndicator size='large' color='#e74c3c'/>
          : <ActionButton
            text="LOG IN"
            textColor="white"
            buttonColor="#e74c3c"
            actionToExecuteWhenPress={() => this._signin()}
          />
        }
        <View style={styles.bottomTextView}>
          <Text style={styles.signupText} onPress={()=>this.props.navigation.navigate('SignupScreen')}>
            Don't have an account? <Text style={styles.signup}>Sign Up</Text>
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


const login = gql`
  mutation login ($username: String!, $password: String!) {
    login (username: $username, password: $password) {
      username
      _id
      jwt
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
    height: 300,
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

export default graphql(login)(SigninScreen)
