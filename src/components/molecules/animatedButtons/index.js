import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, I18nManager} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
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
  const translateX = useSharedValue(selectedIndex);

  useEffect(() => {
    translateX.value = withSpring(selectedIndex, {
      // damping: 15,
      // stiffness: 150,
    });
  }, [selectedIndex, translateX]);

  const handleLayout = event => {
    const {width} = event.nativeEvent.layout;
    if (width > 0) {
      setContainerWidth(width);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    if (containerWidth === 0 || options.length === 0) {
      return {};
    }

    const padding = 10; // Container padding
    const availableWidth = containerWidth - padding * 2;
    const buttonWidth = availableWidth / options.length;

    // Calculate the position based on selected index
    // In RTL, we need to reverse the direction
    const position = isRTL
      ? (options.length - 1 - translateX.value) * buttonWidth
      : translateX.value * buttonWidth;

    return {
      width: buttonWidth,
      transform: [
        {
          translateX: position,
        },
      ],
    };
  });

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
        <Animated.View
          style={[
            styles.indicator,
            {backgroundColor: activeBackgroundColor},
            animatedStyle,
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
