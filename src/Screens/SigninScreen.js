import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

export default class SigninScreen extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <View style={styles.container}></View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1abc9c'
  }
})
