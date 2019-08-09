import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

interface FlatButtonProps {
  text: string;
  onPress?: any;
}

export class FlatButton extends React.Component<FlatButtonProps> {

  onPress = (): void => {
    if (!this.props.onPress) {
      return;
    }

    this.props.onPress();

  };

  render(): React.ReactElement {
    return (
      <TouchableOpacity
        style={styles.TouchableOpacity}
        onPress={this.onPress}>
        <View style={styles.BorderView}>
          <View style={styles.InnerView}>
            <Text style={styles.Text}>{this.props.text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  TouchableOpacity: {
    width: 144,
    height: 204,
  },
  BorderView: {
    borderColor: '#232323',
    borderWidth: 4,
    padding: 8,
    width: '100%',
    height: '100%',
  },
  InnerView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#232323',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    color: '#fff',
    fontSize: 20,
  },
});
