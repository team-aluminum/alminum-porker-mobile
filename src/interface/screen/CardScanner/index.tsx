import React, { PureComponent } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { IRNCameraOnBarCodeReadResponse } from '../../../types/rnCamera';
import GameApi from "../../../infrastructure/network/GameApi";

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={{color: 'white'}}>Waiting</Text>
  </View>
);

class GameEnter extends PureComponent {
  state = {
    isReady: true,
    isRecording: false,
  };

  onBarCodeRead = (res: IRNCameraOnBarCodeReadResponse) => {
    if (!this.state.isReady) {
      return;
    }

    this.setState({isReady: false});

    const readText = res.data;

    if (!readText || !readText.match('^[cdhs][1-9][0-3]?$')) {
      this.setState({isReady: true});
      return;
    }

    const gameApi = new GameApi('__EnterPlayerId__');
    gameApi.sendTakeCard(readText);

    Alert.alert('QR data', readText, [
      { text: 'OK', onPress: () => this.setState({isReady: true}) },
    ]);
  };


  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
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
              <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                flex: 0,
                borderRadius: 5,
                padding: 15,
                paddingHorizontal: 70,
                alignSelf: 'center',
                width: '100%',
                height: '100%',
                // backgroundColor: '#ff000099',
              }}>

              </View>
            );
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
});

export default GameEnter;
