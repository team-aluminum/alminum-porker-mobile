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
} from 'react-native';
import BaseScreen from '../base';

class Home extends BaseScreen {
  onPressGameEnter = () => {
    this.props.navigation.navigate('GameEnter');
  };
  onPressCardScanner = () => {
    this.props.navigation.navigate('CardScanner');
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
