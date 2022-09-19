import React from 'react';
import {View} from 'react-native';

export default (props: {height?: number}) => {
  return <View style={{height: props.height || 20}} />;
};
