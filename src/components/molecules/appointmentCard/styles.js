import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';
import {SharedStyles} from '../../../shared';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: SCREEN_PADDING,
    marginTop: 10,
    ...SharedStyles.shadow,
  },
  cardTitle: {
    // marginBottom: 4,
  },
  cardSubtitle: {
    marginBottom: 10,
  },
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  clientImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    marginBottom: 6,
  },
  verifiedBadge: {
    backgroundColor: COLORS.PRIMARY_20,
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  clientActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientActionBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY_50,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  appointmentDateTimeBox: {
    backgroundColor: COLORS.PRIMARY_30,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  appointmentDateTimeText: {
    marginLeft: 10,
  },
  cardActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardActionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_400,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardActionButtonSpacing: {
    marginRight: 8,
  },
});

export default styles;
