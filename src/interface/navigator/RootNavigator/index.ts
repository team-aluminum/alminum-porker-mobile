import { createStackNavigator } from 'react-navigation';
import Home from '../../screen/Home';
import GameEnter from '../../screen/GameEnter';
import CardScanner from '../../screen/CardScanner';

export default createStackNavigator({
  Home: { screen: Home },
  GameEnter: { screen: GameEnter },
  CardScanner: { screen: CardScanner },
}, {
  mode: 'modal',
  headerMode: "none",
});
