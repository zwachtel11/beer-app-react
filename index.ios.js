'use strict'
const React = require('react')
const ReactNative = require('react-native')
const LoginPage = require('./LoginPage')

import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'

const Client = () => {
  const networkInterface = createNetworkInterface({
    uri: 'http://localhost:8080/graphql'
  })
  const client = new ApolloClient({
    networkInterface
  })
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>)
}

const styles = ReactNative.StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
})

export default class growler extends React.Component {
  render() {
    return (
      <ReactNative.NavigatorIOS
      style={styles.container}
      initialRoute={{
        component: LoginPage,
        title: 'growler',
        }}
      />
    )
  }
}

ReactNative.AppRegistry.registerComponent('growler', () => growler)
