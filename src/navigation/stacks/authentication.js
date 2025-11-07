import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NAVIGATION} from '../../constants';
import {
  ForgotPasswordScreen,
  LoginScreen,
  ResetPasswordScreen,
  VerificationCodeScreen,
} from '../../screens/authentication';
import config from '../config';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={config}>
      {/* <Stack.Screen
        name={NAVIGATION.AUTH.LOGIN_SCREEN}
        component={LoginScreen}
      /> */}
      {/* <Stack.Screen
        name={NAVIGATION.AUTH.FORGOT_PASSWORD_SCREEN}
        component={ForgotPasswordScreen}
      /> */}
      {/* <Stack.Screen
        name={NAVIGATION.AUTH.VERIFICATION_CODE_SCREEN}
        component={VerificationCodeScreen}
      /> */}
      <Stack.Screen
        name={NAVIGATION.AUTH.RESET_PASSWORD_SCREEN}
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  );
};
