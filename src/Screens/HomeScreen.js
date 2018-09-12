import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import Header from '../Components/Header'
import TouchableIcon from '../Components/TouchableIcon'
import Timer from '../Containers/Timer'
import PlayPauseButton from '../Containers/PlayPauseButton'
import ResetButton from '../Containers/ResetButton'

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
        <View style={[styles.flexView, styles.timerView]}>
          <Timer />
        </View>
        <View style={[styles.flexView, styles.controlsView]}>
          <View style={[styles.flexView, styles.playPauseButtonView]}>
            <PlayPauseButton />
          </View>
          <View style={[styles.flexView, styles.resetButtonView]}>
            <ResetButton />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e74c3c'
  },
  flexView: {
    flex: 1,
  },
  timerView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  playPauseButtonView: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  resetButtonView: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    padding: 20
  }
})
