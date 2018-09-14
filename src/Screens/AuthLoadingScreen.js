import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native'
import { SecureStore } from 'expo'

export default class AuthLoadingScreen extends Component {
  constructor(props){
    super(props)
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    const token = await SecureStore.getItemAsync('access-token')
    console.log(token)
    this.props.navigation.navigate(token ? 'AppStack' : 'AuthenticationStack')
  }

  render () {
    return <View>

    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
})
