import React from 'react';
import {AppState} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import AuthenticationStack from './stacks/authentication';
import {ChatSocketService, NavigationService} from '../services';
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
    this.currentAppState = AppState.currentState;
    this.appStateSubscription = null;
  }

  componentDidMount() {
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this.handleAppStateChange,
    );
    this.syncSocketConnection();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isLoggedIn !== this.props.isLoggedIn ||
      prevProps.authToken !== this.props.authToken
    ) {
      this.syncSocketConnection();
    }
  }

  componentWillUnmount() {
    this.appStateSubscription?.remove?.();
    ChatSocketService.disconnect();
  }

  handleAppStateChange = nextAppState => {
    this.currentAppState = nextAppState;
    this.syncSocketConnection();
  };

  syncSocketConnection = () => {
    const {isLoggedIn, authToken} = this.props;
    const isActive = this.currentAppState === 'active';
    console.log('[Socket][Nav] sync', {
      isLoggedIn,
      hasToken: Boolean(authToken),
      appState: this.currentAppState,
    });

    if (isLoggedIn && authToken && isActive) {
      ChatSocketService.connect(authToken);
    } else {
      // Covers logout and background/inactive app states.
      ChatSocketService.disconnect();
    }
  };

  render() {
    return (
      <NavigationContainer ref={ref => NavigationService.setNavigatorRef(ref)}>
        <Stack.Navigator
          key={
            !this.props.isOnboardingCompleted
              ? 'onboarding'
              : !this.props.isLoggedIn
              ? 'auth'
              : 'main'
          }
          screenOptions={config}>
           {!this.props.isOnboardingCompleted ? (
            <Stack.Screen
              name={NAVIGATION.STACKS.ONBOARDING}
              component={OnboardingStack}
            />
          ) : !this.props.isLoggedIn ? (
            <Stack.Screen
              name={NAVIGATION.STACKS.AUTH}
              component={AuthenticationStack}
            />
          ) : null}
          {this.props.isOnboardingCompleted && this.props.isLoggedIn ? (
            <Stack.Screen
              name={NAVIGATION.STACKS.TABS}
              component={BottomTabs}
            />
          ) : null}
          {this.props.isOnboardingCompleted && this.props.isLoggedIn ? (
            <Stack.Screen
              name={NAVIGATION.STACKS.COMMON}
              component={CommonStack}
            />
          ) : null}
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
  authToken: state?.auth?.userData?.token || '',
});

export default connect(mapStateToProps, {})(AppNavigator);
