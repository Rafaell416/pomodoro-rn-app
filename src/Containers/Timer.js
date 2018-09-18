import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Snackbar } from 'react-native-paper'
import { SecureStore } from 'expo'

class TimerContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      minutes: '00',
      seconds: '00'
    }
  }

  componentWillMount () {
    this._getTimerData()
  }

  _getTimerData = async () => {
    const uid = await SecureStore.getItemAsync('uid')
    const { data: { timerGet } } = await this.props.getTimerFromRemoteSource({ variables: { uid }})
    const { data: { saveTimer: { timer } } } = await this.props.saveTimerInLocalCache({ variables: { timer: timerGet } })
    { timer.active ? this._startCountDown(timer.duration, uid) : null }
  }

  _startCountDown = (duration, uid) => {
    console.log('countdown started...')
    const durationInSeconds = 60 * duration
    this._calculateTime(durationInSeconds, uid)
  }

  _calculateTime = (duration, uid) => {
    console.log('calculating...')
    let timer = duration, minutes, seconds
    this._interval = setInterval(() => {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10)

      minutes = minutes < 10 ? "0" + minutes : minutes
      seconds = seconds < 10 ? "0" + seconds : seconds

      this.setState({
        minutes,
        seconds
      })

      console.log(minutes, seconds)

      this.props.updateCounter({ variables: { uid, minutes, seconds } })

      if (--timer < 0) {
        timer = duration
      }
    }, 1000)
  }

  _stop = () => {
    clearInterval(this._interval)
  }


  render () {
    const { minutes, seconds } = this.props.getTimerFromLocalCache.timer
    //const { minutes, seconds } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
      </View>
    )
  }
}

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

const getTimerFromRemoteSource = gql`
  mutation getTimer ($uid: String! ) {
    timerGet(uid: $uid) {
      uid
      active
      duration
      minutes
      seconds
      type
    }
  }
`

const saveTimerInLocalCache = gql`
  mutation saveTimer ($timer: Timer!){
    saveTimer(timer: $timer) @client
  }
`

const updateCounter = gql`
  mutation updateCounter ($uid: String!, $minutes: Float!, $seconds: Float!) {
    timerUpdateCounter(uid:$uid, minutes:$minutes, seconds:$seconds) {
      minutes
      seconds
    }
  }
`

const getTimerFromLocalCache = gql`
  query getTimerFromCache {
    timer @client {
      type
      duration
      minutes
      seconds
      active
    }
  }
`

const Timer = compose (
  graphql(getTimerFromRemoteSource, { name: 'getTimerFromRemoteSource' }),
  graphql(saveTimerInLocalCache, { name: 'saveTimerInLocalCache' }),
  graphql(getTimerFromLocalCache, { name: 'getTimerFromLocalCache' }),
  graphql(updateCounter, { name: 'updateCounter' })
)(TimerContainer)

export default Timer
