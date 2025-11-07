import React, {useState, useCallback, forwardRef} from 'react';
import {View, Text, TouchableOpacity, Pressable, TextInput} from 'react-native';
import styles from './styles';
import {SharedStyles} from '../../../shared';
import {COLORS} from '../../../constants';
import {EyeClose, EyeOpen} from '../../svgs';
import StyledText from '../styledText';
import {useTranslation} from 'react-i18next';

export default forwardRef(
  (
    {
      error,
      isPassword = false,
      editable = true,
      onPress,
      label = '',
      value = '',
      onChangeText = undefined,
      rightIcon = null,
      placeholder = '',
      containerStyles = {},
      showErrorPadding = true,
      isVerified = false,
      isLoading = false,
      onRightIconPress = undefined,
      ...props
    },
    ref,
  ) => {
    const {t} = useTranslation();
    const [isSecure, setIsSecure] = useState(isPassword);
    const [isFocused, setIsFocused] = useState(false);

    const {onFocus, onBlur, multiline, numberOfLines} = props;

    const onFocusHandler = useCallback(() => {
      onFocus?.();
      setIsFocused(true);
    }, [onFocus]);

    const onBlurHandler = useCallback(
      e => {
        onBlur?.(e);
        setIsFocused(false);
      },
      [onBlur],
    );

    return (
      <Pressable style={[styles.main, containerStyles]} onPress={onPress}>
        <StyledText size={14} color={COLORS.GREYSCALE_900} variant="medium">
          {label}
        </StyledText>
        <TextInput
          ref={ref}
          {...props}
          autoCapitalize="none"
          onPressIn={onPress}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          placeholder={placeholder}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          secureTextEntry={isSecure}
          placeholderTextColor={COLORS.GREYSCALE_500}
          multiline={multiline}
          style={[
            styles.inputField,
            {
              borderColor: error
                ? COLORS.RED_ERROR
                : isFocused
                ? COLORS.PRIMARY
                : value
                ? COLORS.PRIMARY_50
                : COLORS.PRIMARY_LIGHT,
              backgroundColor: isFocused
                ? COLORS.PRIMARY_LIGHTEST
                : COLORS.PRIMARY_LIGHT,
            },
          ]}
          numberOfLines={numberOfLines}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.passwordIcon}
            hitSlop={SharedStyles.hitSlop10}
            onPress={() => setIsSecure(p => !p)}>
            {isSecure ? <EyeClose /> : <EyeOpen size="20" />}
          </TouchableOpacity>
        )}
        {!!error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {error ? `*${t(error)}` : null}
            </Text>
          </View>
        )}
      </Pressable>
    );
  },
);
