import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { graphql, compose, Subscription } from 'react-apollo'
import gql from 'graphql-tag'
import { Snackbar } from 'react-native-paper'
import { SecureStore } from 'expo'

const timerCounterUpdated = gql`
  subscription timerUpdated {
    timerCounterUpdated {
      uid
      active
      duration
      minutes
      seconds
    }
  }
`

class TimerContainer extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount () {
    this._getTimerData()
  }

  componentDidMount () {
    this.props.getTimerFromLocalCache.subscribeToMore({
      document: timerCounterUpdated,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev

        const { minutes, seconds, uid } = subscriptionData.data.timerCounterUpdated
        this.props.updateCounter({ variables: { uid, minutes, seconds } })
      }
    })
  }

  _getTimerData = async () => {
    const uid = await SecureStore.getItemAsync('uid')
    const { data: { timerGet } } = await this.props.getTimerFromRemoteSource({ variables: { uid }})
    await this.props.saveTimerInLocalCache({ variables: { timer: timerGet } })
  }


  render () {
    const { minutes, seconds } = this.props.getTimerFromLocalCache.timer
    return (
      <Subscription
        subscription={timerCounterUpdated}
      >
        {() => (
          <View style={styles.container}>
            <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
          </View>
        )}
      </Subscription>
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
  mutation updateCounter ( $minutes: Float!, $seconds: Float!) {
    timerUpdateCounter( minutes:$minutes, seconds:$seconds) @client
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
