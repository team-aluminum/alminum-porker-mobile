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
  Text,
  Linking,
  Alert,
} from 'react-native';
import BaseScreen from '../base';
import UrlParse from 'url-parse';
import { NavigationScreenProps } from "react-navigation";

class Home extends BaseScreen {
  constructor(props: NavigationScreenProps) {
    super(props);
    this.state = {
      userCode: '',
      hosting: false,
    };
  }

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
    const url = new UrlParse(event.url, true);

    if (!url.query.userCode) {
      Alert.alert('ゲームに参加', 'ユーザー情報の取得に失敗しました', [
        { text: 'OK' },
      ]);
      return;
    }

    this.setState({
      userCode: url.query.userCode,
      hosting: !!url.query.hosting,
    })
  };

  render(): ReactElement {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content"/>
        <SafeAreaView style={styles.SafeAreaView}>
          <Button title={'ゲームに参加する'} onPress={this.onPressGameEnter}/>
          <Button title={'トランプをスキャンする'} onPress={this.onPressCardScanner}/>
          <Text>UserCode: {this.state.userCode ? this.state.userCode : '未設定'}</Text>
          <Text>hosting: {this.state.hosting ? 'Yes' : 'No'}</Text>
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
