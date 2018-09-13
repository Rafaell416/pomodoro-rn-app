import React, { Component } from 'react'
import AppNavigation from './src/Navigation'
import { Image } from 'react-native'
import {
  Asset,
  AppLoading
} from 'expo'
import {
  applyMiddleware,
  createStore
} from 'redux'
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import reducer from './src/Reducers'

function _cacheImages (images) {
  return images.map(image => {
    if (typeof image === 'string') return Image.prefetch(image)

    return Asset.fromModule(image).downloadAsync()
  })
}

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = { isReady: false }
  }

  componentWillMount(){
    console.disableYellowBox = true
  }

  _loadAssetsAsync = async () => {
    const images = await _cacheImages([
      require('./assets/app.png'),
      require('./assets/icon.png')
    ])
  }


  render() {
    const store = createStore(reducer, applyMiddleware(logger))
    const { isReady } = this.state
    if ( isReady )
      return (
        <Provider store={store}>
          <AppNavigation />
        </Provider>
      )

    return (
      <AppLoading
        startAsync={this._loadAssetsAsync}
        onFinish={()=>this.setState({ isReady: true })}
        onError={(err)=>console.warn(err)}
      />
    )
  }
}
