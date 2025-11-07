import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SharedStyles} from '../../../shared/index';
import styles from './styles';
import {COLORS} from '../../../constants';

export default ({
  children,
  center = false,
  paddingTop = 0,
  paddingBottom = 0,
  backgroundColor = COLORS.LIGHT_GREY_BG,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        SharedStyles.fullFlex,
        !!center && SharedStyles.center,
        {
          paddingTop: !!paddingTop ? paddingTop : insets.top,
          paddingBottom: !!paddingBottom ? paddingBottom : insets.bottom,
          backgroundColor,
        },
      ]}>
      {children}
    </View>
  );
};
