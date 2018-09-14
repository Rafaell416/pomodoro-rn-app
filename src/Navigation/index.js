import React from 'react'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation'
import HomeScreen from '../Screens/HomeScreen'
import SigninScreen from '../Screens/SigninScreen'
import SignupScreen from '../Screens/SignupScreen'
import AuthLoadingScreen from '../Screens/AuthLoadingScreen'

const AppStack = createStackNavigator({
  HomeScreen: { screen: HomeScreen }
}, {
  navigationOptions: { header: null }
})

const AuthenticationStack = createStackNavigator({
  SigninScreen: { screen: SigninScreen },
  SignupScreen: { screen: SignupScreen },
}, {
  initialRouteName: 'SigninScreen' ,
  navigationOptions: { header: null }
})

export default createSwitchNavigator(
  {
    AuthLoadingScreen: AuthLoadingScreen,
    AppStack: AppStack,
    AuthenticationStack: AuthenticationStack
  },{
    initialRouteName: 'AuthLoadingScreen'
  }
)
