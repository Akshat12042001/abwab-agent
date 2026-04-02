import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NAVIGATION} from '../../constants';
import {
  HomeScreen,
  ProfileScreen,
  AppointmentsScreen,
  MessagesScreen,
} from '../../screens/tabs';
import {CustomTab} from '../../components/molecules';
import {useTranslation} from 'react-i18next';
import {
  HomeIcon,
  ProfileIcon,
  CalenderIcon,
  MessagesIcon,
} from '../../components/svgs';

const BottomTabs = createBottomTabNavigator();

const TABS = [
  {
    name: NAVIGATION.TABS.HOME,
    component: HomeScreen,
    title: 'TABS.HOME',
  },
  {
    name: NAVIGATION.TABS.APPOINTMENTS,
    component: AppointmentsScreen,
    title: 'TABS.APPOINTMENTS',
  },
  {
    name: NAVIGATION.TABS.MESSAGES,
    component: MessagesScreen,
    title: 'TABS.MESSAGES',
  },
  {
    name: NAVIGATION.TABS.PROFILE,
    component: ProfileScreen,
    title: 'TABS.PROFILE',
  },
];

export default () => {
  const {t} = useTranslation();

  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
      tabBar={props => <CustomTab {...props} />}>
      {TABS.map((item, index) => {
        return (
          <BottomTabs.Screen
            key={`${item.name}${index}`}
            name={item.name}
            component={item.component}
            initialParams={{
              title: t(item.title),
            }}
          />
        );
      })}
    </BottomTabs.Navigator>
  );
};
