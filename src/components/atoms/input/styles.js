import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../../constants';

export default StyleSheet.create({
  main: {
    marginBottom: 10,
    // borderWidth: 1,
  },
  inputField: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: FONTS.regular,
    color: COLORS.GREYSCALE_900,
    marginTop: 10,
  },
  container: {
    overflow: 'hidden',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: COLORS.GRAY_TEXT,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 18,
    fontFamily: FONTS.regular,
    color: COLORS.PRIMARY,
  },
  errorContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 12,
    marginLeft: 7,
    maxWidth: '95%',
    lineHeight: 18,
    color: COLORS.RED_ERROR,
    fontFamily: FONTS.semiBold,
  },
  placeHolderText: {
    fontFamily: FONTS.regular,
  },
  leftIconStyle: {
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  eyeIcon: {
    position: 'absolute',
    top: 25,
    zIndex: 1,
  },
  passwordIcon: {
    position: 'absolute',
    top: 48,
    zIndex: 1,
    right: 16,
  },
});
