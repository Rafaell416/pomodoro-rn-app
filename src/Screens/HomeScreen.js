import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import Header from '../Components/Header'
import { Feather } from '@expo/vector-icons'

export default class HomeScreen extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <View style={styles.container}>
        <Header
          title="Pomodoro"
          left={ <Feather name="user" size={30} color="white"/> }
          right={ <Feather name="settings" size={30} color="white"/> }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e74c3c'
  }
})
