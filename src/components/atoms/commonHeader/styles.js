import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';

const styles = StyleSheet.create({
  root: {
    height: 44,
    width: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_200,
    position: 'absolute',
    left: 0,
    top: -10,
    zIndex: 1,
  },
  container: {
    marginHorizontal: SCREEN_PADDING,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 25,
    zIndex: 1,
  },
});

export default styles;
