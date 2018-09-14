import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native'
const { width } = Dimensions.get('window')
import InputField from '../Components/InputField'
import ActionButton from '../Components/ActionButton'
import { Snackbar } from 'react-native-paper'

export default class SigninScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      snackBarVisible: false,
      snackBarMessage: ''
    }
  }

  _signin = () => {
    const { username, password } = this.state
    const check = username && password
    if (!check) this.setState({snackBarVisible: true, snackBarMessage: 'Please fill all inputs :)'})
  }


  render () {
    const { username, password, snackBarVisible, snackBarMessage } = this.state
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
        <ActionButton
          text="LOG IN"
          textColor="white"
          buttonColor="#e74c3c"
          actionToExecuteWhenPress={() => this._signin()}
        />
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
