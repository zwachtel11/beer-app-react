'use strict'

import React, { Component } from 'react'
import {StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ListView,
  ActivityIndicator,
  Image
} from 'react-native'

const BeerView = require('./BeerView')

var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
})


class SearchResults extends Component {

  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid})
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.data)
    }
  }

  rowPressed(beerData) {
    var beer = beerData

    console.log(beer)

    this.props.navigator.push({
      title: 'Beer',
      component: BeerView,
      passProps: {beer: beer}
    })

  }

  renderRow(rowData, sectionID, rowID) {
    var image = 'https://pbs.twimg.com/profile_images/425274582581264384/X3QXBN8C.jpeg'

    if (rowData.images)
       image = rowData.images.icon
  //  console.log(image)
    return (
        <TouchableHighlight onPress={() => this.rowPressed(rowData)}
            underlayColor='#dddddd'>
          <View>
            <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: image }} />
              <View  style={styles.textContainer}>
                <Text style={styles.price}>{rowData.name}</Text>
                <Text style={styles.title}
                      numberOfLines={1}>{rowData.description}</Text>
              </View>
            </View>
            <View style={styles.separator}/>
          </View>
        </TouchableHighlight>
      )
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    )
  }

}

module.exports = SearchResults
