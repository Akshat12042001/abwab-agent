import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';

const styles = StyleSheet.create({
  tagsStyles: {
    p: {
      color: COLORS.GREYSCALE_900,
      fontSize: 14,
      fontFamily: 'Geist-Regular',
      marginVertical: 0,
    },
    ul: {
      marginVertical: 0,
      color: COLORS.GREYSCALE_900,
    },
    li: {
      marginBottom: 10,
      lineHeight: 24,
      marginLeft: 5,
      marginTop: -4,
      color: COLORS.GREYSCALE_900,
    },
    h1: {
      fontSize: 20,
      fontFamily: 'Manrope-Medium',
      color: COLORS.GREYSCALE_900,
      textAlign: 'start',
      marginVertical: 0,
      // paddingHorizontal: SIZES.twenty,
    },
    h2: {
      fontSize: 18,
      fontFamily: 'Manrope-Medium',
      color: COLORS.GREYSCALE_900,
      textAlign: 'start',
      marginVertical: 0,
      marginBottom: 10,
      // paddingHorizontal: SIZES.twenty,
    },
    h3: {
      fontSize: 16,
      fontFamily: 'Manrope-Medium',
      color: COLORS.GREYSCALE_900,
      textAlign: 'start',
      marginVertical: 0,
      // paddingHorizontal: SIZES.twenty,
    },
    h4: {
      fontSize: 14,
      fontFamily: 'Manrope-Medium',
      color: COLORS.BLACK,
      textAlign: 'start',
      marginVertical: 0,
      // paddingHorizontal: SIZES.twenty,
    },
    h5: {
      fontSize: 12,
      fontFamily: 'Manrope-Medium',
      color: COLORS.GREYSCALE_900,
      textAlign: 'start',
    },
    h6: {
      fontSize: 10,
      fontFamily: 'Manrope-Medium',
      color: COLORS.GREYSCALE_900,
      textAlign: 'start',
    },
  },
  root: {
    marginTop: 30,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: COLORS.WHITE,
  },
  container: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 24,
    flexGrow: 1,
    paddingBottom: 100,
    overflow: 'hidden',
  },
});

export default styles;
