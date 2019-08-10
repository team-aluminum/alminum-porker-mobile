import { createStackNavigator } from 'react-navigation';
import Home from '../../screen/Home';
import GameEnter from '../../screen/GameEnter';
import CardScanner from '../../screen/CardScanner';
import CardScanOnly from '../../screen/CardScanOnly';
import ReadOnlyHome from '../../screen/ReadOnlyHome';

export default createStackNavigator({
  Home: {screen: Home},
  GameEnter: {screen: GameEnter},
  CardScanner: {screen: CardScanner},
  CardScanOnly: {screen: CardScanOnly},
  ReadOnlyHome: {screen: ReadOnlyHome},
}, {
  initialRouteName: 'ReadOnlyHome',
  mode: 'modal',
  headerMode: "none",
});
