import React, {forwardRef} from 'react';
import {TextInput, View} from 'react-native';
import styles from './styles';
import {COLORS} from '../../../../constants';

export default forwardRef(
  ({value, isFocused, marginLeft = false, error, ...props}, ref) => {
    return (
      <View
        style={[
          styles.container,
          {
            borderColor: isFocused ? COLORS.PRIMARY : COLORS.PRIMARY_50,
            borderWidth: 1,
          },
        ]}>
        <TextInput
          {...props}
          ref={ref}
          value={value}
          keyboardType="numeric"
          style={[styles.textInput]}
          autoFocus={true}
        />
        {/* {!value && <View style={styles.dummyView} />} */}
      </View>
    );
  },
);
