import {StyleSheet} from 'react-native';
import {COLORS, FONTS, SCREEN} from '../../../constants';

const styles = StyleSheet.create({
  customToast: {
    width: '75%',
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  customTitle: {
    color: COLORS.WHITE,
    fontWeight: FONTS.medium,
    fontSize: 14,
  },
  customMessage: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  container: {
    height: 20,
    width: 20,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
