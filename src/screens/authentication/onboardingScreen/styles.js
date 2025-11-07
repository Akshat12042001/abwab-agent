import {StyleSheet} from 'react-native';
import {COLORS, SCREEN, SCREEN_PADDING} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    borderColor: COLORS.RED_ERROR,
  },
  heroImage: {
    height: SCREEN.HEIGHT,
    width: SCREEN.WIDTH,
    // paddingLeft: 20,
    justifyContent: 'flex-end',
  },
  skipButton: {
    height: 48,
    width: 81,
    borderRadius: 40,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 40,
    right: 20,
  },
  content: {
    paddingHorizontal: SCREEN_PADDING,
    // borderWidth: 1,
  },
  descriptionText: {
    marginTop: 8,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  dotsRow: {
    flexDirection: 'row',
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  nextButtonSmall: {
    width: 120,
  },
});

export default styles;
