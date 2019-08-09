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
  ImageBackground,
  Image,
  View,
} from 'react-native';
import BaseScreen from '../base';
import UrlParse from 'url-parse';
import { NavigationScreenProps } from "react-navigation";
import { FlatButton } from '../../../util/ui/component/FlatButton';

class Home extends BaseScreen {

  constructor(props: NavigationScreenProps) {
    super(props);
    this.state = {
      userCode: '',
      hosting: false,
      isQrReady: false,
    };
  }

  // start \ start_waiting
  status = 'start';

  onPressGameEnter = (): void => {
    this.props.navigation.navigate('GameEnter', {
      userCode: this.state.userCode,
    });
  };
  onPressCardScanner = (): void => {
    this.props.navigation.navigate('CardScanner', {
      userCode: this.state.userCode,
    });
  };

  componentDidMount(): void {
    Linking.addEventListener('url', this.handleOpenURL);
    this.status = this.props.navigation.getParam('status', 'start');
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
    })
  };

  render(): ReactElement {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content"/>
        <ImageBackground source={require('../../../assets/images/background.png')} style={styles.ImageBackground}>
          <SafeAreaView style={styles.SafeAreaView}>
            <View style={styles.LogoView}>
              <Image style={styles.LogoImage} source={require('../../../assets/images/logo.png')} />
            </View>
            {this.status === 'start' ?
              <View style={styles.MenuView}>
                <FlatButton text={'JOIN GAME'} onPress={this.onPressGameEnter} />
              </View>
              : null}

            <Button title={'トランプを読み取る'} onPress={this.onPressCardScanner}/>

            {this.status === 'start_waiting' ? <Text>ゲームが開始されるまで{'\n'}お待ちください</Text> : null}

            <Text>UserCode: {this.state.userCode ? this.state.userCode : '未設定'}</Text>
            <Text>hosting: {this.state.hosting ? 'Yes' : 'No'}</Text>
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
    marginVertical: 40,
  },
});

export default Home;
