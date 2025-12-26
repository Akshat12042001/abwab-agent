import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: SCREEN_PADDING,
    marginBottom: 24,
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_200,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIconBtnSpacing: {
    marginLeft: 12,
  },
  dateScrollView: {
    maxHeight: 100,
  },
  dateScrollContainer: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 24,
    height: 110,
  },
  dateCard: {
    width: 64,
    // height: 80,
    borderRadius: 50,
    backgroundColor: COLORS.GREYSCALE_50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dateCardSelected: {
    backgroundColor: COLORS.PRIMARY,
  },
  appointmentsSection: {
    // paddingHorizontal: SCREEN_PADDING,
  },
  sectionTitle: {
    marginBottom: 10,
    paddingHorizontal: SCREEN_PADDING,
  },
  listContainer: {
    paddingBottom: 40,
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
    marginBottom: 4,
  },
  emptyStateDescription: {
    paddingHorizontal: 40,
    lineHeight: 20,
  },
});

export default styles;
