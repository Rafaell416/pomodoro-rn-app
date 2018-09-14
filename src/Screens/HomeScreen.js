import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Header from '../Components/Header'
import Timer from '../Containers/Timer'
import PlayPauseButton from '../Containers/PlayPauseButton'
import TouchableIcon from '../Components/TouchableIcon'
import { Snackbar } from 'react-native-paper'


export default class HomeScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      snackBarMessage: '',
      snackBarVisible: false
    }
  }

  componentDidMount () {
    const showWelcomeAlert = this.props.navigation.state.params.showWelcomeAlert || null
    if (showWelcomeAlert) this.setState({ snackBarVisible: true, snackBarMessage: 'Welcome to pomodoro, we hope you to be productive :)' })
  }

  render () {
    const { snackBarMessage, snackBarVisible } = this.state
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
            <TouchableOpacity
              onPress={() => null} //setIntervalType({type: 'work', duration: 25})
              style={[styles.flexView, styles.alignCenterView]}>
              <TouchableIcon
                name="cpu"
                size={40}
                color="white"
                disabled
              />
              <Text style={styles.text}>Work</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => null} //setIntervalType({type: 'short_break', duration: 5})
              style={[styles.flexView, styles.alignCenterView]}>
              <TouchableIcon
                name="battery-charging"
                size={40}
                color="white"
                disabled
              />
              <Text style={styles.text}>Short Break</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => null} //setIntervalType({type: 'long_break', duration: 15})
              style={[styles.flexView, styles.alignCenterView]}>
              <TouchableIcon
                name="clock"
                size={40}
                color="white"
                disabled
              />
              <Text style={styles.text}>Long Break</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => null}
              style={[styles.flexView, styles.alignCenterView]}>
              <TouchableIcon
                name="refresh-cw"
                size={40}
                color="white"
                disabled
              />
              <Text style={styles.text}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Snackbar
         visible={snackBarVisible}
         onDismiss={() => this.setState({ snackBarVisible: false })}
         duration={2000}
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
