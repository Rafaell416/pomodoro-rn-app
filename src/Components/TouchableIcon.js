import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import PropTypes from 'prop-types'

function TouchableIcon ({ name, size, color, actionToExecuteWhenPress, disabled }) {
  return (
    <TouchableOpacity disabled={disabled} onPress={() => actionToExecuteWhenPress()}>
      <Feather name={name} size={size} color={color}/>
    </TouchableOpacity>
  )
}

TouchableIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  actionToExecuteWhenPress: PropTypes.func
}

export default TouchableIcon
