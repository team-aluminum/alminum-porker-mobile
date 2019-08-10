/**
 * @format
 * @flow
 */

import React, { Fragment, ReactElement } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Linking,
  Alert,
  ImageBackground,
  Image,
  View,
} from 'react-native';
import BaseScreen from '../base';
import UrlParse from 'url-parse';
import { NavigationScreenProps } from "react-navigation";
import { FlatButton } from '../../../util/ui/component/FlatButton';
import GameApi from "../../../infrastructure/network/GameApi";

class Home extends BaseScreen {

  constructor(props: NavigationScreenProps) {
    super(props);
    this.state = {
      userCode: '',
      hosting: false,
      isQrReady: false,
      playStatus: '',
    };
  }

  // start \ start_waiting
  status = 'start';

  onPressGameEnter = (): void => {
    if (!this.state.userCode) {
      Alert.alert('JOIN GAME', 'カメラからQRリンクを起動してください', [
        {text: 'OK'},
      ]);
      return;
    }

    this.props.navigation.navigate('CardScanOnly', {
      userCode: this.state.userCode,
    });
  };

  componentDidMount(): void {
    Linking.addEventListener('url', this.handleOpenURL);
  }

  componentWillUnmount(): void {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL = (event: { url: string }): void => {
    console.log(event.url);
    const url = new UrlParse(event.url, true);

    if (!url.query.userCode) {
      Alert.alert('ゲームに参加', 'ユーザー情報の取得に失敗しました', [
        {text: 'OK'},
      ]);
      return;
    }

    this.setState({
      userCode: url.query.userCode,
      hosting: !!url.query.hosting,
    });

    if (this.state.hosting) {
      this.status = 'read_card';
      this.setState({
        playStatus: 'waiting',
      });
      return;
    }

    const api = new GameApi(this.state.userCode);
    api.sendMobileUser().catch((err) => {
      if (err.response.status === 409) {
        return;
      }
      Alert.alert('ゲームに参加', 'ユーザー情報の送信に失敗しました', [
        {text: 'OK'},
      ]);
    });
  };

  render(): ReactElement {
    console.log('user: ', this.state.userCode);
    return (
      <Fragment>
        <StatusBar barStyle="dark-content"/>
        <ImageBackground source={require('../../../assets/images/background.png')} style={styles.ImageBackground}>
          <SafeAreaView style={styles.SafeAreaView}>
            <View style={styles.LogoView}>
              <Image style={styles.LogoImage} source={require('../../../assets/images/logo.png')}/>
            </View>
            <View style={styles.MenuView}>
              <FlatButton text={'READ CARD'} onPress={this.onPressGameEnter}/>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
  },
  ImageBackground: {
    width: '100%',
    height: '100%',
  },
  LogoView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 80,
  },
  LogoImage: {
    width: 192,
    height: 88,
  },
  MenuView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginVertical: 64,
  },
  TextDesc: {
    color: '#fff',
  },
});

export default Home;
