import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'


function ActionButton ({ text, buttonColor, actionToExecuteWhenPress }) {
  return (
    <View style={styles.container}>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue'
  }
})

export default ActionButton
