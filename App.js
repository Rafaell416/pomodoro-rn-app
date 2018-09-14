import React, { Component } from 'react'
import AppNavigation from './src/Navigation'
import { Image } from 'react-native'
import {
  Asset,
  AppLoading,
  SecureStore
} from 'expo'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({uri: 'http://192.168.56.1:3000/graphql'})

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

  async componentWillMount(){
    await SecureStore.deleteItemAsync('access-token')
    console.disableYellowBox = true
  }

  _loadAssetsAsync = async () => {
    const images = await _cacheImages([
      require('./assets/app.png'),
      require('./assets/icon.png')
    ])
  }


  render() {
    const { isReady } = this.state
    if ( isReady )
      return (
        <ApolloProvider client={client}>
          <AppNavigation />
        </ApolloProvider>
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
