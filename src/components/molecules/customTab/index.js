import React, {useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {StyledText} from '../../atoms';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, NAVIGATION} from '../../../constants';
import {useTranslation} from 'react-i18next';
import {
  CalenderIcon,
  HomeIcon,
  MessagesIcon,
  ProfileIcon,
} from '../../svgs';

const getRouteIcon = routeName => {
  switch (routeName) {
    case NAVIGATION.TABS.HOME:
      return <HomeIcon />;
    case NAVIGATION.TABS.APPOINTMENTS:
      return <CalenderIcon />;
    case NAVIGATION.TABS.MESSAGES:
      return <MessagesIcon />;
    case NAVIGATION.TABS.PROFILE:
      return <ProfileIcon />;
    default:
      return null;
  }
};

const CustomTabBar = ({state, navigation}) => {
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  const onPress = useCallback(
    (route, index) => {
      const isFocused = state?.index === index;
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    },
    [state.index, navigation],
  );

  const onLongPress = useCallback(
    route => {
      navigation.emit({
        target: route.key,
        type: 'tabLongPress',
      });
    },
    [navigation],
  );

  return (
    <View style={{backgroundColor: COLORS.LIGHT_WHITE}}>
      <View
        style={[
          styles.root,
          insets.bottom
            ? styles.rootExtraPaddingBottom
            : styles.rootPaddingBottom,
        ]}>
        {state.routes.map((route, index) => {
          const isFocused = state?.index === index;
          const label = route?.params?.title || t('STRINGS.BUTTONS.HOME');
          // No pill/animation – icon + text label only

          return (
            <TouchableOpacity
              style={styles.tabsContainer}
              key={route?.name}
              onPress={onPress.bind(this, route, index)}
              onLongPress={onLongPress.bind(this, route)}>
              <View style={styles.iconTopLabelBottom}>
                {(() => {
                  const iconNode = getRouteIcon(route?.name);
                  if (!iconNode) return null;
                  try {
                    return React.cloneElement(iconNode, {
                      selected: isFocused,
                      color: isFocused ? COLORS.PRIMARY : COLORS.GREYSCALE_700,
                    });
                  } catch (_e) {
                    return iconNode;
                  }
                })()}
                <StyledText
                  size={10}
                  variant="semiBold"
                  color={isFocused ? COLORS.PRIMARY : COLORS.GREYSCALE_700}
                  textAlign="center">
                  {label}
                </StyledText>
                {(route?.name === NAVIGATION.TABS.APPOINTMENTS ||
                  route?.name === NAVIGATION.TABS.MESSAGES) && (
                  <View
                    style={[
                      {
                        right:
                          route?.name === NAVIGATION.TABS.APPOINTMENTS
                            ? 20
                            : 10,
                      },
                      styles.notiIcon,
                    ]}>
                    <StyledText size={10} variant="medium" color={COLORS.WHITE}>
                      3
                    </StyledText>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;
