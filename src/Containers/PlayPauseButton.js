import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { SecureStore } from 'expo'

import TouchableIcon from '../Components/TouchableIcon'

class PlayPause extends Component {
  constructor(props){
    super(props)
  }

  _handlePlayAndPauseButton = async () => {
    const uid = await SecureStore.getItemAsync('uid')
    const { active } = this.props.getTimerFromLocalCache.timer
    if (active) {
      this.props.pauseTimerMutation({ variables: { uid } })
      .then(({ data }) => this.props.pauseLocalTimer({ variables: { active: data.timerPause.active } }))
      .catch(err => console.log(err))
    } else {
      this.props.playTimerMutation({ variables: { uid } })
      .then(({ data }) => this.props.playLocalTimer({ variables: { active: data.timerPlay.active } }))
      .catch(err => console.log(err))
    }
  }

  render () {
    const { active } = this.props.getTimerFromLocalCache.timer
    return (
      <View style={styles.container}>
        {
          active
            ? <TouchableIcon
                name="pause"
                size={60}
                color="white"
                actionToExecuteWhenPress={() => this._handlePlayAndPauseButton()}
              />
            : <TouchableIcon
                name="play"
                size={60}
                color="white"
                actionToExecuteWhenPress={() => this._handlePlayAndPauseButton()}
              />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10
  }
})

const playTimer = gql`
  mutation playTimer ($uid: String!) {
    timerPlay (uid: $uid){
      type
      active
      duration
      minutes
      seconds
    }
  }
`

const pauseTimer = gql`
  mutation pauseTimer ($uid: String!) {
    timerPause (uid: $uid){
      type
      active
      duration
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

const playLocalTimer = gql`
  mutation playTimer ($active: Boolean!) {
    timerPlay (active: $active) @client
  }
`

const pauseLocalTimer = gql`
  mutation pauseTimer ($active: Boolean!){
    timerPause (active: $active) @client
  }
`

const PlayPauseButton = compose(
  graphql(playTimer, { name: 'playTimerMutation' }),
  graphql(pauseTimer, { name: 'pauseTimerMutation' }),
  graphql(getTimerFromLocalCache, { name: 'getTimerFromLocalCache' }),
  graphql(playLocalTimer, { name: 'playLocalTimer' }),
  graphql(pauseLocalTimer, { name: 'pauseLocalTimer' })
)(PlayPause)

export default PlayPauseButton
