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

export default class SignupScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: '',
      email: '',
      password: ''
    }
  }

  render () {
    const { user, email, password } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Image source={require('../../assets/app.png')} style={styles.logoImage} fadeDuration={0}/>
        </View>
        <InputField
          icon="user"
          label="user"
          value={user}
          onChangeText={ user => this.setState({ user }) }
        />
        <InputField
          icon="mail"
          label="email"
          value={email}
          onChangeText={ email => this.setState({ email }) }
        />
        <InputField
          icon="lock"
          label="password"
          value={password}
          onChangeText={ password => this.setState({ password }) }
          type="password"
        />
        <ActionButton
          text="SIGN UP"
          textColor="white"
          buttonColor="#e74c3c"
          actionToExecuteWhenPress={() => console.log('hello cosomos i was pressed!')}
        />
        <View style={styles.bottomTextView}>
          <Text style={styles.signupText} onPress={()=>this.props.navigation.navigate('SigninScreen')}>
            Already have an account? <Text style={styles.signup}>Log In</Text>
          </Text>
        </View>
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
