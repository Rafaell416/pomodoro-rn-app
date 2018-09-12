import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

export default class Timer extends Component {
  constructor(props){
    super(props)
    this.state = {
      time: 25
    }
  }

  componentDidMount(){
    this._startCountDown()
  }

  _startCountDown = () => {
    setInterval(() => this.setState({time: this.state.time - 1}),1000)
  }

  render () {
    const { time } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.timerText}>{time}</Text>
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
