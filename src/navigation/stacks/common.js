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
      <Stack.Screen
        name={NAVIGATION.COMMON.APPOINTMENT_DETAIL_SCREEN}
        component={AppointmentDetailScreen}
      />
    </Stack.Navigator>
  );
};
