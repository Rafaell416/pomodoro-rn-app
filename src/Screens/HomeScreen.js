import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import Header from '../Components/Header'
import TouchableIcon from '../Components/TouchableIcon'

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
          left={
            <TouchableIcon
              name="user"
              size={30}
              color="white"
              actionToExecuteWhenPress={() => console.log('Pressed user icon')}
            />
          }
          right={
            <TouchableIcon
              name="settings"
              size={30}
              color="white"
              actionToExecuteWhenPress={() => console.log('Pressed settings icon')}
            />
          }
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
