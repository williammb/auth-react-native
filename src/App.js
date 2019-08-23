import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common/';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBboi9_t3SRS88jn4EJlXrYnJQV8efNxoc',
      authDomain: 'auth-e00f1.firebaseapp.com',
      databaseURL: 'https://auth-e00f1.firebaseio.com',
      projectId: 'auth-e00f1',
      storageBucket: 'auth-e00f1.appspot.com',
      messagingSenderId: '112482595077'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
      return (
        <CardSection>
          <Button onPress={() => firebase.auth().signOut()}>
            Sair
          </Button>
        </CardSection>
      );
      case false:
        return <LoginForm />;
      default:
        return (
          <CardSection>
            <Spinner size="large" />
          </CardSection>
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Autenticação" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
