import {StyleSheet} from 'react-native';
import {COLORS, SCREEN, SCREEN_PADDING} from '../../../constants';
import {SharedStyles} from '../../../shared';

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  carouselContainer: {
    position: 'relative',
    marginBottom: 16,
    marginHorizontal: SCREEN_PADDING,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE,
    ...SharedStyles.shadow,
  },
  carouselImage: {
    width: SCREEN.WIDTH - 40,
    height: 250,
  },
  carouselIndicators: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 4,
    opacity: 0.5,
  },
  indicatorActive: {
    backgroundColor: COLORS.PRIMARY,
    opacity: 1,
    width: 8,
    height: 8,
  },
  propertyInfoCard: {
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: 10,
    // marginBottom: 24,
  },
  propertyTitle: {
    // marginBottom: 4,
  },
  propertyLocation: {
    marginTop: 2,
  },
  section: {
    padding: 12,
    marginBottom: 24,
    marginHorizontal: SCREEN_PADDING,
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    ...SharedStyles.shadow,
  },
  sectionTitle: {
    // marginBottom: 16,
  },
  visitInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  visitInfoBox: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY_20,
    borderRadius: 12,
    padding: 16,
  },
  visitInfoBoxHighlighted: {
    backgroundColor: COLORS.PRIMARY_30,
  },
  visitInfoLabel: {
    // marginBottom: 8,
  },
  visitInfoValue: {
    marginTop: 4,
  },
  clientInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientImage: {
    width: 48,
    height: 48,
    borderRadius: 30,
    marginRight: 12,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    marginBottom: 4,
  },
  verifiedBadge: {
    backgroundColor: COLORS.PRIMARY_20,
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 12,
  },
  map: {
    flex: 1,
  },
  meetingLocationText: {
    marginTop: 4,
  },
  notesBox: {
    backgroundColor: COLORS.YELLOW_50,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.YELLOW,
    marginTop: 12,
  },
  notesText: {
    lineHeight: 20,
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: 16,
    ...SharedStyles.shadow,
    borderTopWidth: 1,
    borderTopColor: COLORS.GREYSCALE_200,
  },
  completedButton: {
    marginBottom: 12,
  },
  noShowButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_400,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
