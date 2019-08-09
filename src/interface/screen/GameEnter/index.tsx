import React from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { IRNCameraOnBarCodeReadResponse } from "../../../types/rnCamera";
import GameApi from "../../../infrastructure/network/GameApi";
import BaseScreen from "../base";
import { NavigationScreenProps } from "react-navigation";

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

class GameEnter extends BaseScreen {
  readCount = 0;

  constructor(props: NavigationScreenProps) {
    super(props);
    this.state = {
      userCode: this.props.navigation.getParam('userCode', ''),
      hosting: false,
      isQrReady: true,
    };
  }

  onBarCodeRead = (data: IRNCameraOnBarCodeReadResponse) => {
    if (!this.state.isQrReady) {
      return;
    }

    const readText = data.data;

    this.setState({isQrReady: false});

    const gameApi = new GameApi(this.state.userCode);
    gameApi.sendReadCard(readText)
      .then(() => {
        if (this.readCount === 1) {
          this.props.navigation.navigate('Home', {
          });
          return;
        }
        this.readCount += 1;
        Alert.alert('OK', '2枚目のカードを読み取ってください', [
          { text: 'OK', onPress: () => this.setState({isQrReady: true})}
        ]);
      })
      .catch();
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onBarCodeRead={this.onBarCodeRead}
        >
          {({ status }) => {
            if (status !== 'READY') return <PendingView/>;
            return (
              <SafeAreaView style={{
                position: 'absolute',
                top: 0,
                left: 0,
                flex: 0,
                borderRadius: 5,
                paddingHorizontal: 70,
                alignSelf: 'center',
                width: '100%',
                height: '100%',
              }} >
                <View style={{
                  backgroundColor: '#00000099',
                  marginTop: 40,
                  paddingVertical: 32,
                  paddingHorizontal: 16,
                  width: '100%',
                  justifyContent: 'center',
                }}>
                  <Text style={styles.overlayTitle}>カードパターンを読み込んで ゲームに参加します</Text>
                  <Text style={styles.overlayDesctiption}>
                    {this.readCount === 0 ? '1枚目のカードを読み取ってください' : null}
                    {this.readCount === 1 ? '2枚目のカードを読み取ってください' : null}
                  </Text>
                </View>
              </SafeAreaView>
            )
          }}
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  overlayTitle: {
    color: '#fff',
    fontSize: 18,
  },
  overlayDesctiption: {
    color: '#fff',
    fontSize: 16,
  },
});

export default GameEnter;
