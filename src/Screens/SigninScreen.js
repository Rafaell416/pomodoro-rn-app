import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native'
const { width } = Dimensions.get('window')
import InputField from '../Components/InputField'
import ActionButton from '../Components/ActionButton'

export default class SigninScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: '',
      password: ''
    }
  }

  render () {
    const { user, password } = this.state
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
          icon="lock"
          label="password"
          value={password}
          onChangeText={ password => this.setState({ password }) }
          type="password"
        />
        <ActionButton
          
        />
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
  }
})
