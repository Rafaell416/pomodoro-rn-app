import React, { Component } from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'
import TouchableIcon from '../Components/TouchableIcon'

export default class ResetButton extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableIcon
          name="refresh-cw"
          size={40}
          color="white"
          actionToExecuteWhenPress={() => console.log('RESET')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
