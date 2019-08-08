/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { createAppContainer } from 'react-navigation';
import RootNavigator from './src/interface/navigator/RootNavigator';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => createAppContainer(RootNavigator));
