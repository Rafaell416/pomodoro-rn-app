import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { SecureStore } from 'expo'

import TouchableIcon from '../Components/TouchableIcon'

class PlayPause extends Component {
  constructor(props){
    super(props)
    this.state = {
      active: false
    }
  }

  _handlePlayAndPauseButton = async () => {
    const uid = await SecureStore.getItemAsync('uid')
    const { active } = this.state
    if (active) {
      this.setState({ active: !this.state.active })
      this.props.pauseTimerMutation({ variables: { uid } })
      .then(({ data }) => console.log(data))
      .catch(err => console.log(err))
    } else {
      this.setState({ active: !this.state.active })
      this.props.playTimerMutation({ variables: { uid } })
      .then(({ data }) => console.log(data))
      .catch(err => console.log(data))
    }
  }

  render () {
    const { active } = this.state
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

const PlayPauseButton = graphql(playTimer, { name: 'playTimerMutation' })(
  graphql(pauseTimer, { name: 'pauseTimerMutation' })(PlayPause)
)

export default PlayPauseButton
