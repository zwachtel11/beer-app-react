'use strict'

import React, { Component } from 'react'
import {StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Image
} from 'react-native'

const SearchResults = require('./SearchResults')
// put in config
const apiKey = '&key=2a7fa7da8acd3a6d9dfc28db8b57714b'
const url = 'https://api.brewerydb.com/v2'
const search = '/search?q='
const searchGeo = '/search/geo/point?'

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'stretch'
},
buttonText: {
  fontSize: 18,
  color: 'white',
  alignSelf: 'center'
},
button: {
  height: 36,
  flex: 1,
  flexDirection: 'row',
  backgroundColor: '#48BBEC',
  borderColor: '#48BBEC',
  borderWidth: 1,
  borderRadius: 8,
  marginBottom: 10,
  alignSelf: 'stretch',
  justifyContent: 'center'
},
searchInput: {
  height: 36,
  padding: 4,
  marginRight: 5,
  flex: 4,
  fontSize: 18,
  borderWidth: 1,
  borderColor: '#48BBEC',
  borderRadius: 8,
  color: '#48BBEC'
},
image: {
  width: 217,
  height: 138
}
})

const urlForQueryAndPage = function(key, value, pageNumber) {
    return url + search + value + apiKey
}
const urlForQueryAndPageGeo = function(key, value, pageNumber) {
    return url + searchGeo + value + apiKey
}

class SearchPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchString: 'Spotted',
      isLoading: false,
      message: ''
    }
  }

  onLocationPressed() {
    navigator.geolocation.getCurrentPosition(
      location => {
        var search =  'lat=' + location.coords.latitude + '&lng=-' + location.coords.longitude
        this.setState({ searchString: search })
        var query = urlForQueryAndPageGeo('centre_point', search, 1)
        this._executeQuery(query)
      },
      error => {
        this.setState({
          message: 'There was a problem with obtaining your location: ' + error
        })
      })
}

  onSearchTextChanged(event) {
    console.log('onSearchTextChanged')
    this.setState({ searchString: event.nativeEvent.text })
    console.log(this.state.searchString)
  }

  _executeQuery(query) {
    console.log(query)
    this.setState({ isLoading: true })

    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json))
      .catch(error =>
        this.setState({
        isLoading: false,
        message: 'Something bad happened ' + error
      }))
  }

  _handleResponse(response) {
      console.log(response.status)
      this.setState({ isLoading: false , message: '' })
      if (response.status === 'success') {
        this.props.navigator.push({
          title: 'Results',
          component: SearchResults,
          passProps: {data: response.data}
        })
      } else {

      }
    }

  onSearchPressed() {
    var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  }

  render() {
    var spinner = this.state.isLoading ?
        ( <ActivityIndicator
            size='large'/> ) :
        ( <View/>)
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Search for beers to drink!
        </Text>
        <Text style={styles.description}>
          Search by brewery, type or search near your location.
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this.onSearchTextChanged.bind(this)}
            placeholder='Search via name or brewery'/>
        <TouchableHighlight style={styles.button}
            onPress={this.onSearchPressed.bind(this)}
            underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Go</Text>
        </TouchableHighlight>
      </View>
      <TouchableHighlight style={styles.button}
          onPress={this.onLocationPressed.bind(this)}
          underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Location</Text>
      </TouchableHighlight>
      <Image source={require('./Resources/beer.jpg')} style={styles.image}/>
      {spinner}
      <Text style={styles.description}>{this.state.message}</Text>
      </View>
    )
  }
}
module.exports = SearchPage
