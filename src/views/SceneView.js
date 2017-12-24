/* @flow */

import * as React from 'react';
import propTypes from 'prop-types';

import type {
  NavigationScreenProp,
  NavigationComponent,
  NavigationRoute,
} from '../TypeDefinition';

type Props = {
  screenProps?: {},
  navigation: NavigationScreenProp<any>,
  component: NavigationComponent,
};

export default class SceneView extends React.PureComponent<Props> {
  static childContextTypes = {
    navigation: propTypes.object.isRequired
  };

  getChildContext() {
    return {
      navigation: this.props.navigation
    };
  }

  compareState(previousState, nextState) {
    return (
      previousState.index === nextState.index &&
      previousState.isActive === nextState.isActive &&
      previousState.key === nextState.key &&
      previousState.routeName === nextState.routeName &&
      previousState.routes === nextState.routes
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.screenProps !== this.props.screenProps ||
      !this.compareState(
        nextProps.navigation.state,
        this.props.navigation.state
      )
    );
  }

  render() {
    const { screenProps, navigation, component: Component } = this.props;
    return <Component screenProps={screenProps} navigation={navigation} />;
  }
}
