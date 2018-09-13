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
import { connect } from 'react-redux'
import { setIntervalType, resetTimer } from '../Actions'

class Home extends Component {
  constructor(props){
    super(props)
  }

  render () {
    const { setIntervalType, resetTimer } = this.props
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
              onPress={() => setIntervalType({type: 'work', duration: 25})}
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
              onPress={() => setIntervalType({type: 'short_break', duration: 5})}
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
              onPress={() => setIntervalType({type: 'long_break', duration: 15})}
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
              onPress={() => resetTimer({
                min: '00',
                sec: '00',
                active: false,
                interval: {
                  type: null,
                  duration: 0
                }
              })}
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
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  timer: state.timer
})

const mapDispatchToProps = {
  setIntervalType,
  resetTimer
}

const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(Home)
export default HomeScreen

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
