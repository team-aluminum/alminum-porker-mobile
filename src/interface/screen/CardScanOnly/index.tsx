import React  from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { IRNCameraOnBarCodeReadResponse } from '../../../types/rnCamera';
import GameApi from "../../../infrastructure/network/GameApi";
import BaseScreen from "../base";
import { NavigationScreenProps } from "react-navigation";

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

class CardScanOnly extends BaseScreen {
  constructor(props: NavigationScreenProps) {
    super(props);
    this.state = {
      userCode: this.props.navigation.getParam('userCode', ''),
      hosting: false,
      isQrReady: true,
      playStatus: '',
    };
  }

  onBarCodeRead = (res: IRNCameraOnBarCodeReadResponse) => {
    if (!this.state.isQrReady) {
      return;
    }

    this.setState({isQrReady: false});

    const readText = res.data;

    if (!readText || !readText.match('^[cdhs][1-9][0-3]?$')) {
      this.setState({isQrReady: true});
      console.log(readText, 'カードIDがふせい');

      return;
    }

    const gameApi = new GameApi(this.state.userCode);
    gameApi.sendReadCard(readText)
      .then((res) => {
        console.log(res.data);
        this.setState({isQrReady: true});
        this.props.navigation.navigate('ReadOnlyHome', {
          status: 'start',
        });
      })
      .catch(err => {
        if (err.response.status === 409) {
          this.props.navigation.navigate('ReadOnlyHome', {
            status: 'start',
          });
        }
      });

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
              }}>
                <View style={{
                  backgroundColor: '#00000099',
                  marginTop: 40,
                  paddingVertical: 32,
                  paddingHorizontal: 16,
                  width: '100%',
                  justifyContent: 'center',
                }}>
                  <Text style={styles.overlayTitle}>カードを読み取ってください</Text>
                </View>
              </SafeAreaView>
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
  overlayTitle: {
    color: '#fff',
    fontSize: 18,
  },
});

export default CardScanOnly;
