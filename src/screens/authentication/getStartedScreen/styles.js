import {StyleSheet} from 'react-native';
import {COLORS, SCREEN, SCREEN_PADDING} from '../../../constants';

const styles = StyleSheet.create({
  logoContainer: {
    // height: SCREEN.HEIGHT / 2.2,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logoOne: {
    width: SCREEN.WIDTH,
    height: 90,
  },
  logoTwo: {
    width: SCREEN.WIDTH,
    height: 70,
    marginTop: 18,
  },
  card: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: 30,
  },
  descriptionText: {
    marginTop: 8,
  },
  continueButton: {
    marginTop: 50,
    marginBottom: 20,
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
  guestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  guestGap: {
    marginLeft: 4,
  },
});

export default styles;
