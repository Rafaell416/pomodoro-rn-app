import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'

function ActionButton ({ text, textColor, buttonColor, actionToExecuteWhenPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, {backgroundColor: buttonColor}]}
        onPress={() => actionToExecuteWhenPress()}
      >
        <Text style={[styles.text, {color: textColor}]}>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

ActionButton.propTypes = {
  text: PropTypes.string,
  textColor: PropTypes.string,
  buttonColor: PropTypes.string,
  actionToExecuteWhenPress: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 90,
    backgroundColor: 'transparent',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20
  },
  button: {
    flex: 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default ActionButton
