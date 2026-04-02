import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';
import {SharedStyles} from '../../../shared';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    ...SharedStyles.shadow,
    marginHorizontal: SCREEN_PADDING,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  chartContainer: {
    // marginTop: 20,
    alignItems: 'center',
  },
  tooltipContainer: {
    alignItems: 'center',
    // marginBottom: 18,
    width: 80,
    bottom: 4,
    // paddingBottom: 20,
  },
  tooltip: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    ...SharedStyles.shadow,
  },
  tooltipArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: COLORS.WHITE,
    marginTop: -1,
  },
});

export default styles;
