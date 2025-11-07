import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants';

const styles = StyleSheet.create({
  rememberRow: {
    marginTop: 18,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // marginBottom: 25,
  },
  checkboxRow: {
    // flexDirection: 'row',

    marginTop: 2,
  },
  checkbox: {
    height: 18,
    width: 18,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_500,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
