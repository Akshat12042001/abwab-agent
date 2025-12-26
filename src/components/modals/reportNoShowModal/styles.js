import {StyleSheet} from 'react-native';
import {COLORS, SCREEN_PADDING} from '../../../constants';
import {SharedStyles} from '../../../shared';

export default StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  container: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: '90%',
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.GREYSCALE_300,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  title: {
    marginTop: 20,
    marginBottom: 8,
  },
  description: {
    paddingHorizontal: SCREEN_PADDING,
  },
  scrollContent: {
    paddingBottom: 20,
    marginHorizontal: SCREEN_PADDING,
    marginTop: 20,
  },
  appointmentCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    ...SharedStyles.shadow,
  },
  propertyTitle: {
    marginBottom: 4,
  },
  propertySubtitle: {
    marginBottom: 6,
  },
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 4,
  },
  verifiedBadge: {
    backgroundColor: COLORS.PRIMARY_20,
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  noteSection: {
    marginBottom: 14,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  noteInput: {
    backgroundColor: COLORS.GREYSCALE_50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.GREYSCALE_200,
    padding: 16,
    minHeight: 100,
    fontSize: 14,
    color: COLORS.GREYSCALE_900,
    fontFamily: 'Manrope-Regular',
  },
  actionButtons: {
    // paddingTop: 16,
    paddingBottom: 32,
    paddingHorizontal: SCREEN_PADDING,
  },
  confirmButton: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: COLORS.RED_NOTIFICATION,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cancelButton: {
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
