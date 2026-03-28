import React, {useState} from 'react';
import {View, TouchableOpacity, I18nManager} from 'react-native';
import {StyledText} from '../../atoms';
import {COLORS} from '../../../constants';
import styles from './styles';
import {useTranslation} from 'react-i18next';

const AnimatedButtons = ({
  options = [],
  selectedIndex = 0,
  onSelect = () => {},
  containerStyle = {},
  buttonStyle = {},
  activeTextColor = COLORS.WHITE,
  inactiveTextColor = COLORS.PRIMARY,
  activeBackgroundColor = COLORS.PRIMARY,
  containerBackgroundColor = COLORS.GREYSCALE_50,
}) => {
  const {t} = useTranslation();
  const isRTL = I18nManager.isRTL;
  const [containerWidth, setContainerWidth] = useState(0);

  const handleLayout = event => {
    const {width} = event.nativeEvent.layout;
    if (width > 0) {
      setContainerWidth(width);
    }
  };

  const getIndicatorStyle = () => {
    if (containerWidth === 0 || options.length === 0) {
      return {};
    }

    const padding = 10;
    const availableWidth = containerWidth - padding * 2;
    const buttonWidth = availableWidth / options.length;
    const position = isRTL
      ? (options.length - 1 - selectedIndex) * buttonWidth
      : selectedIndex * buttonWidth;

    return {
      width: buttonWidth,
      transform: [{translateX: position}],
    };
  };

  if (!options || options.length === 0) {
    return null;
  }

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: containerBackgroundColor},
        containerStyle,
      ]}
      onLayout={handleLayout}>
      {containerWidth > 0 && (
        <View
          style={[
            styles.indicator,
            {backgroundColor: activeBackgroundColor},
            getIndicatorStyle(),
          ]}
        />
      )}
      {options.map((option, index) => {
        const isSelected = index === selectedIndex;
        const optionLabel =
          typeof option === 'string' ? option : option.label || option.value;
        const optionValue = typeof option === 'string' ? option : option.value;

        return (
          <TouchableOpacity
            key={`${optionLabel}-${index}`}
            style={[styles.button, buttonStyle]}
            onPress={() => onSelect(index, optionValue)}
            activeOpacity={0.7}>
            <StyledText
              size={14}
              variant="semiBold"
              color={isSelected ? activeTextColor : inactiveTextColor}>
              {t(optionLabel)}
            </StyledText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AnimatedButtons;
