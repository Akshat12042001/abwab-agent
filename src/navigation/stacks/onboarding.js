import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NAVIGATION} from '../../constants';
import {OnboardingScreen, GetStartedScreen} from '../../screens/authentication';
import config from '../config';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={config}>
      {/* <Stack.Screen
        name={NAVIGATION.ONBOARDING.ONBOARDING_SCREEN}
        component={OnboardingScreen}
      /> */}
      <Stack.Screen
        name={NAVIGATION.ONBOARDING.GET_STARTED_SCREEN}
        component={GetStartedScreen}
      />
    </Stack.Navigator>
  );
};
