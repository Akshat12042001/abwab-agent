import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthenticationStack from './stacks/authentication';
import {NavigationService} from '../services';
import {createStackNavigator} from '@react-navigation/stack';
import config from './config';
import {NAVIGATION} from '../constants';
import OnboardingStack from './stacks/onboarding';

const Stack = createStackNavigator();

class AppNavigator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer ref={ref => NavigationService.setNavigatorRef(ref)}>
        <Stack.Navigator screenOptions={config}>
          <Stack.Screen
            name={NAVIGATION.STACKS.ONBOARDING}
            component={OnboardingStack}
          />
          <Stack.Screen
            name={NAVIGATION.STACKS.AUTH}
            component={AuthenticationStack}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default AppNavigator;
