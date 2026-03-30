import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import StyledText from '../styledText';
import {COLORS, SCREEN} from '../../../constants';
import {ArrowRightIcon, LeftArrowIcon} from '../../svgs';
import styles from './styles';
import {SharedStyles} from '../../../shared';
import {isRTLActive} from '../../../utils';
import {useNavigation} from '@react-navigation/native';

const CommonHeader = ({
  title = '',
  rightComponent = null,
  onBackPress = () => {},
  /** If set, called instead of `navigation.goBack()` (e.g. async work then navigate). */
  customBackHandler = null,
  backIconColor = COLORS.GREYSCALE_200,
  backIconBgColor = '',
  subTitle = '',
  containerStyle = {},
}) => {
  const navigation = useNavigation();
  const goBack = () => {
    if (typeof customBackHandler === 'function') {
      customBackHandler();
      return;
    }
    navigation.goBack();
    onBackPress?.();
  };
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[
          styles.root,
          {borderColor: backIconColor, backgroundColor: backIconBgColor},
        ]}
        onPress={goBack}>
        {isRTLActive() ? <ArrowRightIcon /> : <LeftArrowIcon />}
      </TouchableOpacity>
      <View style={{flex: 1, maxWidth: SCREEN.WIDTH - 150, marginLeft: 50}}>
        <StyledText
          variant="bold"
          size={18}
          numberOfLines={1}
          // containerStyle={SharedStyles.fullFlex}
          color={COLORS.GREYSCALE_900}
          textAlign="center">
          {title}
        </StyledText>
        {!!subTitle && (
          <StyledText
            variant="regular"
            numberOfLines={1}
            size={14}
            // containerStyle={SharedStyles.fullFlex}
            color={COLORS.GREYSCALE_500}
            textAlign="center">
            {subTitle}
          </StyledText>
        )}
      </View>
      {rightComponent}
    </View>
  );
};

export default CommonHeader;
