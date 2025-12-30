import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NAVIGATION} from '../../constants';
import config from '../config';
import {
  ViewingRequestScreen,
  NotificationsScreen,
  PropertyDetailScreen,
  DeveloperDetailScreen,
  AppointmentDetailScreen,
  CalenderManagementScreen,
  SuccessScreen,
  ChatScreen,
  SupportCenterScreen,
  FaqScreen,
  PolicyScreen,
  LanguageScreen,
  ChangePasswordScreen,
} from '../../screens/common';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator screenOptions={config}>
      {/* <Stack.Screen
        name={NAVIGATION.COMMON.VIEWING_REQUEST_SCREEN}
        component={ViewingRequestScreen}
      /> */}
      {/* <Stack.Screen
        name={NAVIGATION.COMMON.NOTIFICATIONS_SCREEN}
        component={NotificationsScreen}
      /> */}
      {/* <Stack.Screen
        name={NAVIGATION.COMMON.PROPERTY_DETAIL_SCREEN}
        component={PropertyDetailScreen}
      /> */}
      {/* <Stack.Screen
        name={NAVIGATION.COMMON.DEVELOPER_DETAIL_SCREEN}
        component={DeveloperDetailScreen}
      /> */}
      {/* <Stack.Screen
        name={NAVIGATION.COMMON.APPOINTMENT_DETAIL_SCREEN}
        component={AppointmentDetailScreen}
      /> */}
      {/* <Stack.Screen
        name={NAVIGATION.COMMON.CALENDER_MANAGEMENT_SCREEN}
        component={CalenderManagementScreen}
      />
      <Stack.Screen
        name={NAVIGATION.COMMON.SUCCESS_SCREEN}
        component={SuccessScreen}
      /> */}
      {/* <Stack.Screen
        name={NAVIGATION.COMMON.CHAT_SCREEN}
        component={ChatScreen}
      /> */}
      {/* <Stack.Screen
        name={NAVIGATION.COMMON.SUPPORT_CENTER_SCREEN}
        component={SupportCenterScreen}
      /> */}
      {/* <Stack.Screen name={NAVIGATION.COMMON.FAQ_SCREEN} component={FaqScreen} /> */}
      {/* <Stack.Screen
        name={NAVIGATION.COMMON.POLICY_SCREEN}
        component={PolicyScreen}
      /> */}
      {/* <Stack.Screen
        name={NAVIGATION.COMMON.LANGUAGE_SCREEN}
        component={LanguageScreen}
      /> */}
      <Stack.Screen
        name={NAVIGATION.COMMON.CHANGE_PASSWORD_SCREEN}
        component={ChangePasswordScreen}
      />
    </Stack.Navigator>
  );
};
