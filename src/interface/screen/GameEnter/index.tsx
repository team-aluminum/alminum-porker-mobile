import React, { PureComponent } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { IRNCameraOnBarCodeReadResponse } from "../../../types/rnCamera";

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

class GameEnter extends PureComponent {
  state = {
    isReady: true,
    isRecording: false,
  };

  onBarCodeRead = (data: IRNCameraOnBarCodeReadResponse) => {
    if (!this.state.isReady) {
      return;
    }

    this.setState({isReady: false});
    Alert.alert('QR data', data.data, [
      { text: 'OK', onPress: () => this.setState({isReady: true}) },
    ]);
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
          {({ status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView/>;
            console.log(recordAudioPermissionStatus);
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
