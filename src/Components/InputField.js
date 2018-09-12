import React from 'react'
import { TextInput } from 'react-native-paper'
import { Feather } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet
} from 'react-native'

function InputField ({ icon, value, onChangeText, label, type }) {
  const secure = type === 'password' ? true : false
  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        <Feather name={icon} size={40} color="#e74c3c"/>
      </View>
      <View style={styles.inputView}>
        <TextInput
          label={label}
          value={value}
          onChangeText={text => onChangeText(text)}
          underlineColor="#e74c3c"
          secureTextEntry={secure}
        />
      </View>
    </View>
  )
}

InputField.propTypes = {
  icon: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  label: PropTypes.string,
  type: PropTypes.string,
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '100%',
    height: 75,
  },
  iconView: {
    height: 75,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  inputView: {
    flex: 1,
    paddingRight: 10,
    paddingBottom: 10,
    paddingTop: 10
  }
})

export default InputField
