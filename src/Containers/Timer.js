import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

class CounterTimer extends Component {
  constructor(props){
    super(props)
    this.state = {
      duration: 25
    }
  }

  _startCountDown = () => {
    const { duration } = this.state
    const durationInSeconds = 60 * duration
    this._calculateTime(durationInSeconds)
  }

  _calculateTime = (duration) => {
    let timer = duration, minutes, seconds
    this._interval = setInterval(() => {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10)

      minutes = minutes < 10 ? "0" + minutes : minutes
      seconds = seconds < 10 ? "0" + seconds : seconds

      this.setState({
        min: minutes,
        sec: seconds
      })

      if (--timer < 0) {
        timer = duration
      }
    }, 1000)
  }

  _stop = () => {
    clearInterval(this._interval)
  }


  render () {
    const { min, sec } = this.props.timer
    return (
      <View style={styles.container}>
        <Text style={styles.timerText}>{min}:{sec}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  timer: state.timer
})

const mapDispatchToProps = {
  
}

const Timer = connect(mapStateToProps, mapDispatchToProps)(CounterTimer)
export default Timer

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: 250,
    borderRadius: 250/2,
    backgroundColor: 'transparent',
    borderColor: '#1abc9c',
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  timerText: {
    color: 'white',
    fontSize: 55,
    fontWeight: 'bold'
  }
})
