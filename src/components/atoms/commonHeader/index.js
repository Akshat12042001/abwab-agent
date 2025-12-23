import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import StyledText from '../styledText';
import {COLORS} from '../../../constants';
import {ArrowRightIcon, LeftArrowIcon} from '../../svgs';
import styles from './styles';
import {SharedStyles} from '../../../shared';
import {isRTLActive} from '../../../utils';
import {useNavigation} from '@react-navigation/native';

const CommonHeader = ({
  title = '',
  rightComponent = null,
  onBackPress = () => {},
  backIconColor = COLORS.GREYSCALE_200,
  backIconBgColor = '',
}) => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
    onBackPress?.();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.root,
          {borderColor: backIconColor, backgroundColor: backIconBgColor},
        ]}
        onPress={goBack}>
        {isRTLActive() ? <ArrowRightIcon /> : <LeftArrowIcon />}
      </TouchableOpacity>
      <StyledText
        variant="bold"
        size={18}
        containerStyle={SharedStyles.fullFlex}
        color={COLORS.GREYSCALE_900}
        textAlign="center">
        {title}
      </StyledText>
      {rightComponent}
    </View>
  );
};

export default CommonHeader;
