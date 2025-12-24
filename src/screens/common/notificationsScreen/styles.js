import {StyleSheet} from 'react-native';
import {COLORS, SCREEN} from '../../../constants';
import {SharedStyles} from '../../../shared';

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    // paddingTop: 20,
    paddingBottom: 40,
  },
  sectionHeader: {
    // marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    marginBottom: 4,
  },
  itemWrapper: {
    marginBottom: 12,
  },
  notificationCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...SharedStyles.shadow,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    flex: 1,
    marginRight: 8,
  },
  timestamp: {
    marginTop: 2,
  },
  description: {
    // marginTop: 4,
  },
  emptyContainer: {
    height: SCREEN.HEIGHT - 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIconContainer: {
    height: 120,
    width: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_200,
  },
  emptyTitle: {
    marginTop: 10,
  },
  emptyDescription: {
    marginHorizontal: 40,
  },
});

export default styles;
