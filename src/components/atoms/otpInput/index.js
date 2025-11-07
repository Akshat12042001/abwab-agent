import React, {useEffect, useRef} from 'react';
import {Platform, View, Text} from 'react-native';
import Input from './input';
import styles from './styles';

export default ({length, otp, setOtp, onSubmit, error}) => {
  const refs = useRef(new Array(length)?.fill(null));

  useEffect(() => {
    if (otp?.join('')?.length === 0) {
      refs?.current[0]?.focus();
    }
    if (otp?.join('')?.length === length) {
      onSubmit();
    }
  }, [otp, length]);

  useEffect(() => {
    setTimeout(() => {
      refs?.current[0]?.focus?.();
    }, 200);
  }, [false]);

  useEffect(() => {
    const otpHandler = message => {
      if (message && message !== 'Timeout Error.') {
        try {
          const fetchedOTP = /(\d{6})/g.exec(message)[1];
          const outputArray = [];
          for (let i = 0; i < fetchedOTP?.length; i++) {
            outputArray.push(`${+fetchedOTP?.charAt(i)}`);
          }
          setOtp(outputArray);
        } catch (err) {}
      }
    };
  }, [false]);

  const renderInputs = length => {
    const count = new Array(length).fill(0);
    const component = count.map((i, j) => (
      <View key={j} delay={j * 10}>
        <Input
          ref={ref => (refs.current[j] = ref)}
          value={otp[j]}
          marginLeft={!(j === 0)}
          isFocused={refs?.current[j] ? refs?.current[j]?.isFocused() : j === 0}
          onChangeText={value => handler(value, j)}
          onKeyPress={({nativeEvent: {key}}) => handleKeyPressTextInput(j, key)}
          textContentType="oneTimeCode"
          error={!!error}
        />
      </View>
    ));
    return component;
  };

  const handler = (value, index) => {
    let newdigits = otp?.slice();
    const oldTextLength = newdigits[index] ? newdigits[index].length : 0;
    const newTextLength = value.length;
    if (newTextLength - oldTextLength === length) {
      // user pasted text in.
      newdigits = value.split('').slice(oldTextLength, newTextLength);
      setOtp(newdigits);
    } else {
      if (value.length === 0) {
        if (newdigits.length > 0) {
          newdigits = newdigits.slice(0, newdigits.length - 1);
        }
      } else {
        value.split('').forEach(value => {
          if (index < length) {
            newdigits[index] = value;
            index += 1;
          }
        });
        index -= 1;
      }
    }
    setOtp(newdigits);

    let result = newdigits.join('');
    if (result.length >= length) {
      refs.current[length - 1].blur();
    } else {
      if (value.length > 0 && index < length - 1) {
        refs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPressTextInput = (index, key) => {
    const digits = otp.slice();
    if (key === 'Backspace') {
      if (!digits[index] && index > 0) {
        handler('', index - 1);
        refs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <View>
      <View style={styles.container}>{renderInputs(length)}</View>
    </View>
  );
};
