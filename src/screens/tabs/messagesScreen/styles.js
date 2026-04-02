import {StyleSheet} from 'react-native';
import {COLORS, FONTS, SCREEN_PADDING} from '../../../constants';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: SCREEN_PADDING,
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    marginBottom: 4,
  },
  headerSubtitle: {
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_200,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.RED_NOTIFICATION,
  },
  searchContainer: {
    paddingHorizontal: SCREEN_PADDING,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_300,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.GREYSCALE_900,
    fontFamily: FONTS.medium,
  },
  listContainer: {
    paddingBottom: 40,
  },
  emptyListContainer: {
    flex: 1,
  },
  messageItem: {
    flexDirection: 'row',
    marginHorizontal: SCREEN_PADDING,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GREYSCALE_100,
    alignItems: 'center',
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 28,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
    justifyContent: 'center',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 4,
  },
  senderName: {
    flex: 1,
  },
  timestamp: {
    marginLeft: 8,
  },
  locationText: {
    // marginBottom: 6,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    marginRight: 8,
  },
  unreadMessage: {
    color: COLORS.PRIMARY,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    minHeight: 300,
  },
  emptyStateIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyStateTitle: {
    marginBottom: 8,
  },
  emptyStateDescription: {
    paddingHorizontal: 40,
    lineHeight: 20,
  },
  closeIconContainer: {
    height: 24,
    width: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.GREYSCALE_900,
  },
});

export default styles;
