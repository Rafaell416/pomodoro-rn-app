import React from 'react'
import {
  View,
  Text,
  Platform,
  StyleSheet,
  SafeAreaView
} from 'react-native'

function Header ({ title, right, left }) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.iconView}>
          {left}
        </View>
        <View style={styles.titleView}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.iconView}>
          {right}
        </View>
      </View>
    </SafeAreaView>
  )
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
    color: 'white',
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