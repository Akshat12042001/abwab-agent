import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: SCREEN_PADDING,
    // marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
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
  rightArrow: {
    transform: [{rotate: '180deg'}],
  },
  leftArrow: {
    transform: [{rotate: '0deg'}],
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pointerLabel: {
    backgroundColor: COLORS.GREYSCALE_900,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  dataPointContainer: {
    width: 12,
    height: 12,
    backgroundColor: COLORS.WHITE,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -4,
    marginLeft: -5,
  },
  dataPointInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default styles;
