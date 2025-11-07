import {StyleSheet} from 'react-native';
import {COLORS, SCREEN, SCREEN_PADDING} from '../../../constants';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.LIGHT_GREY_BG,
    paddingTop: 40,
  },
  header: {
    paddingHorizontal: SCREEN_PADDING,
  },
  logo: {
    height: 35,
    width: 111,
  },
  titleSpacing: {
    paddingVertical: 10,
  },
  rowStart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerGap: {
    marginLeft: 2,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    marginTop: 20,
    height: SCREEN.HEIGHT,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: SCREEN_PADDING,
  },
  formTopSpacing: {
    marginTop: 10,
  },
  rememberRow: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    height: 18,
    width: 18,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_500,
    marginRight: 8,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.GREYSCALE_200,
    flex: 1,
  },
  dividerLabel: {
    paddingHorizontal: 10,
    marginTop: -2,
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButton: {
    height: 48,
    width: 56,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_100,
  },
  socialButtonMid: {
    marginHorizontal: 16,
  },
});

export default styles;
