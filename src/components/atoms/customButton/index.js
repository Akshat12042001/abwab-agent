import React from 'react';
import {TouchableOpacity} from 'react-native';
import styles from './styles';
import StyledText from '../styledText';
import {COLORS} from '../../../constants';

const CustomButton = ({title, onPress, containerStyle, isDisabled = false}) => {
  const backgroundColor = isDisabled ? COLORS.BUTTON_DISABLE : COLORS.PRIMARY;
  return (
    <TouchableOpacity
      disabled={isDisabled}
      style={[styles.root, containerStyle, {backgroundColor}]}
      onPress={onPress}>
      <StyledText variant="bold" color={COLORS.WHITE}>
        {title}
      </StyledText>
    </TouchableOpacity>
  );
};
export default CustomButton;
