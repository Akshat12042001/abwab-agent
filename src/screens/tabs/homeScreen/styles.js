import {StyleSheet} from 'react-native';
import {COLORS, FONTS, SCREEN_PADDING} from '../../../constants';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.PRIMARY,
    paddingBottom: 40,
    paddingTop: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: SCREEN_PADDING,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  profileInfo: {
    marginLeft: 14,
  },
  notificationButton: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: COLORS.WHITE,
  },
  notificationBadge: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: COLORS.RED_NOTIFICATION,
    position: 'absolute',
    top: 10,
    right: 13,
  },
  performanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  performanceLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  performanceText: {
    fontSize: 12,
    fontWeight: FONTS.semiBold,
    color: COLORS.WHITE,
  },
  performanceSubText: {
    fontSize: 12,
    fontWeight: FONTS.regular,
    color: COLORS.GREY_QUATERNARY,
  },
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: COLORS.SECONDARY_BASE,
    borderRadius: 40,
    marginVertical: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 24,
  },
  performanceLabelText: {
    marginLeft: 6,
  },
  performanceOverviewTitle: {
    paddingHorizontal: SCREEN_PADDING,
    marginTop: 24,
    marginBottom: 16,
  },
  segmentedControlContainer: {
    marginHorizontal: SCREEN_PADDING,
  },
});

export default styles;

