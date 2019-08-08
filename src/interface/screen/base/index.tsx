import { Component } from 'react'
import { NavigationScreenProp } from "react-navigation";

// @ts-ignore
interface BaseProps {
  navigation: NavigationScreenProp<any, any>;
}
interface State {}

class BaseScreen extends Component<BaseProps, State> {}

export default BaseScreen;
