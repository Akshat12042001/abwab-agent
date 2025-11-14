import React from 'react';
import {View, Text} from 'react-native';
import {CheckIcon, CloseIcon} from '../../svgs';
import {COLORS} from '../../../constants';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CustomToast = ({text1, text2, hide, variant = 'success'}) => {
  const isError = variant === 'error';
  const bgColor = isError ? COLORS.RED_ERROR : COLORS.PRIMARY;
  console.log({text1, bgColor});
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.customToast,
        {backgroundColor: bgColor, marginTop: !!insets.top ? 30 : 0},
      ]}>
      <View
        style={[
          {
            backgroundColor: isError ? COLORS.WHITE : COLORS.WHITE,
          },
          styles.container,
        ]}>
        {isError ? (
          <CloseIcon size={15} color={COLORS.RED_ERROR} />
        ) : (
          <CheckIcon color={COLORS.PRIMARY} size="15" />
        )}
      </View>
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.customTitle,
            {color: isError ? COLORS.WHITE : COLORS.WHITE},
          ]}>
          {text1}
        </Text>
        {text2 && <Text style={styles.customMessage}>{text2}</Text>}
      </View>
      {/* <CloseIcon size={20} color={COLORS.WHITE} onPress={hide} /> */}
    </View>
  );
};

export default CustomToast;
