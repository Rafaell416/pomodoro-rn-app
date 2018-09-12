import React from 'react'
import { createStackNavigator } from 'react-navigation'
import HomeScreen from '../Screens/HomeScreen'
import SigninScreen from '../Screens/SigninScreen'
import SignupScreen from '../Screens/SignupScreen'

export default createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  SigninScreen: { screen: SigninScreen },
  SignupScreen: { screen: SignupScreen },
}, {
  initialRouteName: 'HomeScreen' ,
  navigationOptions: { header: null }
})
