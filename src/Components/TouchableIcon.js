import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import PropTypes from 'prop-types'

function TouchableIcon ({ name, size, color, actionToExecuteWhenPress }) {
  return (
    <TouchableOpacity onPress={() => actionToExecuteWhenPress()}>
      <Feather name={name} size={size} color={color}/>
    </TouchableOpacity>
  )
}

TouchableIcon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  actionToExecuteWhenPress: PropTypes.func
}

export default TouchableIcon
