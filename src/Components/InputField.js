import React from 'react'
import { Feather } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import TextInput from 'react-native-spotlight-input'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

function InputField ({ icon, value, onChangeText, placeholder, type }) {
  const secure = type === 'password' ? true : false
  return (
    <View style={styles.container}>
      <View style={styles.iconView}>
        <Feather name={icon} size={40} color="#e74c3c"/>
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={text => onChangeText(text)}
          underlineColorAndroid="transparent"
          secureTextEntry={secure}
          overlayColor="#e74c3c"
          style={styles.input}
          animationConfig={{
            duration:350,
            delay: 100,
          }}
        />
      </View>
    </View>
  )
}

InputField.propTypes = {
  icon: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
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
    paddingRight: 15,
    paddingBottom: 10,
    paddingTop: 10
  },
  input: {
    backgroundColor: '#ecf0f1',
    flex: 1,
    borderRadius: 8,
    padding: 5
  }
})

export default InputField
