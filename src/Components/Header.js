import React from 'react'
import {
  View,
  Text,
  Platform,
  StyleSheet,
  SafeAreaView
} from 'react-native'
import PropTypes from 'prop-types'

function Header ({ title, right, left, titleColor }) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.iconView}>
          {left}
        </View>
        <View style={styles.titleView}>
          <Text style={[styles.title, {color: titleColor  || 'white'}]}>{title}</Text>
        </View>
        <View style={styles.iconView}>
          {right}
        </View>
      </View>
    </SafeAreaView>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  right: PropTypes.element,
  left: PropTypes.element
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'android' ? 24 : 0,
  },
  iconView: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  titleView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Header
