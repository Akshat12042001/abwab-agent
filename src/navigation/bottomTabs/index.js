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
  HomeSelectedIcon,
  ProfileSelectedIcon,
  CalenderIcon,
  CalenderIconSelected,
  MessagesIcon,
  MessagesIconSelected,
} from '../../components/svgs';

const BottomTabs = createBottomTabNavigator();

const TABS = [
  {
    name: NAVIGATION.TABS.HOME,
    component: HomeScreen,
    title: 'TABS.HOME',
    icon: <HomeIcon />,
    selectedIcon: <HomeSelectedIcon />,
  },
  {
    name: NAVIGATION.TABS.APPOINTMENTS,
    component: AppointmentsScreen,
    title: 'TABS.APPOINTMENTS',
    icon: <CalenderIcon />,
    selectedIcon: <CalenderIconSelected />,
  },
  {
    name: NAVIGATION.TABS.MESSAGES,
    component: MessagesScreen,
    title: 'TABS.MESSAGES',
    icon: <MessagesIcon />,
    selectedIcon: <MessagesIconSelected />,
  },
  {
    name: NAVIGATION.TABS.PROFILE,
    component: ProfileScreen,
    title: 'TABS.PROFILE',
    icon: <ProfileIcon />,
    selectedIcon: <ProfileSelectedIcon />,
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
              icon: item.icon,
              selectedIcon: item.selectedIcon,
            }}
          />
        );
      })}
    </BottomTabs.Navigator>
  );
};
