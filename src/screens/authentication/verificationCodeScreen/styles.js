import {StyleSheet} from 'react-native';
import {SCREEN_PADDING, COLORS} from '../../../constants';

const styles = StyleSheet.create({
  backButton: {
    height: 44,
    width: 44,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.GREYSCALE_200,
    marginHorizontal: 20,
    marginTop: 20,
  },
  container: {
    paddingHorizontal: SCREEN_PADDING,
    marginTop: 10,
  },
  helperText: {
    marginTop: 10,
  },
  otpWrap: {
    paddingVertical: 25,
  },
  resendWrap: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowStart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerGap: {
    marginLeft: 5,
  },
});

export default styles;
