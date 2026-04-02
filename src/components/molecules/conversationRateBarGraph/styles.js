import {COLORS} from '../../../constants';

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  arrowButton: {
    height: 32,
    width: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT_GREY_BG,
  },
});

export default styles;
