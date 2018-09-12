import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import TouchableIcon from '../Components/TouchableIcon'

export default class PlayPauseButton extends Component {
  constructor(props){
    super(props)
    this.state = {
      play: true
    }
  }

  render () {
    const { play } = this.state
    return (
      <View style={styles.container}>
        {
          play
            ? <TouchableIcon
                name="play"
                size={60}
                color="white"
                actionToExecuteWhenPress={() => this.setState({ play: !this.state.play })}
              />
            : <TouchableIcon
                name="pause"
                size={60}
                color="white"
                actionToExecuteWhenPress={() => this.setState({ play: !this.state.play })}
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
