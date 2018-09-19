import React, { Component } from 'react'
import { Image } from 'react-native'
import {
  Asset,
  AppLoading,
  SecureStore
} from 'expo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { ApolloLink, split } from 'apollo-link'
import { withClientState } from 'apollo-link-state'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import { defaults, resolvers } from './src/Resolvers'
import AppNavigation from './src/Navigation'

const httpLink = createHttpLink({ uri: 'https://pomodoro-backend-yownypqxqx.now.sh/graphql' })

const wsLink = new WebSocketLink({
  uri: `ws://pomodoro-backend-yownypqxqx.now.sh/graphql`,
  options: {
    reconnect: true
  }
})

const authLink = setContext( async (_, { headers }) => {
  const token = await SecureStore.getItemAsync('access-token')
  console.log(token)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
)

const cache = new InMemoryCache()

const stateLink = withClientState({ cache, defaults, resolvers })

const link = ApolloLink.from([stateLink, terminatingLink])

const client = new ApolloClient({
  link,
  cache
})

function _cacheImages (images) {
  return images.map(image => {
    if (typeof image === 'string') return Image.prefetch(image)

    return Asset.fromModule(image).downloadAsync()
  })
}

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      isReady: false,
    }
  }


  async componentWillMount () {
    // await SecureStore.deleteItemAsync('uid')
    // await SecureStore.deleteItemAsync('access-token')
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
