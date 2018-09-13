import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import TouchableIcon from '../Components/TouchableIcon'
import { connect } from 'react-redux'
import { handlePlayAndPauseTimer } from '../Actions'

class PlayPause extends Component {
  constructor(props){
    super(props)
  }

  _handlePlayAndPauseButton = () => {
    const { handlePlayAndPauseTimer } = this.props
    const { active } = this.props.timer

    handlePlayAndPauseTimer(!active)
  }

  render () {
    const { active } = this.props.timer
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

const mapStateToProps = (state) => ({
  timer: state.timer
})

const mapDispatchToProps = {
  handlePlayAndPauseTimer
}

const PlayPauseButton = connect(mapStateToProps, mapDispatchToProps)(PlayPause)
export default PlayPauseButton

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
