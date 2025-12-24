import {StyleSheet} from 'react-native';
import {COLORS, FONTS} from '../../../constants';

const styles = StyleSheet.create({
  wrapper: {
    // Ensure dropdown menu renders above siblings (iOS)
    zIndex: 1000,
  },
  container: {
    borderRadius: 5,
    // paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    borderColor: COLORS.GRAY_TEXT,
  },
  dropdown: {
    // paddingLeft: 14,
    // paddingRight: 20,
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 20,
    marginTop: 8,
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.GREYSCALE_300,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: COLORS.WHITE,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#8092a3',
    fontFamily: FONTS.medium,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: COLORS.GREYSCALE_900,
    fontFamily: FONTS.regular,
    // marginLeft: 10,
  },
  iconStyle: {
    width: 28,
    height: 28,
    tintColor: '#8092a3',
  },
  listContainerStyles: {
    // marginTop: 15,
    borderRadius: 10,
    // Help overlay draw above on Android
    // elevation: 8,
    backgroundColor: COLORS.WHITE,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.WHITE,
  },
  erroContainer: {
    marginTop: -5,
    marginLeft: 5,
  },
  placeholder: {
    fontSize: 14,
    color: COLORS.WHITE,
    fontFamily: FONTS.semiBold,
  },
  itemTextStyle: {
    fontSize: 14,
    color: COLORS.GREYSCALE_900,
    fontFamily: FONTS.semiBold,
    // marginLeft: 10,
  },
});
export default styles;
