import {StyleSheet} from 'react-native';
import {COLORS, SCREEN, SCREEN_PADDING} from '../../../constants';
import {SharedStyles} from '../../../shared';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SCREEN_PADDING,
    marginBottom: 24,
  },
  headerTitle: {
    flex: 1,
  },
  notificationButton: {
    position: 'relative',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_200,
    borderRadius: 22,
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.RED_NOTIFICATION,
  },
  scrollContent: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 20,
  },
  profileCard: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    ...SharedStyles.shadow,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 35,
    marginRight: 16,
    borderWidth: 2,
    borderColor: COLORS.WHITE,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    marginBottom: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_20,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  verifiedText: {
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statBox: {
    // flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_20,
    borderRadius: 16,
    width: SCREEN.WIDTH / 3 - 40,
    height: 75,
    justifyContent: 'center',
  },
  statValue: {
    // marginBottom: 4,
  },
  statLabel: {
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    // ...SharedStyles.shadow,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_200,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.PRIMARY_20,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    // marginBottom: 4,
  },
  menuItemSubtitle: {
    marginTop: 2,
  },
  menuItemSeparator: {
    height: 12,
  },
  logoutContainer: {
    marginBottom: 20,
  },
  logoutButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.RED_NOTIFICATION,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkContainer: {
    height: 20,
    width: 20,
    backgroundColor: COLORS.PRIMARY_300,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
