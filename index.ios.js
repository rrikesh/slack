import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import WalkThrough from './src/index';

class slack extends Component {
  render () {
    return (
      <WalkThrough />
    )
  }
}

AppRegistry.registerComponent('slack', () => slack);
