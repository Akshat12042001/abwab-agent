import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {CheckIcon} from '../../svgs';
import {COLORS} from '../../../constants';

const Checkbox = ({isChecked = false, onCheckboxPress = undefined}) => {
  return (
    <TouchableOpacity style={styles.checkboxRow} onPress={onCheckboxPress}>
      <View
        style={[
          styles.checkbox,
          {
            borderColor: isChecked ? COLORS.PRIMARY : COLORS.GREYSCALE_500,
            backgroundColor: isChecked ? COLORS.PRIMARY_LIGHT : COLORS.WHITE,
          },
        ]}>
        {!!isChecked && <CheckIcon size={18} color={COLORS.PRIMARY} />}
      </View>
    </TouchableOpacity>
  );
};
export default Checkbox;
