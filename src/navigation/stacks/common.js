import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NAVIGATION} from '../../constants';
import config from '../config';
import {ViewingRequestScreen} from '../../screens/common';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={config}>
      <Stack.Screen
        name={NAVIGATION.COMMON.VIEWING_REQUEST_SCREEN}
        component={ViewingRequestScreen}
      />
    </Stack.Navigator>
  );
};
