'use strict'

import React, { Component } from 'react'
import { Container,
  Content,
  List,
  ListItem,
  InputGroup,
  Input,
  Icon,
  Text,
  Picker,
  Button } from 'native-base'
import { AsyncStorage,
  AlertIOS,
  } from 'react-native'

const SearchPage = require('./SearchPage')
const Item = Picker.Item
const STORAGE_KEY = 'id_token'

export default class LoginPage extends Component {
  constructor(props) {
        super(props);
        this.state = {
          userNameString: 'example@zach.me',
          passwordString: '',
          isLoading: false,
          message: ''
        }
    }

    async _onValueChange(item, selectedValue) {
      try {
        await AsyncStorage.setItem(item, selectedValue);
        }
      catch (error) {
        console.log('AsyncStorage error: ' + error.message);
      }
    }
    onUsernameChange(event) {
      this.setState({ userNameString: event.nativeEvent.text })
    }
    onPasswordChange(event) {
      this.setState({passwordString: event.nativeEvent.text})
    }
    _onLoginPressed() {
      if(this.state.userNameString) {
        fetch("http://localhost:8080/sessions/create", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.state.userNameString,
            password: this.state.passwordString,
          })
        })
        .then((response) => response.json())
        .then((responseData) => {
          this._onValueChange(STORAGE_KEY, responseData.id_token)
        })
        .done()

        this.props.navigator.push({
          title: 'Search',
          component: SearchPage,
          //passProps:
        })
      }

    }
    render() {
        return (
            <Container style={{marginTop: 70}}>
                <Content>
                    <List>
                        <ListItem>
                            <InputGroup onChange={this.onUsernameChange.bind(this)}>
                                <Icon name="ios-person" style={{ color: '#0A69FE' }} />
                                <Input placeholder="EMAIL" />
                            </InputGroup>
                        </ListItem>
                        <ListItem>
                            <InputGroup onChange={this.onPasswordChange.bind(this)}>
                                <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />
                                <Input placeholder="PASSWORD" secureTextEntry />
                            </InputGroup>
                        </ListItem>
                    </List>
                    <Button style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }} onPress={this._onLoginPressed.bind(this)}>
                        Log In
                    </Button>
                </Content>
            </Container>
        );
    }
}
module.exports = LoginPage
