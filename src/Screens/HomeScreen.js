import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import Header from '../Components/Header'
import Timer from '../Containers/Timer'
import PlayPauseButton from '../Containers/PlayPauseButton'
import TouchableIcon from '../Components/TouchableIcon'

export default class HomeScreen extends Component {
  constructor(props){
    super(props)
  }

  render () {
    return (
      <View style={styles.container}>
        <Header title="Pomodoro" />
        <View style={[styles.flexView, styles.alignCenterView]}>
          <Timer />
        </View>
        <View style={[styles.flexView, styles.controlsView]}>
          <View style={[styles.flexView, styles.playPauseButtonView]}>
            <PlayPauseButton />
          </View>
          <View style={[styles.flexView, styles.modesButtonsView]}>
            <View style={[styles.flexView, styles.alignCenterView]}>
              <TouchableIcon
                name="cpu"
                size={40}
                color="white"
                actionToExecuteWhenPress={() => console.log('RESET')}
              />
              <Text style={styles.text}>Work</Text>
            </View>
            <View style={[styles.flexView, styles.alignCenterView]}>
              <TouchableIcon
                name="battery-charging"
                size={40}
                color="white"
                actionToExecuteWhenPress={() => console.log('RESET')}
              />
              <Text style={styles.text}>Short Break</Text>
            </View>
            <View style={[styles.flexView, styles.alignCenterView]}>
              <TouchableIcon
                name="clock"
                size={40}
                color="white"
                actionToExecuteWhenPress={() => console.log('RESET')}
              />
              <Text style={styles.text}>Long Break</Text>
            </View>
            <View style={[styles.flexView, styles.alignCenterView]}>
              <TouchableIcon
                name="refresh-cw"
                size={40}
                color="white"
                actionToExecuteWhenPress={() => console.log('RESET')}
              />
              <Text style={styles.text}>Reset</Text>
            </View>
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
  alignCenterView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  playPauseButtonView: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modesButtonsView: {
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8
  }
})
