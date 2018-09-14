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
      active: false
    }
  }

  _handlePlayAndPauseButton = () => {
    this.setState({active: !this.state.active})
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
