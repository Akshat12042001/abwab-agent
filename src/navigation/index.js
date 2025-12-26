import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthenticationStack from './stacks/authentication';
import {NavigationService} from '../services';
import {createStackNavigator} from '@react-navigation/stack';
import config from './config';
import {NAVIGATION} from '../constants';
import OnboardingStack from './stacks/onboarding';
import BottomTabs from './bottomTabs';
import CommonStack from './stacks/common';
import {connect} from 'react-redux';

const Stack = createStackNavigator();

class AppNavigator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer ref={ref => NavigationService.setNavigatorRef(ref)}>
        <Stack.Navigator screenOptions={config}>
          {/* {!this.props.isOnboardingCompleted ? (
            <Stack.Screen
              name={NAVIGATION.STACKS.ONBOARDING}
              component={OnboardingStack}
            />
          ) : !this.props.isLoggedIn ? (
            <Stack.Screen
              name={NAVIGATION.STACKS.AUTH}
              component={AuthenticationStack}
            />
          ) : (
            <> */}
          <Stack.Screen name={NAVIGATION.STACKS.TABS} component={BottomTabs} />
          {/* <Stack.Screen
                name={NAVIGATION.STACKS.COMMON}
                component={CommonStack}
              /> */}
          {/* </>
          )} */}
          {/* <Stack.Screen
            name={NAVIGATION.STACKS.COMMON}
            component={CommonStack}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const mapStateToProps = state => ({
  isOnboardingCompleted: state?.onboarding?.isOnboardingCompleted,
  isLoggedIn: state?.auth?.isLoggedIn,
});

export default connect(mapStateToProps, {})(AppNavigator);
