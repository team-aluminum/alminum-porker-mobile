/**
 * @format
 * @flow
 */

import React, { Fragment, ReactElement } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Button,
  StatusBar,
  Linking,
} from 'react-native';
import BaseScreen from '../base';

class Home extends BaseScreen {
  onPressGameEnter = () => {
    this.props.navigation.navigate('GameEnter');
  };
  onPressCardScanner = () => {
    this.props.navigation.navigate('CardScanner');
  };

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (event: {url: string}) => {
    console.log(event.url);
    const route = event.url.replace(/.*?:\/\//g, '');
    console.log(route);
  };

  render(): ReactElement {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView style={styles.SafeAreaView}>
          <Button title={'ゲームに参加する'} onPress={this.onPressGameEnter}/>
          <Button title={'トランプをスキャンする'} onPress={this.onPressCardScanner}/>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  SafeAreaView: {
    paddingTop: 80,
  },
});

export default Home;
