import React from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import styles from './styles';
import StyledText from '../styledText';
import {COLORS} from '../../../constants';

const CustomButton = ({
  title,
  onPress,
  containerStyle,
  isDisabled = false,
  isLoading = false,
}) => {
  const backgroundColor = isDisabled ? COLORS.BUTTON_DISABLE : COLORS.PRIMARY;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled || isLoading}
      style={[styles.root, containerStyle, {backgroundColor}]}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={COLORS.WHITE}
          style={{paddingVertical: 2.5}}
        />
      ) : (
        <StyledText variant="bold" color={COLORS.WHITE}>
          {title}
        </StyledText>
      )}
    </TouchableOpacity>
  );
};
export default CustomButton;
